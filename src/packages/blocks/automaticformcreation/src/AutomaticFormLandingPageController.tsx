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
  // automaticData: Array<AutomaticField>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AutomaticFormLandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getFormDataId : string = "";
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
      automaticData: [],
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
    this.handleGetFormData(from,message);
    // Customizable Area End
  }

  // Customizable Area Start
  handleGetFormData = (from: string, message: Message) => {
    if (this.getFormDataId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
			const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
			);
			if (apiResponse && apiResponse.data) {
			this.setState({automaticData: apiResponse.data});
			} else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
		}
  }

  // handleOnPress = (item:AutomaticField) => {
   
  //   this.context.data = item;

  //   this.props.navigation.navigate('AutomaticFormCreation')
  // }

  async componentDidMount() {
    this.getFormData()
  }

  getFormData = () => {
		
		const headers = {
			"Content-Type": configJSON.validationApiContentType,
      "ngrok-skip-browser-warning":"adsf"
		};

		const formDataMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);

		this.getFormDataId = formDataMessage.messageId;
	
		formDataMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
		  "bx_block_automaticformcreation/form_creations"
		);
	
		formDataMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(headers)
		);
	
		formDataMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
		  configJSON.validationApiMethodType
		);
	
		runEngine.sendMessage(formDataMessage.id, formDataMessage);
	}
  // Customizable Area End
}