// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
export interface DummyDataWeb {
  id: string;
    type: string;
    attributes: {
        company_name: string;
        invest_amount: number;
        date_of_invest: string;
    }}

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  portfoilioDataWeb:DummyDataWeb[];
  userDataWeb:{};
}

interface SS {
  id: any;
}

export default class PortfolioWebController extends BlockComponent<
  Props,
  S,
  SS
> {
    getPortfolioApicallWebID:string=""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      portfoilioDataWeb:[],
      userDataWeb:{}
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
      if (apiRequestCallId === this.getPortfolioApicallWebID) {
        this.getPortfolioRecieveWebBlock(errorReponse,responseJson)
     }
    }
  }
  async componentDidMount() {
        this.getPortfolioWeb();
  }
 
  getUserData=()=>{
    const logedInUserData = localStorage.getItem('UserData');
    const userDataObject = JSON.parse(logedInUserData||"")
    return userDataObject.uniq_id
  }
  getPortfolioWeb=()=>{
   
    const header = {
      "Content-Type":configJSON.validationApiContentType,
      "token": localStorage.getItem("Token")
    }; 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPortfolioApicallWebID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getPortfolioApiEndPoint}?uniq_id=${this.getUserData()}`
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

  getPortfolioRecieveWebBlock=(errorReponse:string,responseJson:{errors: string; data: DummyDataWeb[]})=>{
    if(errorReponse){
      this.showAlert("error","something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
          this.setUserPortfolios(responseJson.data)
      }
      else{
        this.showAlert("errors","No Portfoilos Found!")
      }
    }
  
  setUserPortfolios=(data:DummyDataWeb[])=>{
    this.setState({portfoilioDataWeb:data})
  }
  
}

// Customizable Area End
