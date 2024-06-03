import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
// import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import { Platform } from "react-native";
// Customizable Area End

export const configJSON = require("./config");
export const baseURLconfig = require("../../../framework/src/config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  loader: boolean;
  reference_id: number;
  reference_type: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DownloadUploadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  fileUploadApiID: string = "";
  firstTokenApiCallID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loader: false,
      reference_id: 0,
      reference_type: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (apiRequestCallId === this.firstTokenApiCallID) {
        if (responseJson?.meta) {
          this.setState({ token: responseJson.meta.token });
        }
      } else if (apiRequestCallId === this.fileUploadApiID) {
        this.setState({
          loader: false,
        });
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.showAlert(`Update`, responseJson.message);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  refrenceIDtxtInputProps = {
    onChangeText: (text: string) => {
      this.setState({ reference_id: parseInt(text) });
    },
  };
  refrenceTypetxtInputProps = {
    onChangeText: (text: string) => {
      this.setState({ reference_type: text });
    },
  };

  login = () => {
    const body = {
      type: "employee",
      email: configJSON.mail,
      password: configJSON.textSecured,
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.firstTokenApiCallID = requestMessage.messageId;
    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint: configJSON.loginEndPoint,
    //   method: configJSON.postAPIMethod,
    //   body: JSON.stringify(body),
    // });
  };
  uploadFile = async () => {
    this.setState({
      loader: true,
    });
    const response: DocumentPickerResponse = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
      mode: "import",
      copyTo: "documentDirectory",
    });

    const formData = new FormData();
    formData.append("files[]", {
      name: String(response.name),
      type: response.type,
      uri: Platform.OS === "ios" ? response.uri.replace("file://", "") : response.uri,
    } as unknown as Blob);
    formData.append("reference_id", this.state.reference_id.toString());
    formData.append("reference_type", this.state.reference_type);

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.fileUploadApiID = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.uploadAPIEndpoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.postAPIMethod);
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        token: this.state.token,
      })
    );
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData);
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleNavigation = () =>
    this.props.navigation.navigate("DownlaodList", {
      token: this.state.token,
      reference_id: this.state.reference_id,
      reference_type: this.state.reference_type,
    });

  async componentDidMount() {
    super.componentDidMount();
    this.login();
  }
  // Customizable Area End
}
