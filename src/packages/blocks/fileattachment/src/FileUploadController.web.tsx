import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
const urlToBlob = require("urltoblob-ext");

interface IDocumentTypes {
  [key: string]: Array<string>;
}

export const DocumentExtensions: IDocumentTypes = {
  doc: [".txt", ".csv", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"],
  jpg: [".jpeg", ".jpg", ".png"],
  pdf: [".pdf"],
  mp3: [
    ".3g2",
    ".3gp",
    ".aac",
    ".adt",
    ".adts",
    ".aif",
    ".aifc",
    ".aiff",
    ".asf",
    ".au",
    ".m3u",
    ".m4a",
    ".m4b",
    ".mid",
    ".midi",
    ".mp2",
    ".mp3",
    ".rmi",
    ".snd",
    ".wav",
    ".wax",
    ".wma",
  ],
  mp4: [".mp4", ".mov"],
};
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
  // Customizable Area Start
  descInputValue: string;
  tagInputValue: string;
  selectedFileName: string;
  selectedDocumentType: string;
  token: string;
  isUploading: boolean;
  file?: File | string;
  previewModalSrc: string;
  previewModalVisible: boolean;
  previewModalMimeType: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FileUploadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  loginApiCallId: string = "";
  fileUploadCallId: string = "";
  fileUpdateCallId: string = "";
  token: string = localStorage.getItem("token") || "";
  fileInputRef: HTMLInputElement | null = null;
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
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      descInputValue: localStorage.getItem("description") || "",
      tagInputValue: localStorage.getItem("tag") || "",
      selectedDocumentType: localStorage.getItem("selectType") || "doc",
      token: this.token,
      selectedFileName: "",
      isUploading: false,
      previewModalVisible: false,
      previewModalSrc: localStorage.getItem("url") || "",
      file: localStorage.getItem("url") || "",
      previewModalMimeType: localStorage.getItem("selectType") || "doc",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog(JSON.stringify(message), "Message Recived");
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      if (apiRequestCallId === this.fileUploadCallId) {
        if (responseJson) {
          this.setState({ isUploading: false });
          this.props.navigation.navigate("FileAttachment");
          this.showAlert("Success", "File uploaded");
        }
      } else if (apiRequestCallId === this.fileUpdateCallId) {
        if (responseJson) {
          this.setState({ isUploading: false });
          this.props.navigation.navigate("FileAttachment");
          this.showAlert("Success", "File updated");
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  tagInputWebProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ tagInputValue: event.target.value });
    },
  };

  handleFileInputRef = (event: HTMLInputElement | null) => {
    this.fileInputRef = event;
  };

  handleChooseFileClick = () => {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  };

  descInputWebProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ descInputValue: event.target.value });
    },
    secureTextEntry: false,
  };

  setEnableField = () => {
    /* istanbul ignore next */
    this.setState({ enableField: !this.state.enableField });
  };

  pickerProps = {
    onChange: (
      itemValue: React.ChangeEvent<{ name?: string; value: unknown }>,
    ) =>
      this.setState({ selectedDocumentType: itemValue.target.value as string }),
  };

  getBase64 = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ previewModalSrc: reader.result as string });
    };
  };

  handleUploadInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ file: event.target.files?.[0] });
    this.getBase64(event.target.files?.[0] as File);
  };

  handleViewModal = () => {
    if (
      this.state.selectedDocumentType === "doc" ||
      this.state.selectedDocumentType === "pdf"
    ) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(this.state.file as File);
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.setState({
        previewModalVisible: true,
        previewModalMimeType: this.state.selectedDocumentType,
      });
    }
  };

  handleViewModalClose = () => {
    this.setState({ previewModalVisible: false });
  };

  async fileUploadUpdate(isUpdate: boolean) {
    if (!this.state.file) {
      return;
    }
    const header = {
      Accept: "*/*",
      token: localStorage.getItem("testToken"),
    };

    const formData = new FormData();
    formData.append(
      "name",
      typeof this.state.file === "string"
        ? localStorage.getItem("name") || ""
        : this.state.file.name,
    );
    formData.append("description", this.state.descInputValue);
    formData.append("embeded_code", String(Date.now()));
    formData.append("url", this.state.file);
    formData.append("tag", this.state.tagInputValue);
    formData.append("content_type", this.state.selectedDocumentType);
    formData.append("thumnail", "current");
    formData.append("is_active", "true");
    formData.append("updated_by", "admin");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    if (isUpdate) {
      this.fileUpdateCallId = requestMessage.messageId;
    } else {
      this.fileUploadCallId = requestMessage.messageId;
    }

    isUpdate
      ? requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `${configJSON.postFileURL}/${localStorage.getItem("id")}`,
        )
      : requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.postFileURL,
        );
    isUpdate
      ? requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.PUTApiMethodType,
        )
      : requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.POSTApiMethodType,
        );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header),
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData,
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.setState({ isUploading: true });
  }

  async componentDidMount() {
    const fileUrl = localStorage.getItem("url");

    if (fileUrl) {
      const blob = await urlToBlob.urlToBlob(fileUrl);
      const file = new window.File(
        [blob],
        localStorage.getItem("name") || "downloadFile",
      );

      this.setState({ file });
    }
  }

  async componentWillUnmount() {
    localStorage.removeItem("token");
    localStorage.removeItem("description");
    localStorage.removeItem("tag");
    localStorage.removeItem("id");
    localStorage.removeItem("isEdit");
    localStorage.removeItem("selectType");
    localStorage.removeItem("url");
    localStorage.removeItem("name");

    super.componentWillUnmount();
  }
  // Customizable Area End
}
