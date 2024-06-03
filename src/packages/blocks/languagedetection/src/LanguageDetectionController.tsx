// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
// import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { setStorageData } from "../../../framework/src/Utilities";
import { NativeModules, Platform } from "react-native";
import { Language } from "./types";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  token: string;
  loader: boolean;
  languages: Language[];
  enableField: boolean;
  deviceLanguage: string;
  selectedLanguage: Language["attributes"];
}

interface SS {
  id: any;
}

export default class LanguageDetectionController extends BlockComponent<
  Props,
  S,
  SS
> {

  updateLanguageApiID: string;
  currentLanguageApiID: string;
  loginApiCallId: string;
  languageListApiID: string;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.doButtonPressed = this.doButtonPressed.bind(this);
    this.signin = this.signin.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
    this.getCurrentLanguage = this.getCurrentLanguage.bind(this);
    this.updateLanguageApiID = "";
    this.currentLanguageApiID = "";
    this.loginApiCallId = "";
    this.languageListApiID = "";

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      loader: false,
      languages: [],
      enableField: false,
      deviceLanguage: "",
      selectedLanguage: {
        id: 1,
        name: "",
        abbreviation: "en",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      switch (apiRequestCallId) {
        case this.loginApiCallId: {
          // handleResponseMessage({
          //   responseJson,
          //   errorJson,
          //   onSuccess: async () => {
          //     this.setState({
          //       token: responseJson.meta.token,
          //     });
          //     await this.getLanguageList();
          //     await this.getCurrentLanguage();
          //     this.setState({
          //       loader: false,
          //     });
          //     await setStorageData("TOKEN", responseJson.meta.token);
          //   },
          //   onFail: () => {
          //     this.showAlert(`Error`, "Get Token Failed. Please retry!");
          //     this.setState({
          //       loader: false,
          //     });
          //   },
          // });
          break;
        }

        case this.updateLanguageApiID: {
          // handleResponseMessage({
          //   responseJson,
          //   errorJson,
          //   onSuccess: async () => {
          //     this.setState({
          //       loader: false,
          //       selectedLanguage: responseJson.language.data.attributes,
          //     });
          //     this.showAlert(`Update`, responseJson.message);
          //   },
          //   onFail: () => {
          //     this.setState({
          //       loader: false,
          //       selectedLanguage: responseJson.language.data.attributes,
          //     });
          //     this.showAlert(`Error`, "Update Language Failed. Please retry!");
          //   },
          // });
          break;
        }

        case this.currentLanguageApiID: {
          // handleResponseMessage({
          //   responseJson,
          //   errorJson,
          //   onSuccess: async () => {
          //     if (responseJson.data === null) {
          //       let deviceLanguage = "";

          //       if (Platform.OS === "web") {
          //         deviceLanguage = window.navigator.language;
          //       } else if (Platform.OS === "ios") {
          //         deviceLanguage =
          //           NativeModules.SettingsManager.settings.AppleLocale ||
          //           NativeModules.SettingsManager.settings.AppleLanguages[0];
          //       } else if (Platform.OS === "android") {
          //         const getAbbreviation =
          //           NativeModules.I18nManager.localeIdentifier;
          //         deviceLanguage = getAbbreviation.split("_")[0];
          //       }
          //       this.doButtonPressed(deviceLanguage);
          //     } else {
          //       this.setState({
          //         loader: false,
          //         selectedLanguage: responseJson.data.attributes,
          //       });
          //     }
          //   },
          //   onFail: () => {
          //     this.setState({
          //       loader: false,
          //     });
          //     this.showAlert(
          //       `Error`,
          //       "Get Current Language Failed. Please retry!",
          //     );
          //   },
          // });
          break;
        }

        case this.languageListApiID: {
          // handleResponseMessage({
          //   responseJson,
          //   errorJson,
          //   onSuccess: async () => {
          //     this.setState({
          //       languages: responseJson.data as Language[],
          //       loader: false,
          //     });
          //   },
          //   onFail: () => {
          //     this.setState({
          //       loader: false,
          //     });
          //     this.showAlert(`Error`, "Get Current List Failed. Please retry!");
          //   },
          // });
          break;
        }
      }
    }
  }

  signin = () => {
    this.setState({
      loader: true,
    });
    const body = {
      data: {
        attributes: {
          email: configJSON.loginEmail,
          password: configJSON.loginPassword,
        },
        type: "email_account",
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.loginApiCallId = requestMessage.messageId;
    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint: "bx_block_login/logins",
    //   method: "POST",
    //   body: JSON.stringify(body),
    // });
  };

  getLanguageList = async () => {
    this.setState({
      loader: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.languageListApiID = requestMessage.messageId;

    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint: "bx_block_language_detection/languages",
    //   method: "GET",
    //   token: this.state.token,
    // });
  };

  getCurrentLanguage = async () => {
    this.setState({
      loader: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.currentLanguageApiID = requestMessage.messageId;
    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint: "bx_block_language_detection/languages/current_language",
    //   method: "GET",
    //   token: this.state.token,
    // });
  };

  async doButtonPressed(abbreviation: string) {
    this.setState({
      loader: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.updateLanguageApiID = requestMessage.messageId;
    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint:
    //     "bx_block_language_detection/languages/update_current_language?abbreviation=" +
    //     abbreviation,
    //   method: "POST",
    //   token: this.state.token,
    // });
  }
  async componentDidMount() {
    this.signin();
  }

  handleLanguageChange = (abbreviation: string) => {
    const language = this.state.languages.find(
      (lang) => lang.attributes.abbreviation === abbreviation,
    );
    if (language) {
      this.setState({ selectedLanguage: language.attributes }, () => {
        this.doButtonPressed(abbreviation);
      });
    }
  };

}

// Customizable Area End
