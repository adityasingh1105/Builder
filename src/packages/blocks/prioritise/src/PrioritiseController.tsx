import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
export const configLabel = require("./config");
// Customizable Area End

export interface Props {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  isLoading: boolean;
  taskList: ObjProps[];
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: number;
  // Customizable Area Start
  // Customizable Area End
}

export interface ObjProps {
  id: string;
  image_uri: string;
  name: string;
  is_open: boolean;
  priority_type: string;
  priority: number;
  other_priorities: OtherPrioritiesProps[],
}

export interface OtherPrioritiesProps {
  priority: number;
  priorityType: string;
}

export interface ResProps {
  id: string;
  type: string;
  attributes: AttributesProps,
}

export interface AttributesProps {
  name: string;
  priority: number;
  is_open: boolean;
  priority_type: string;
  account_id: string;
  due_date: string;
  image_uri: string;
  other_priorities: OtherPrioritiesProps[],
}

export interface PostApiBodyProps {
  id: string;
  name: string;
  priority: number;
}

export interface ItemProps {
  item: {
  id: string;
  image_uri: string;
  name: string;
  is_open: boolean;
  priority_type: string;
  other_priorities: OtherPrioritiesProps[],
  };
  index: number;

}

export default class PrioritiseController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiGetTaskData: string;
  apiUpdateTaskCallId: string;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
       // Customizable Area Start
      // Customizable Area End

    ];
   
    this.state = {
      isLoading: false,
      taskList: [],
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.apiGetTaskData = '';
    this.apiUpdateTaskCallId = '';
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      let dataArray: ObjProps[] = [];
      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.apiGetTaskData) {

          
          if (!responseJson.errors && responseJson?.data) {
            this.setState({ isLoading: false });

            responseJson.data.forEach((value: ResProps) => {
              dataArray.push({
                id: value.id,
                name: value.attributes.name,
                priority: value.attributes.priority,
                priority_type: value.attributes.priority_type,
                is_open: value.attributes.is_open,
                image_uri: value.attributes.image_uri,
                other_priorities: value.attributes.other_priorities,
              });
            });
    
            this.setState({ taskList: dataArray });
          } 
          else {         
            this.setState({ isLoading: false });

          }
        }
      
        if (apiRequestCallId == this.apiUpdateTaskCallId) {
          if (!responseJson.errors && responseJson.data) {
            this.setState({ isLoading: false });
            this.showAlert(configLabel.messageUpdate, "");
            this.getTaskData();
          }
          else {
            this.parseApiErrorResponse(responseJson);
            this.setState({ isLoading: false });
          }
        }
        
      }
      else{
        this.parseApiCatchErrorResponse(errorReponse);
       
        
      }
    }

    this.setState({ isLoading: false });

      // Customizable Area End

  }

  // Customizable Area Start

  async componentDidMount() {
    this.getTaskData();
  }

  getTaskData =  () => {
    this.setState({ isLoading: true });

    const header = {
      "Content-Type": configLabel.apiContentType,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTaskData = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configLabel.apiGetDataEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configLabel.apiMethodGet
    );


    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  
  };

  handlePressItemChange = (index: number, type: string,typeNumber:number) => {
    if(type ==='Other'){
      const updatedData0 = this.state.taskList.map((object: ObjProps, itemIndex: number) => {
        if (itemIndex === index) {
          object.is_open = !object.is_open;
          return object;
        } else {
          object.is_open = false;
          return object;
        }
      });
      this.setState({ taskList: updatedData0 });
    }
    else{

      const updatedData1 = this.state.taskList.map((object: ObjProps, itemIndex: number) => {
        
        if (itemIndex === index) {
          this.checkType(type,object);
          object.priority_type =type;
          object.priority = typeNumber;
          object.is_open = false;          
          return object;
        } else {
          return object;
        }
      });
      this.setState({ taskList: updatedData1 });
    }
   
  };

  checkType =(type:string,object:ObjProps)=>{
    let otherHigh = [
      { priority: 1, priorityType: "Medium" },
      { priority: 2, priorityType: "Low" },
    ];

    let otherMedium = [
      { priority: 0, priorityType: "High" },
      { priority: 2, priorityType: "Low" },
    ];

    let otherLow = [
      { priority: 0, priorityType: "High" },
      { priority: 1, priorityType: "Medium" },
    ];
    switch (type){
      case "High":
        object.other_priorities = otherHigh;
        return object;
     
      case "Medium":
         object.other_priorities = otherMedium;
        return object;

      
      case "Low":
        object.other_priorities = otherLow;
        return object;

      
    }
  }

  apiPostCall = async () => {
    let databodyArray: PostApiBodyProps[] = [];
    this.state.taskList.forEach((value: ObjProps) => {
      databodyArray.push({
        id: value.id,
        name: value.name,
        priority: value.priority,
      });
    });

    this.setState({ isLoading: true });

    const header = {
      "Content-Type": configLabel.apiContentType,
    };

    const bodyData = JSON.stringify({
      tasks: databodyArray,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiUpdateTaskCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configLabel.apiUpdateDataEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configLabel.apiMethodPost
    );

       bodyData &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        bodyData
      );

    this.setState({ isLoading: true })

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  
  };

  onChangeSelect =(index:number,type:string)=>{

    

     if(type =='High'){
      this.handlePressItemChange(index, 'High',0)

     }
     if(type =='Medium'){
      this.handlePressItemChange(index, 'Medium',1)

     }
     if(type =='Low'){
      this.handlePressItemChange(index, 'Low',2)

     }
  }

  keyExtractorItem = (item: { id: string }) => item.id;
  // Customizable Area End
}
