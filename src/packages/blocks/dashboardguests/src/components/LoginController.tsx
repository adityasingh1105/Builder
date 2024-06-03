// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";


import React from "react";
import  {AsyncStorage}  from "react-native";

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  phoneNo: string;
  countryCode: string;
  modalVisible: boolean;
  otpNumber: string;
  userOtp:string;
}

interface SS {
  id: any;
}

export default class LoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  getVerificationOtpApiCallId: string = ""
  validateOtpApiCallId: string = ""
  otp1Ref = React.createRef();

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      phoneNo: "",
      countryCode: "91",
      modalVisible: false,
      otpNumber: "",
      userOtp:""
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
      if (apiRequestCallId === this.getVerificationOtpApiCallId) {
        this.getVerificationOtpRecieveBlock(errorReponse, responseJson)
      }
      if (apiRequestCallId === this.validateOtpApiCallId) {
        this.validateOtpRecieveBlock(errorReponse, responseJson)
      }
    }
  }


  
 

 
  setModal=(value:boolean)=>{
    this.setState({modalVisible:value})
  }

 
  setOtp=(value:string)=>{
    this.setState({userOtp:value})
  }
  setPhoneNumber = (phoneNo: string) => {
    this.setState({ phoneNo: phoneNo })
  }
  onValidate = (value: string, regex: RegExp) => {
    return regex.test(value)
  }
  onLogin = () => {
    if (this.onValidate(this.state.phoneNo, configJSON.phoneInputRegex)) {
      this.getVerificationOtp()
    }
    else {
      this.showAlert("error", "please enter valid phone number")
    }
  }
  getVerificationOtp = () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };

    const requestData = {
      "full_phone_number": `+${this.state.countryCode}-${this.state.phoneNo}`
    };



    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getVerificationOtpApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getVerificationOtp
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestData)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
 

  onSubmitOtp = () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };
    const otpData = {
      "full_phone_number": `+${this.state.countryCode}-${this.state.phoneNo}`,
      "pin": `${this.state.otpNumber}`
    }


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.validateOtpApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.validateOtpApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(otpData)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validateOtpApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }


  getVerificationOtpRecieveBlock = (errorReponse: string, responseJson: { errors: string; text_loacl_message: { pin: string } }) => {
    
    if (errorReponse) {
      this.showAlert("error", "something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
      this.setState({ otpNumber: responseJson.text_loacl_message.pin })
      if (!this.state.modalVisible) {
        this.setState({ modalVisible: true })
      }
    }
    else {
      this.showAlert("errror", responseJson.errors)

    }
  }
  validateOtpRecieveBlock = async (errorReponse: string, responseJson: { errors: string; data: {}, token: string, uniqId: string }) => {
    if (errorReponse) {
      this.showAlert("error", "something went wrong")
    }
    else if (responseJson && !responseJson.errors) {
      this.setState({ modalVisible: false })
      this.props.navigation.navigate('CompanyList')
      await AsyncStorage.setItem("Token", responseJson.token)
      await AsyncStorage.setItem("UserData",JSON.stringify(responseJson.data))
    }
    else {
      this.showAlert("errors", responseJson.errors)
    }
  }
}

// Customizable Area End
