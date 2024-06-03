import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
const urlToBlob = require("urltoblob-ext");
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
  // Customizable Area Start
  refresh: Function;
  data: FileData;
  token: string;
  onClick?: () => void;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isDownloaded: boolean;
  isDownloading: boolean;
  downloadedFilePath: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FileListCardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  deleteAttachedFile: string = "";
  fileUploadCallId: string = "";
  fileDownloadCallId: string = "";

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
      isDownloaded: false,
      isDownloading: false,
      downloadedFilePath: "",
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

      if (apiRequestCallId === this.deleteAttachedFile) {
        if (responseJson && responseJson.message) {
          if (responseJson.message === "File Attachment deleted.") {
            this.props.refresh();
            this.showAlert("Success", "File Deleted");
          }
        }
      } else if (apiRequestCallId === this.fileDownloadCallId) {
        if (responseJson) {
          this.showAlert("Success", "File Downloaded");
          this.setState({
            isDownloading: false,
            isDownloaded: true,
            downloadedFilePath: responseJson.path(),
          });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  onViewClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  viewButtonProps = {
    onClick: this.onViewClick,
  };

  downloadButtonProps = {
    onClick: async () => {
      const blob = await urlToBlob.urlToBlob(this.props.data.attributes.url);
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = this.props.data.attributes.name;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  };

  deleteFileButtonProps = {
    onClick: () => this.deleteFile(),
  };

  editFileButtonProps = {
    onClick: () => this.editFile(),
  };

  editFile = () => {
    localStorage.setItem("token", this.props.token);
    localStorage.setItem("description", this.props.data.attributes.description);
    localStorage.setItem("tag", this.props.data.attributes.tag);
    localStorage.setItem("id", this.props.data.id);
    localStorage.setItem("isEdit", "true");
    localStorage.setItem("selectType", this.props.data.attributes.content_type);
    localStorage.setItem("url", this.props.data.attributes.url);
    localStorage.setItem("name", this.props.data.attributes.name);

    this.props.navigation.navigate("FileAttachmentUpload");
  };

  deleteFile = () => {
    const header = {
      token: this.props.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deleteAttachedFile = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getFileList}/${this.props.data.id}`,
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header),
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DELETEApiMethodType,
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
