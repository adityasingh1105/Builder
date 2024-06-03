import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
// import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
// import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import RNFS, { DownloadBeginCallbackResult, DownloadProgressCallbackResult } from "react-native-fs";
import { PermissionsAndroid, Platform } from "react-native";
// Customizable Area End

export const configJSON = require("./config");
export const baseURLconfig = require("../../../framework/src/config");
export interface FileInterface {
  id: number;
  name: string;
  downloaded_at: string | null;
}
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
  progress: number;
  dowloadId: number;
  files: FileInterface[];
  downloadJobID: number;
  reference_id: number;
  reference_type: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DownloadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  downloadListApiID: string = "";
  downloadFileApiID: string = "";
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
      token: this.props.navigation.state.params.token,
      loader: false,
      progress: 0,
      dowloadId: 0,
      files: [],
      downloadJobID: 0,
      reference_id: this.props.navigation.state.params.reference_id,
      reference_type: this.props.navigation.state.params.reference_type,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.getFileList = this.getFileList.bind(this);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      const errorJson = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      switch (apiRequestCallId) {
        case this.downloadListApiID: {
          // handleResponseMessage({
          //   responseJson,
          //   errorJson,
          //   onSuccess: async () => {
          //     let files: FileInterface[] = responseJson.downloadable.data.attributes.files as FileInterface[];
          //     this.setState({
          //       files: files.reverse(),
          //       loader: false,
          //     });
          //   },
          //   onFail: () => {
          //     this.setState({
          //       loader: false,
          //     });
          //     this.showAlert(configJSON.errorAlertHeading, configJSON.listErrorAlertText);
          //   },
          // });
          break;
        }
      }
    }

    // Customizable Area End
  }
  // Customizable Area Start

  getFileList = async () => {
    this.setState({
      loader: true,
    });
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.downloadListApiID = requestMessage.messageId;

    // createRequestMessage({
    //   requestMessage: requestMessage,
    //   endPoint: `${configJSON.getListFileAPIEndpoint}${configJSON.refrenceIDText}${this.state.reference_id}${configJSON.refrenceTypeText}${this.state.reference_type}`,
    //   method: configJSON.validationGETApiMethodType,
    //   token: this.state.token,
    // });
  };
  checkPermission = async (fileId: number, fileName: string) => {
    if (Platform.OS === "android") {
      const isPermitted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (isPermitted) {
        await this.onDownloadFile(fileId, fileName);
      } else {
        const getPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        getPermission === "granted"
          ? await this.onDownloadFile(fileId, fileName)
          : this.showAlert(configJSON.errorAlertHeading, configJSON.permissionDeniedText);
      }
    } else {
      await this.onDownloadFile(fileId, fileName);
    }
  };
  onDownloadFile = async (fileId: number, fileName: string) => {
    this.setState({
      dowloadId: fileId,
    });
    let downloadURL: string =
      `${baseURLconfig.baseURL}${configJSON.downloadAPIURL}${configJSON.refrenceIDText}${this.state.reference_id}${configJSON.refrenceTypeText}${this.state.reference_type}${configJSON.fileIDText}` +
      fileId;
    const aPath = Platform.select({
      ios: RNFS.DocumentDirectoryPath,
      android: RNFS.DownloadDirectoryPath,
    });

    const downloadDest = `${aPath}/${fileName}`;

    const downloadOptions = {
      fromUrl: downloadURL,
      toFile: downloadDest,
      headers: {
        token: this.state.token,
      },
      begin: (response: DownloadBeginCallbackResult) => {
        this.setState({ downloadJobID: response.jobId });
      },
      progress: (response: DownloadProgressCallbackResult) => {
        this.setState({
          progress: Math.floor((response.bytesWritten / response.contentLength) * 100),
        });
      },
    };
    const downloadPromise = RNFS.downloadFile(downloadOptions);

    downloadPromise.promise
      .then(() => {
        this.getFileList();
        this.showAlert(configJSON.successAlertHeading, configJSON.fileDownloadedText);
        this.setState({
          loader: false,
          dowloadId: 0,
          progress: 0,
          downloadJobID: 0,
        });
      })
      .catch((_error) => {});
  };
  onCancelDownload = async () => {
    RNFS.stopDownload(this.state.downloadJobID);
    this.setState({ dowloadId: 0, progress: 0, loader: false, downloadJobID: 0 });
    this.showAlert(configJSON.cancelledAlertHeading, configJSON.fileDownloadCancelText);
  };

  async componentDidMount() {
    super.componentDidMount();
    this.getFileList();
  }
  // Customizable Area End
}
