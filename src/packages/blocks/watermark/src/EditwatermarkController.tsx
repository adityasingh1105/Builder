import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import React from "react";
import StorageProvider from "../../../framework/src/StorageProvider";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import { showMessage } from "react-native-flash-message";
import CameraRoll from "@react-native-community/cameraroll";
import { captureRef } from "react-native-view-shot";
import { getStorageData } from "../../../framework/src/Utilities";
const navigation = require("react-navigation");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface ActionType {
  // createRef()
}

interface ActionTypeTwo {
  // createRef()
}

interface WatermarkData {
    watermark_maker: {
        data: [
            {
                id: string,
                type: string,
                attributes: {
                    id: number,
                    category: string,
                    image: string
                }
            },
        ]
    }
}

interface S {
  token: string;
  loading: boolean;
  waterMarkText: string;
  image: string;
  logoImage: string;
  selectedWatermarkId: number;
  waterMarkArray: string[];
  watermarkSingle: string[];
  transformValue: number;
  waterMarkData: WatermarkData[];

  textColor: string;
  sliderColor: string;
  opacity: number;
  oldColor: string;
  selectedWaterMark: {
    id: string,
    type: string,
    attributes: {
        id: number,
        category: string,
        image: string
    }
};
  isVisible: boolean;
  activeSubscriptionData: object;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: number;
}

export default class EditwatermarkController extends BlockComponent<
  Props,
  S,
  SS
> {
  actionRef: React.RefObject<ActionType>;
  actionLogoRef: React.RefObject<ActionTypeTwo>;
  getWatermarkApiCallId!: string;
  editWaterMarkTemplateDownloadId!: string;
  viewRef: React.RefObject<ActionType>;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      token: "",
      loading: false,
      watermarkSingle: this.props.navigation.state.params.text
        ? Array(1).fill(this.props.navigation.state.params.text)
        : Array(1).fill(this.props.navigation.state.params.logoImage),
      waterMarkText: this.props.navigation.state.params.text,
      image: this.props.navigation.state.params.image,
      logoImage: this.props.navigation.state.params.logoImage,
      selectedWatermarkId: 0,
      waterMarkArray: this.props.navigation.state.params.text
        ? Array(70).fill(this.props.navigation.state.params.text)
        : Array(25).fill(this.props.navigation.state.params.logoImage),
      transformValue: 0,
      waterMarkData: [],
      textColor: "",
      sliderColor: "",
      opacity: 1,
      oldColor: "",
      selectedWaterMark: {
        id: '',
        type: '',
        attributes: {
            id: 0,
            category: '',
            image: ''
        }
    },
      isVisible: false,
      activeSubscriptionData: {},
    };

    this.actionRef = React.createRef();
    this.actionLogoRef = React.createRef();
    this.viewRef = React.createRef();
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  getDataStorage = () => {
    return getStorageData(
      "activeSubscriptionData",
      true
    );
  }

  async componentDidMount() {
    super.componentDidMount();
    let activeSubscriptionData = await this.getDataStorage()
    this.setState({ activeSubscriptionData })
    this.getWatermarkData();
    if (this.isPlatformWeb() === false) { this.props.navigation.addListener("focus", () => { this.getToken(); }); }
    let token = await StorageProvider.get("USER_TOKEN")
    this.setState({ token: token })
  }

  getToken = () => { };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getWatermarkApiCallId) {
          this.getWatermarkSuccesscallBack(responseJson);
        }
        else if (apiRequestCallId === this.editWaterMarkTemplateDownloadId) {
          this.editTemplateDownloadSuccessCallBack();
        }
      }
      else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getWatermarkApiCallId) {
          this.getWatermarkFailureCallBack();
        }
        else if (apiRequestCallId === this.editWaterMarkTemplateDownloadId) {
          this.editTemplateDownloadFailureCallBack();
        }
      }
      else if (errorReponse) {
        this.setState({ loading: false });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  apiCall = async (dataCall: {
    contentType?: string,
    method?: string,
    endPoint?: string,
    body?: {},
    type?: string,
  }) => {
    let { contentType, method, endPoint, body } = dataCall;
    let token = this.state.token
    let header = { "Content-Type": contentType, token, };
    let requestMessage = new Message(
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
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  // Customizable Area End
  //================================ GET Watermark API =========================================== //
  // Customizable Area Start
  getWatermarkData = async () => {
    this.setState({ loading: true });
    this.getWatermarkApiCallId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_watermark/watermark_makers?token=${this.state.token}`,
    });
  };

  getWatermarkSuccesscallBack = async (response: {
    watermark_maker: {
      data: WatermarkData[]
    },
    watermark_makers: {
      data : [{
        id: string,
        type: string,
        attributes: {
            id: number,
            category: string,
            image: string
        }
    }],
    }
  }) => {
    this.setState({
      waterMarkData: response?.watermark_maker?.data,
      loading: false,
      selectedWaterMark: response?.watermark_makers?.data[0],
    });
  };

  getWatermarkFailureCallBack = () => {
    this.setState({ loading: false });
  };

  //================================ Download edit template API =========================================== //

  editTemplateDownloadApi = async () => {
    this.setState({ loading: true });
    this.editWaterMarkTemplateDownloadId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `bx_block_download/download_counts/update_download_count?module=BxBlockCustomFlow::WatermarkMaker&template_id=${this.state.selectedWaterMark?.id}`,
    });
  };
  // Customizable Area End
  // Customizable Area Start

  editTemplateDownloadSuccessCallBack = async () => { this.setState({ loading: false }); };

  editTemplateDownloadFailureCallBack = () => { this.setState({ loading: false }); };

  onOpen = () => { this.setState({ isVisible: true, }); };

  onClose = () => { this.setState({ isVisible: false, }); };

  onPressSubscribe = () => {
    this.setState({ isVisible: false, });
    this.props.navigation.navigate("Payments", { type: "Custom" });
  };

  onSelectWatermark = (item: {}, indexing: number) => {
    this.setState({
      selectedWatermarkId: indexing,
      transformValue: 0,
      selectedWaterMark: {
        id: '',
        type: '',
        attributes: {
            id: 0,
            category: '',
            image: ''
        }
    },
    });
  };
  // Customizable Area End

  // Customizable Area Start
  hasAndroidPermission = async () => {
    let permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    let hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) { return true; }
    let status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  moveImage = async (filename: string, decodedURL : string) => {
    let toFile =
      Platform.OS === "ios"
        ? `${RNFS.DocumentDirectoryPath}/ishtehaar/${filename}`
        : `${RNFS.DownloadDirectoryPath}/ishtehaar/${filename}`;
    await RNFS.copyFile(decodedURL, toFile).then(async (response) => {
      if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(toFile, { type: "photo", album: "ishtehaar" });
      this.editTemplateDownloadApi();
      showMessage({
        message: "Downloaded Successfully!",
        type: "success",
      });
    });
  };

  captch = (uriName: string) => {
    let filename = uriName
      .toString()
      .replace(/^.*[\\\/]/, "")
      .replace(/%20/g, " ");

    let decodedURL = decodeURIComponent(uriName);
    let filePath =
      Platform.OS === "ios"
        ? `${RNFS.DocumentDirectoryPath}/ishtehaar/`
        : `${RNFS.DownloadDirectoryPath}/ishtehaar/`;
    RNFS.exists(filePath)
    try {
      async (exists : string) => {
        if (exists) {
          await this.moveImage(filename, decodedURL);
        }
        else {
          RNFS.mkdir(filePath).then(async () => {
            await this.moveImage(filename, decodedURL);
          });
        }
      }
    } catch {

    }
  }

  captureImage = () => {
    this.setState({ loading: true });
    captureRef(this.viewRef, {
      format: "jpg",
      quality: 1.0,
    })
    try {
      () => this.captch
    }
    catch {
      () => {
        this.setState({ loading: false });
      }
    }
  };
  onDownload = async () => {
    if (Platform.OS == "android") {
      try {
        let granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Ishtehaar App Camera Permission",
            message: "Your app needs permission.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.captureImage();
        }
        else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
    else {
      this.captureImage();
    }
  };
  // Customizable Area End

  // Customizable Area Start

  changeColor = (colorHsvOrRgb: {s: number} ) => { this.setState({ opacity: colorHsvOrRgb.s, }); };

  visible = () => { this.setState({ isVisible: false }) }

  color = () => { this.setState({ textColor: "#000000" }) }

  textColor = () => this.setState({ textColor: "#FFFFFF" })

  transfrom = (value : number) => { this.setState({ transformValue: value, }) }

  // Customizable Area End
  // Customizable Area Start
  // Customizable Area End
}