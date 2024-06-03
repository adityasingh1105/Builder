import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./Helpers/create-request-message";

// Customizable Area End

export const configJSON = require("./config");

interface FileData {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    embedded_code: string;
    tag: string;
    content_type: string;
    thumbnail: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    created_by: number;
    url: string;
  };
}
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  uploadedFileList: Array<FileData>;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FileAttachmentListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  listApiCallId: string = "";
  fileUploadCallId: string = "";
  attachedFileList: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      uploadedFileList: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );
      if (apiRequestCallId === this.listApiCallId) {
        if (responseJson && responseJson.meta) {
          this.setState({ token: responseJson.meta.token }, () => {
            this.getFileList();
          });
        }
      } else if (apiRequestCallId === this.attachedFileList) {
        if (responseJson) {
          responseJson.date?.data?.length === 0
            ? this.showAlert("Message", "No Attached Files")
            : this.setState({ uploadedFileList: responseJson.date.data });
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.login();
    this.props.navigation.addListener("didFocus", () => {
      this.getFileList();
    });
  }

  async componentWillUnmount() {
    this.props.navigation.removeListener("didFocus", () => {});
  }

  // Customizable Area Start

  navFileAttachBtnExampleProps = {
    onPress: () =>
      this.props.navigation.navigate("FileAttachmentUpload", {
        token: this.state.token,
      }),
  };

  login = () => {
    const body = {
      data: {
        attributes: {
          email: configJSON.email,
          password: configJSON.securedText,
        },
        type: "email_account",
      },
    };
    const header = {
      "Accept": configJSON.validationApiContentType,
      "Content-Type": configJSON.validationApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.listApiCallId = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginEndPoint,
      method: configJSON.POSTApiMethodType,
      header: header,
      body: JSON.stringify(body),
    });
  };

  getFileList = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.attachedFileList = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.getFileList,
      method: configJSON.GETApiMethodType,
      header: header,
    });
  };

  // Customizable Area End
}
