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
  // automaticFormData?: AutomaticField;
  formValues:{[key: string]: string | number | boolean | undefined};
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AutomaticFormCreationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  putFormDataId : string = "";
  // static contextType: React.Context<AutomaticField> = DataContext;
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
      // automaticFormData: undefined,
      formValues:{},
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
    this.handlePutFormData(from,message);
    // Customizable Area End
  }

 

  // Customizable Area Start

  async componentDidMount() {
    // this.setState({automaticFormData: this.context.data})
  }

// onChangeValues=(event: NewEvent)=> {
//  let newValues = {...this.state.formValues,[event.name]:event.value};
//  this.setState({formValues:newValues});
// }

  putFormData=()=>{

    // let form_creation = {}

    // let isValid = true;

    //   for (let autoData of (this.state.automaticFormData?.attributes?.field_name ?? [])) {

    //     let fieldArr = (autoData?.field_name ?? '').split(" ");
    //     let newStr = fieldArr.join("_");
    //     let fieldName = this.state.formValues[newStr];
       
    // if(autoData.field_type != "boolean"){
    //   if(fieldName == undefined || fieldName == ""){
    //     isValid = false;
    //     this.showAlert("Error", `Please fill ${autoData?.field_name ?? ''}`);
    //     break;
    //   }
    // }
  
    //   form_creation = {...form_creation,[autoData?.field_name ?? ''] : fieldName }

    // }

    // if(!isValid){
    //   return;
    // }

    //    const headers = {
    //     "Content-Type": configJSON.validationApiContentType,
    //     "ngrok-skip-browser-warning":"adsf"
    //   };
  
    //   const putFormDataMessage = new Message(
    //     getName(MessageEnum.RestAPIRequestMessage)
    //   );
  
    //   this.putFormDataId = putFormDataMessage.messageId;
    
    //   putFormDataMessage.addData(
    //     getName(MessageEnum.RestAPIResponceEndPointMessage),
    //     configJSON.putFormData + `${this.state.automaticFormData?.id ?? 0}`
    //   );
    
    //   putFormDataMessage.addData(
    //     getName(MessageEnum.RestAPIRequestHeaderMessage),
    //     JSON.stringify(headers)
    //   );
    
    //   putFormDataMessage.addData(
    //     getName(MessageEnum.RestAPIRequestMethodMessage),
    //    configJSON.putAPiMethod
    //   );
  
    //   putFormDataMessage.addData(
    //     getName(MessageEnum.RestAPIRequestBodyMessage),
    //     JSON.stringify({form_creation})
    //   );
    
    //   runEngine.sendMessage(putFormDataMessage.id, putFormDataMessage);
    
      
  }

  onButtonPressed() {
    this.putFormData();
  }
  
  handlePutFormData = (from:string,message:Message) => {
    if (this.putFormDataId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
    
      const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
			);
      if (apiResponse) {
      this.props.navigation.goBack();
      this.showAlert("Success", "Successfully updated form.");
      } else {
        this.showAlert("Error", "Somthing went wrong!");
      }
    }
  }
  // Customizable Area End
}