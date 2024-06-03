import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


// Customizable Area Start
// import { AutomaticField } from "../../../components/src/AutomaticMobileFields";
// import DataContext from "../../../components/src/DataContext";
// import { NavigateClass } from "../../../components/src/NavigateClass";

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
  // formData: Array<AutomaticField>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AutomaticFormWebLandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // static contextType: React.Context<AutomaticField> = DataContext;
  formDataId : string = "";
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
      formData: [],
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
    this.handleData(from,message);
    // Customizable Area End
  }

  // Customizable Area Start
  handleData = (from: string, message: Message) => {
    if (this.formDataId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
			const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
			);
			if (apiResponse && apiResponse.data) {
			this.setState({formData: apiResponse.data});
			} else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
		}
  }
  
  // handleOnClick = (item:AutomaticField) => {
   
  //   this.context.setData(item);
    
  //   NavigateClass(this.props,'AutomaticFormWebCreation')
  // }

  async componentDidMount() {
    this.getWebFormData()
  }

  getWebFormData = () => {
		
		const headers = {
			"Content-Type": configJSON.validationApiContentType,
      "ngrok-skip-browser-warning":"adsf"
		};

		const newFormDataMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);

		this.formDataId = newFormDataMessage.messageId;
	
		newFormDataMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
		  "bx_block_automaticformcreation/form_creations"
		);
	
		newFormDataMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(headers)
		);
	
		newFormDataMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
		  configJSON.validationApiMethodType
		);
	
		runEngine.sendMessage(newFormDataMessage.id, newFormDataMessage);
	}
  
  // Customizable Area End
}