import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { AutomaticField, NewEvent } from "../../../components/src/AutomaticMobileFields";

// import DataContext from "../../../components/src/DataContext";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}


interface S {
  // Customizable Area Start
  // automaticData?: AutomaticField;
  values:{[key: string]: string | number | boolean | undefined};
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AutomaticFormWebCreationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // static contextType: React.Context<AutomaticField> = DataContext;
  putFormId : string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
			// getName(MessageEnum.AutomaticFormData),
			getName(MessageEnum.RestAPIResponceMessage)
		];

    this.state = {
      // Customizable Area Start
      // automaticData: undefined,
      values:{},
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    this.handleNewPutFormData(from,message);
    // Customizable Area End
  }

  // Customizable Area Start
  handleNewPutFormData = (from:string,message:Message) => {
    if (this.putFormId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
    
      const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
			);
      if (apiResponse) {
        history.back();
      this.showAlert("Success", "Successfully updated form.");
      } else {
        this.showAlert("Error", "Somthing went wrong!");
      }
    }
  }

  async componentDidMount() {
    // this.setState({automaticData: this.context.data},()=> {
    //   if(this.state.automaticData?.id == undefined){
    //      this.goToLandingPage();
    //   }
    // })
  }

  goToLandingPage = () => {
      history.back();
  }

// onNewChangeValues=(event: NewEvent)=> {
//  let values = {...this.state.values,[event.name]:event.value};
//  this.setState({values});
// }

  callApiFormData=()=>{

    let new_form_creation = {}

    let isValidForm = true;

    //   for (let newAutoData of (this.state.automaticData?.attributes?.field_name ?? [])) {

    //     let fieldNewArr = (newAutoData?.field_name ?? '').split(" ");
    //     let newJoinedStr = fieldNewArr.join("_");
    //     let newFieldName = this.state.values[newJoinedStr];
       
    // if(newAutoData.field_type != "boolean"){
    //   if(newFieldName == undefined || newFieldName == ""){
    //     isValidForm = false;
    //     this.showAlert("Error", `Please fill ${newAutoData?.field_name ?? ''}`);
    //     break;
    //   }
    // }
  
    // new_form_creation = {...new_form_creation,[newAutoData?.field_name ?? ''] : newFieldName }

    }

    // if(!isValidForm){
    //   return;
    // }

      //  const headersApi = {
      //   "Content-Type": configJSON.validationApiContentType,
      //   "ngrok-skip-browser-warning":"adsf"
      // };
  
      // const putNewFormDataMessage = new Message(
      //   getName(MessageEnum.RestAPIRequestMessage)
      // );
  
      // this.putFormId = putNewFormDataMessage.messageId;
    
      // putNewFormDataMessage.addData(
      //   getName(MessageEnum.RestAPIRequestHeaderMessage),
      //   JSON.stringify(headersApi)
      // );

      // putNewFormDataMessage.addData(
      //   getName(MessageEnum.RestAPIResponceEndPointMessage),
      //   configJSON.putFormData + `${this.state.automaticData?.id ?? 0}`
      // );
    
      // putNewFormDataMessage.addData(
      //   getName(MessageEnum.RestAPIRequestMethodMessage),
      //  configJSON.putAPiMethod
      // );
  
      // putNewFormDataMessage.addData(
      //   getName(MessageEnum.RestAPIRequestBodyMessage),
      //   JSON.stringify({new_form_creation})
      // );
    
      // runEngine.sendMessage(putNewFormDataMessage.id, putNewFormDataMessage);
    
      
  // }

  // doButtonPressed() {
  //   this.callApiFormData();
  // }
  // Customizable Area End
}