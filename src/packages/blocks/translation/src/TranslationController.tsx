import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  convertedText: string;
  fromLang: string;
  toLang: string;
  languages: Array<{ code: string; name: string }>;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TranslationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getLanguageCallId: string = "";
  getTranslateCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      convertedText: "Hello bro",
      fromLang: "en",
      toLang: "ar",
      languages: [],
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getLanguage();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getLanguageCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ languages: responseJson });
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTranslateCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ convertedText: responseJson?.translatedText });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtInputProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  translateTextWeb() {
    const headers = {
      "Content-Type": configJSON.translateApiContentType,
    };

    const getTranslateMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getTranslateCallId = getTranslateMsg.messageId;

    getTranslateMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.translateApiBaseUrl + configJSON.translateApiEndPoint
    );

    getTranslateMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getTranslateMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.translateApiMethodType
    );
    getTranslateMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({
        q: this.state.txtInputValue,
        source: this.state.fromLang,
        target: this.state.toLang,
        format: "text",
      })
    );
    runEngine.sendMessage(getTranslateMsg.id, getTranslateMsg);
  }

  getLanguage() {
    const headers = {
      "Content-Type": configJSON.languageApiContentType,
    };

    const getLanguageMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getLanguageCallId = getLanguageMsg.messageId;

    getLanguageMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.translateApiBaseUrl + configJSON.languagesApiEndPoint
    );

    getLanguageMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getLanguageMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.languageApiMethodType
    );
    runEngine.sendMessage(getLanguageMsg.id, getLanguageMsg);
  }

  handleChangeFrom = (e: any) => {
    this.setState({ fromLang: e.target.value });
  };

  handleChangeTo = (e: any) => {
    this.setState({ toLang: e.target.value });
  };
  handleChangeFromMobile = (value: any) => {
    this.setState({ fromLang: value });
  };

  handleChangeToMobile = (value: any) => {
    this.setState({ toLang: value });
  };
  // Customizable Area End
}
