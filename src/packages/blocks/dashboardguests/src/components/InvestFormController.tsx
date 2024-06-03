// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

import moment from "moment";
import  {AsyncStorage}  from "react-native";

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  amount: string;
  companyData: {id:string}
  userData:{},
}

interface SS {
  id: any;
}

export default class InvestFormController extends BlockComponent<
  Props,
  S,
  SS
> {
  investApiCallID: string = ""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // this.invest = this.invest.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      amount: "",
      companyData: {id:""},
      userData:{},
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
      if (apiRequestCallId === this.investApiCallID) {
        this.investRecieveBlock(errorReponse, responseJson)
      }
    }
  }
  async componentDidMount() {
      this.setState({ companyData: this.props.navigation.state.params.company })
  }
 
  setInvestmentAmoount = (amount: string) => {
    this.setState({ amount: amount })
  }
  getToken=async()=>{
    return  AsyncStorage.getItem('Token')
  }
  invest = async() => {
   const header = {
      "Content-Type": configJSON.validationApiContentType,
      "token": await this.getToken()
    };
    const {id}=this.state.companyData
    const payload = {
      "data": {
        "company_id": id,
        "invest_amount": this.state.amount,
        "date_of_invest": moment(new Date()).format('YYYY/MM/DD'), 
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.investApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.investApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  investRecieveBlock = (errorReponse: string, responseJson: { errors: string; data: {} }) => {
    if (errorReponse) {
      this.showAlert("error", "something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
      
        this.showAlert("success","investment donw!");
        this.props.navigation.navigate('Portfolio')
    }
    
  }

}

// Customizable Area End
