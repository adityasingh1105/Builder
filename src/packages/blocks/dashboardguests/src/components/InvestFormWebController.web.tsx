// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

import moment from "moment";

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  amountWeb: string;
  companyDataWeb: {id:string}
  userDataWeb:{},
}

interface SS {
  id: any;
}

export default class InvestFormWebController extends BlockComponent<
  Props,
  S,
  SS
> {
  investApiWebCallID: string = ""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // this.investWeb = this.investWeb.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      amountWeb: "",
      companyDataWeb: {id:""},
      userDataWeb:{},
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
      if (apiRequestCallId === this.investApiWebCallID) {
        this.investRecieveBlockWeb(errorReponse, responseJson)
      }
    }
  }
  async componentDidMount() {
      this.setState({ companyDataWeb: JSON.parse(localStorage.getItem("Company")||"" )})
  }
 
  setWebInvestmentAmount = (event:{target:{value:string}}) => {
    if(event.target){

      const {value}=event.target
      this.setState({ amountWeb: value })
    }
    else{
      this.setState({ amountWeb: "" })
    }
  }
  getWebToken=()=>{
    return localStorage.getItem('Token')
  }
  investWeb = () => {
   const header = {
      "Content-Type": configJSON.validationApiContentType,
      "token":  this.getWebToken()
    };
    const {id}=this.state.companyDataWeb
    const payload = {
      "data": {
        "company_id": id,
        "invest_amount": this.state.amountWeb,
        "date_of_invest": moment(new Date()).format('YYYY/MM/DD'), 
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.investApiWebCallID = requestMessage.messageId;
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
  investRecieveBlockWeb = (errorReponse: string, responseJson: { errors: string; data: {} }) => {
    if (errorReponse) {
      this.showAlert("error", "something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
      
        this.showAlert("success","investment donw!");
        this.props.navigation.navigate('PortfolioWeb')
    }
    
  }

}

// Customizable Area End
