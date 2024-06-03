//@ts-nocheck
// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { WithTranslation } from "react-i18next";
import i18n from "i18next"

// Customizable Area End

// Customizable Area Start
// Customizable Area End

export interface Props extends WithTranslation {
    navigation: any;    
    // Customizable Area Start
    onComplete: (validateOTP: string) => void;
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    full_phone_number: number,
    errors: {
        full_phone_number: string
    },
    error: boolean;
    FieldError: string;
    agree: boolean,
    languageScreen:boolean,
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    // Customizable Area End
}

export default class PhoneVerificationController extends BlockComponent<
    Props,
    S,
    SS
> {
// Customizable Area Start
    createAccountApiPhoneId: string=""
    apiVerifyotpCallId:string=""
// Customizable Area End
    constructor(props: Props) {
        super(props);
        // Customizable Area Start

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.CountryCodeMessage),
            // Customizable Area End
        ]
        this.state = {
            fullphonenumber: "",
            errors: {
                fullphonenumber: ""
            },
            error: false,
            FieldError: "",
            agree: false,
            languageScreen:false
        }

        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages)
        // Customizable Area End
    }


// Customizable Area Start

async componentDidMount(): Promise<void> {
    this.handleGetLanguage()
}

handleGetLanguage= () =>{
    const language = window.location.href.split("=")[1];
    i18n.changeLanguage(language || "En");
}
   
    handleChange = (element:number) => {
        const regex = /^[0-9\b]+$/;
        if (element.target.value === "" || regex.test(element.target.value)) {
            this.setState({ fullphonenumber: element.target.value })
        }
    };


    setRememberMe = (value: boolean) => {
        this.setState({ agree: value });
      };

    handleSubmit = ()=>{
        alert(i18n.t('validationSuccess'))
    }


    handleClose = () => {
        this.setState({ languageScreen: false })
      
    }; 
     
    handleStart = () =>{
        this.setState({ languageScreen: true })
    }

    handleChangeLanguage=(language:string)=> {
        this.setState({ languageScreen: false })
    window.location.replace(`/PhoneVerification?language=${language}`);      
  }
// Customizable Area End


}