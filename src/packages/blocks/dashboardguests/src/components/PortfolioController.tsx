// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import  {AsyncStorage,Clipboard}  from "react-native";

export interface DummyData {
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
  portfoilioData:DummyData[];
  userData:{};
}

interface SS {
  id: any;
}

export default class PortfolioController extends BlockComponent<
  Props,
  S,
  SS
> {
    getPortfolioApicallID:string=""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      portfoilioData:[],
      userData:{}
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
      if (apiRequestCallId === this.getPortfolioApicallID) {
        this.getPortfolioRecieveBlock(errorReponse,responseJson)
     }
    }
  }
  async componentDidMount() {
        this.getPortfolio();
  }
  copyUrl=async()=>{
    const asyncData = await AsyncStorage.getItem('UserData');
    const asyncUserData = JSON.parse(asyncData||"")
    Clipboard.setString(`https://${configJSON.portfolioPublicUrl}cafe/PortfolioWeb/${asyncUserData.uniq_id}`);
  }
  getUserData=async()=>{
    const newVal = await AsyncStorage.getItem('UserData');
    const userData = JSON.parse(newVal||"")
    return userData.uniq_id
  }
  getPortfolio=async()=>{
    const header = {
      "Content-Type":configJSON.validationApiContentType,
      "token":await AsyncStorage.getItem("Token")
    }; 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
      const id=await this.getUserData()
    this.getPortfolioApicallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getPortfolioApiEndPoint}?uniq_id=${id}`
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

  getPortfolioRecieveBlock=(errorReponse:string,responseJson:{errors: string; data: DummyData[]})=>{
    if(errorReponse){
      this.showAlert("error","something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
          this.setUserData(responseJson.data)
      }
      else{
        this.showAlert("errors","No Portfoilos Found!")
      }
    }
  
  setUserData=(data:DummyData[])=>{
    this.setState({portfoilioData:data})
  }
  
}

// Customizable Area End
