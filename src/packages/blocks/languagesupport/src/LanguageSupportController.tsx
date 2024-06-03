//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import { setStorageData } from 'framework/src/Utilities'
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class LanguageSupportController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) { 
    // Customizable Area Start
    // Customizable Area End
  }

 
  // Customizable Area Start
  selectlng(){
    Alert.alert("Select a language", "Choose an option ", [
      {
      text: "English",
      onPress: () => this.changeLang('English')
    }, {
      text: "Spanish",
      onPress: () => {this.changeLang('Spanish')}
    }, {
      text: "French",
      onPress: () => {this.changeLang('French')}
    }])
  }
   changeLang(value: string) {
    if (value === 'French') {
      this.props?.lan?.alternateLanguage('fr');
      setStorageData('chosenLanguage', 'fr')
      this.props?.navigation?.replace('DownloadOptions')
    }
    else if (value === 'Spanish') {
      this.props?.lan?.alternateLanguage('es');
       setStorageData('chosenLanguage', 'es')
      this.props?.navigation?.replace('DownloadOptions')
    }
    else {
      this.props?.lan?.alternateLanguage('en');
       setStorageData('chosenLanguage', 'en')
      this.props?.navigation?.replace('DownloadOptions')
    }
  }

  // Customizable Area End
}
