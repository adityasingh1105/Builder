import { BlockComponent } from "./../../../framework/src/BlockComponent";
// Customizable Area Start
import { WithTranslation } from "react-i18next";
// Customizable Area End

// Customizable Area Start
// Customizable Area End

export interface Props extends WithTranslation {
    navigation: any;
    // Customizable Area Start
    identifiable: string;    
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    isLoading: boolean;
    languageScreen:boolean,
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    // Customizable Area End
}
// Customizable Area Start
export default class WelcomeScreenController extends BlockComponent<
    Props,
    S,
    SS
> {
    apiCreatePostCallId: string=""
    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: false,
            languageScreen:false
        }
    }

    handleClose = () => {
        this.setState({ languageScreen: false })
      
    }; 
     
    handleStart=()=>{
        this.setState({ languageScreen: true })
    }
  

    handleChangeLanguage(language:string) {
            this.setState({ languageScreen: false })
        window.location.replace(`/PhoneVerification?language=${language}`);      
      }
   

}
// Customizable Area End