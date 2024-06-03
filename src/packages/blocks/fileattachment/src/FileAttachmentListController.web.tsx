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

interface FileData {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    embeded_code: string;
    tag: string;
    content_type: string;
    thumnail: string;
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
  previewModalVisible: boolean;
  previewModalSrc: string;
  previewModalMimeType: string;
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
      previewModalVisible: false,
      previewModalSrc: "",
      previewModalMimeType: "",
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
          localStorage.setItem("testToken", responseJson.meta.token);
          this.setState({ token: responseJson.meta.token || "" }, () => {
            this.getFileList();
          });
        }
      } else if (apiRequestCallId === this.attachedFileList) {
        if (responseJson) {
          responseJson.date.data.length === 0 &&
            this.showAlert("Message", "No Attached Files");
          this.setState({ uploadedFileList: responseJson.date.data });
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.login();
  }

  // Customizable Area Start

  navfileAttachBtnExampleProps = {
    onClick: () => {
      this.props.navigation.navigate("FileAttachmentUpload");

      localStorage.removeItem("description");
      localStorage.removeItem("tag");
      localStorage.removeItem("id");
      localStorage.removeItem("isEdit");
      localStorage.removeItem("selectType");
      localStorage.removeItem("url");
      localStorage.removeItem("name");
    },
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

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginEndPoint,
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header),
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTApiMethodType,
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body),
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handlePreviewModalOpen = (item: FileData) => {
    if (
      item.attributes.content_type === "doc" ||
      item.attributes.content_type === "pdf"
    ) {
      const link = document.createElement("a");
      link.href = item.attributes.url;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.setState({
        previewModalVisible: true,
        previewModalSrc: item.attributes.url,
        previewModalMimeType: item.attributes.content_type,
      });
    }
  };

  handleModalClose = () => {
    this.setState({ previewModalVisible: false });
  };

  getFileList = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.attachedFileList = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getFileList,
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header),
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GETApiMethodType,
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
