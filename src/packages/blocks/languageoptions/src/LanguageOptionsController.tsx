import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./languageComponent/context/Context";
import { langaugeFunction } from "./languageComponent/I18nConfig/I18nConfig";
// import i18next from "i18next";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  lunguageSelect: number;
  currentLanguage: string;
  value: string;
  // Customizable Area Start
  token: string | null;
  totalLanguages: [{
    language: string;
    flag: string;
  }];
  showLoader: boolean;
  languages: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class LanguageOptionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getLanguageAPICall: string = "";
  getSearchDetailsLanguage: string = "";
  static contextType = Context;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      lunguageSelect: 0,
      currentLanguage: "English",
      totalLanguages: [{
        language: "",
        flag: "",
      }],
      token: "",
      value: "en",
      showLoader: false,
      languages : "English"
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount(): Promise<void> {
    const { initLanguage } = this.context;
    initLanguage();
    this.getLanguages();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("didFocus", () => {
        this.getToken();
      });
    }
    const langue = await AsyncStorage.getItem("appLanguage");
    if (langue == "English") {
      this.setState({ lunguageSelect: 0, currentLanguage: "English"});
    } else if (langue == "Francais") {
      this.setState({ lunguageSelect: 1, currentLanguage: "Francais" });
    } else {
      this.setState({ lunguageSelect: 0, currentLanguage: "English"});
    }
    this.getLanguageresults();
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getLanguageAPICall) {
          this.setState({ totalLanguages: responseJson?.languages });
          this.setState({ showLoader: false });
        }
      }
    }

    if (
      this.getSearchDetailsLanguage ==
      message?.properties?.RestAPIResponceDataMessage
    ) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.errors) {
      } else {
        const langData = JSON.stringify(responseJson.meta.translations);
        await AsyncStorage.setItem("langDataController", langData);
        this.setState({ showLoader: false });
        await langaugeFunction();
      }
    }

    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msgs = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msgs.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msgs);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  setLanguage = (language: string) => {
    this.setState({languages: language});
  }
  
  setLanguageSelect = (index: number) => {
    this.setState({ lunguageSelect: index });
  };

  setLoader = (load: boolean) => {
    this.setState({ showLoader: load });
  };

  async getToken() {
    let tokens: string | null = "";
    tokens = await AsyncStorage.getItem("LOGIN_TOKEN");
    this.setState({ token: tokens }, () => this.getLanguages());
  }

  apiCall = async (data: {contentType:string, method: string, endPoint:string}) => {
    const { initLanguage } = this.context;
    initLanguage();
    const { contentType, method, endPoint } = data;

    const header = {
      "Content-Type": contentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getLanguages = async () => {
    this.setState({ showLoader: true });
    this.getLanguageAPICall = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.apiEndPointGetLanguage,
    });
  };

  getLanguageresults = async () => {
    const applanguage = await AsyncStorage.getItem("appLanguage");
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const body = {
      language: applanguage,
    };

    this.getSearchDetailsLanguage = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointUpdateLanguge
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postAPiMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
