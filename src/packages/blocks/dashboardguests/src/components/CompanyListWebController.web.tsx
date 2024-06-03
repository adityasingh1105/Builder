// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

export interface ItemWeb{
  type:string,
  attributes:{
    company_holder:string,
     doc:string,
     company_name:string
  },
  id:string
}

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  companyListWeb: ItemWeb[]
}

interface SS {
  id: any;
}

export default class CompanyListWebController extends BlockComponent<
  Props,
  S,
  SS
> {
  getCompaniesWebApiCallID: string = ""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      companyListWeb: []
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.getCompaniesWebApiCallID) {
        this.getCompaniesWebRecieveBlock(errorReponse, responseJson)
      }
    }
  }

  async componentDidMount() {
    this.getCompaniesWeb()
  }
  investNowWeb = (item: ItemWeb) => {
    localStorage.setItem('Company',JSON.stringify(item))
    this.props.navigation.navigate('InvestFormWeb')
  }
  getCompaniesWeb = () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCompaniesWebApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCompainesApiEnpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }


  getCompaniesWebRecieveBlock = (errorReponse: string, responseJson: { errors: string; data: ItemWeb[] }) => {
    if (errorReponse) {
      this.showAlert("error", "something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
      this.setState({ companyListWeb: responseJson.data })
    }
    else {
      this.showAlert("error", "something went wrong")
    }
  }


}

// Customizable Area End
