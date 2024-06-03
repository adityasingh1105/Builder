
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  helpCentreQA: any;
  token: String;
  queue_type: any;
  dataQA: []
  dataSub: []
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class HelpCentreController extends BlockComponent<
  Props,
  S,
  SS
> {
  getHelpCentreApiCallId: any
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage)];
    this.state = {
      helpCentreQA: [],
      token: "",
      queue_type: "",
      dataQA: [],
      dataSub: []
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recieved", JSON.stringify(message));
    
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token }, () => {
        this.getHelpCentreQA(token)
      });
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const subData = message.getData(getName(MessageEnum.HelpCentreMessageData));
      if (subData?.que_title) {
        this.setState({dataSub:subData.que_array ?? []});
      } else {
        this.setState({dataQA:subData?.que_array ?? []});
      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.getHelpCentreApiCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            console.log(responseJson, 'HelpCentre responseJson')
            this.setState({ helpCentreQA: responseJson.data })
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }
        }
        this.parseApiCatchErrorResponse(errorReponse);

      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getHelpCentreQA = (token: String) => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getHelpCentreApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.helpcentreAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  gotoSubScreen(item:any) {

    const que_type = item?.attributes?.que_type
    const data = item?.attributes?.question_sub_types?.data
  
    const msg = new Message(getName(MessageEnum.NavigationMessage));
    msg.addData(getName(MessageEnum.NavigationTargetMessage), 'HelpCentreSub');

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    const helpcentreSubInfo = {
      que_title: que_type,
      que_array: data
    }

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.HelpCentreMessageData), helpcentreSubInfo);

    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(msg)

  
  
  }


  gotoHelpCentreQA(sub_type:any, data:[]) {

    const msg = new Message(getName(MessageEnum.NavigationMessage));
    msg.addData(getName(MessageEnum.NavigationTargetMessage), 'HelpCentreQA');

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    const helpcentreSubInfo = {
      sub_type: sub_type,
      que_array: data
    }

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.HelpCentreMessageData), helpcentreSubInfo);

    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(msg);
    }

  // Customizable Area End
}
