// Customizable Area Start
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";


import React from "react";

export const configJSON = require("../config");

export interface Props {
    navigation: any;
    id: string;
}

interface S {
    phoneNoWeb: string;
    countryCodeWeb: string;
    modalVisibleWeb: boolean;
    otpNumberWeb: string;
    userOtpWeb: string;
}

interface SS {
    id: any;
}

export default class LoginWebController extends BlockComponent<
    Props,
    S,
    SS
> {
    getVerificationOtpWebApiCallId: string = ""
    validateOtpWebApiCallId: string = ""

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage),
        ];

        this.state = {
            phoneNoWeb: "",
            countryCodeWeb: "91",
            modalVisibleWeb: false,
            otpNumberWeb: "",
            userOtpWeb: ""
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
            if (apiRequestCallId === this.getVerificationOtpWebApiCallId) {
                this.getVerificationOtpWebRecieveBlock(errorReponse, responseJson)
            }
            if (apiRequestCallId === this.validateOtpWebApiCallId) {
                this.validateOtpWebRecieveBlock(errorReponse, responseJson)
            }
        }
    }

    setWebModal = (value: boolean) => {
        this.setState({ modalVisibleWeb: value })
    }

    setWebOtp = (event:{target:{value:string}}) => {
        if(event.target){
            const {value}=event.target
            this.setState({ userOtpWeb: value })
        }
        else{
            this.setState({ userOtpWeb: "" })
        }
    }
    
    setWebPhoneNumber = (event:{target:{value:string}}) => {
        if(event.target){

            const {value}=event.target
            this.setState({ phoneNoWeb: value })
        }
        else{
            this.setState({ phoneNoWeb: "" })

        }
    }
    onWebValidate = (value: string, regex: RegExp) => {
        return regex.test(value)
    }
    onWebLogin = () => {
        if (this.onWebValidate(this.state.phoneNoWeb, configJSON.phoneInputRegex)) {
            this.getVerificationWebOtp()
        }
        else {
            this.showAlert("error", "please enter valid phone number")
        }
    }
    getVerificationWebOtp = () => {
        const header = {
            "Content-Type": configJSON.validationApiContentType
        };

        const requestData = {
            "full_phone_number": `+${this.state.countryCodeWeb}-${this.state.phoneNoWeb}`
        };



        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getVerificationOtpWebApiCallId = requestMessage.messageId;

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


    onWebSubmitOtp = () => {
        const header = {
            "Content-Type": configJSON.validationApiContentType
        };
        const otpData = {
            "full_phone_number": `+${this.state.countryCodeWeb}-${this.state.phoneNoWeb}`,
            "pin": `${this.state.otpNumberWeb}`
        }


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.validateOtpWebApiCallId = requestMessage.messageId;
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


    getVerificationOtpWebRecieveBlock = (errorReponse: string, responseJson: { errors: string; text_loacl_message: { pin: string } }) => {

        if (errorReponse) {
            this.showAlert("error", "something went wrong")
        }
        else if (responseJson && !responseJson.errors) {
            this.setState({ otpNumberWeb: responseJson.text_loacl_message.pin })
            if (!this.state.modalVisibleWeb) {
                this.setState({ modalVisibleWeb: true })
            }
        }
        else {
            this.showAlert("errror", responseJson.errors)

        }
    }
    validateOtpWebRecieveBlock = async (errorReponse: string, responseJson: { errors: string; data: {}, token: string, uniqId: string }) => {
        if (errorReponse) {
            this.showAlert("error", "something went wrong")
        }
        else if (responseJson && !responseJson.errors) {
            this.setState({ modalVisibleWeb: false })
            this.props.navigation.navigate('CompanyListWeb')
            localStorage.setItem("Token", responseJson.token)
            localStorage.setItem("UserData", JSON.stringify(responseJson.data))
        }
        else {
            this.showAlert("errors", responseJson.errors)
        }
    }
}

// Customizable Area End
