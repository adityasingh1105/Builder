import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import FileViewer from "react-native-file-viewer";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
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
  // Customizable Area Start
  refresh: Function;
  data: FileData;
  token: string;
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
    /* istanbul ignore next */
    RNFS.exists(
      `${Platform.select({
        ios: RNFS.DocumentDirectoryPath,
        android: RNFS.DownloadDirectoryPath,
      })}` + `/download_${this.props.data.attributes?.name}`,
    ).then((exists) => {
      this.setState({
        isDownloaded: exists,
        downloadedFilePath:
          `${Platform.select({
            ios: RNFS.DocumentDirectoryPath,
            android: RNFS.DownloadDirectoryPath,
          })}` + `/download_${this.props.data.attributes.name}`,
      });
    });
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
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  downloadViewButtonProps = {
    onPress: () => {
      !this.state.isDownloaded ? this.checkPermission() : this.viewClick();
    },
  };

  deleteFileButtonProps = {
    onPress: () => this.deleteFile(),
  };

  editFileButtonProps = {
    onPress: () => this.editFile(),
  };

  /*istanbul ignore next */
  checkPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const isPermitted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (isPermitted) {
          await this.downloadFile();
        } else {
          const getPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          getPermission === "granted"
            ? await this.downloadFile()
            : this.showAlert("Error", "Permission denied");
        }
      } catch (error) {}
    } else {
      await this.downloadFile();
    }
  };

  downloadFile = async () => {
    try {
      const aPath = Platform.select({
        ios: RNFS.DocumentDirectoryPath,
        android: RNFS.DownloadDirectoryPath,
      });
      if (this.isPlatformAndroid()) {
        const filePathExists = await RNFS.exists(RNFS.DownloadDirectoryPath);
        if (!filePathExists) {
          await RNFS.mkdir(RNFS.DownloadDirectoryPath);
        }
      }

      const filePath =
        aPath + `/download_${decodeURI(this.props.data.attributes.name)}`;
      const options = {
        fromUrl: this.props.data.attributes.url,
        toFile: filePath,
      };
      this.setState({ isDownloading: true });
      RNFS.downloadFile(options)
        .promise.then((response) => {
          this.setState({ isDownloading: false });
          this.showAlert("Success", "File Downloaded");
          this.setState({
            isDownloading: false,
            isDownloaded: true,
            downloadedFilePath: filePath,
          });
        }).catch((error) => {
            this.showAlert("error", `${JSON.stringify(error)}`)
        })
        .catch((error) => {
          this.showAlert("error", `${JSON.stringify(error)}`);
        });
    } catch (error) {}
  };

  editFile = () => {
    this.props.navigation.navigate("FileAttachmentUpload", {
      token: this.props.token,
      description: this.props.data.attributes.description,
      tag: this.props.data.attributes.tag,
      id: this.props.data.id,
      isEdit: true,
    });
  };

  deleteFile = () => {
    const header = {
      token: this.props.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deleteAttachedFile = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.getFileList}/${this.props.data.id}`,
      method: configJSON.DELETEApiMethodType,
      header: header,
    });
  };

  viewClick = async () => {
    try {
      await FileViewer.open(this.state.downloadedFilePath);
    } catch (error) {
      this.showAlert("Error", `File type can't be opened`);
    }
  };

  // Customizable Area End
}
