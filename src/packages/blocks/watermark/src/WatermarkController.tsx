import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import RNImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import { Platform, PermissionsAndroid } from "react-native";
import React from "react";
import { Image } from "react-native-compressor";

// Customizable Area Start
// Customizable Area End

export let configJSON = require("./config");
let FONTDEF = "Montserrat-Medium";

interface ActionType {
  current: {
    show: () => {}
  }
}

interface ActionTypeTwo {
  current: {
    show: () => {}
  }
}

interface imgInterface {
  uri?: string;
  name?: string | undefined;
  type?: string;
}

interface logoInterface {
  uri?: string;
}

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}



interface S {
  token: string;
  isShowWaterMarkText: boolean;
  loading: boolean;
  logoImage: string;
  logoObj: logoInterface;
  waterMarkText: string;
  imageObj: imgInterface;
  image: string;
  waterMarkTextError: string;
  isFocus: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: number;
}

export default class WatermarkController extends BlockComponent<
  Props,
  S,
  SS
> {
  actionRef: React.RefObject<ActionType>;
  actionLogoRef: React.RefObject<ActionTypeTwo>;
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
      isShowWaterMarkText: false,
      token: "",
      loading: false,
      logoImage: "",
      logoObj: {},
      waterMarkText: "",
      image: "",
      imageObj: {},
      waterMarkTextError: "",
      isFocus: false,
    };
    this.actionRef = React.createRef();
    this.actionLogoRef = React.createRef();
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }


  async componentDidMount() {
    super.componentDidMount();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("focus",()=>{});
    }
  }


  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End

  }

  apiCall = async () => {
    // Customizable Area Start
    // Customizable Area End
  };

  // Customizable Area Start
  onRemoveLogo = () => { this.setState({ logoImage: "", logoObj: {}, }); };
  //
  imagedata = async (image: {uri:string}) => {
    let result = await Image.compress(image.uri, {
      maxWidth: 1000,
      quality: 0.1,
    });
    let logoData = { uri: result, };
    this.setState({ logoImage: result, logoObj: logoData, });
  }

  lunchLibraray =  async (image:{uri:string}) => {
    let result = await Image.compress(image.uri, { maxWidth: 1000, quality: 0.1, });
    let logoData = { uri: result, };
    this.setState({ logoImage: result, logoObj: logoData, });
  }

  opencamera = (image:{path:string,filename:string,mime:string}) => {
    let imageData = {
      uri: image.path,
      name:
        Platform.OS === "android"
          ? image.filename
          : image.path.split("/").pop(),
      type: image.mime,
    };
    this.setState({ image: image.path, imageObj: imageData, });
  }

  /* image upload */
  onPressActionItem = async (actionIndex: number, indexing: number) => {
    switch (actionIndex) {
      case 1:
        if (indexing !== 0) {
          RNImagePicker.launchCamera(
            {
              mediaType: "photo",
              quality: 0.1,
            },
            this.imagedata
          );
        } else {
          ImagePicker.openCamera({
            mediaType: "photo",
            cropping: true,
            width: 3450 * 2,
            height: 3800 * 2,
            useFrontCamera: true,
            compressImageQuality: 1,
            includeBase64: false,
            showCropGuidelines: true,
            cropperToolbarTitle:
              Platform.OS === "ios" ? "Move and Scale" : "Edit Photo",
          })
          try{
               this.opencamera
          }
          catch (error){

          }
        }
        break;
      case 0:
        if (indexing !== 0) {
          RNImagePicker.launchImageLibrary(
            {
              mediaType: "photo",
              quality: 0.1,
            },
           this.lunchLibraray
          );
        } else {
          await ImagePicker.openPicker({
            mediaType: "photo",
            cropping: true,
            width: 3450 * 2,
            height: 3800 * 2,
            includeBase64: false,
            compressImageQuality: 1,
            showCropGuidelines: true,
            cropperToolbarTitle:
              Platform.OS === "ios" ? "Move and Scale" : "Edit Photo",
          })
            .then((image) => {
              let imageData = {
                uri: image.path,
                name:
                  Platform.OS === "android" ? image.filename : image.path.split("/").pop(),
                type: image.mime,
              };
              this.setState({ image: image.path, imageObj: imageData, });
            })
            .catch((error) => { });
        }
        break;
      default:
        break;
    }
  }
  // Customizable Area End

  // Customizable Area Start
  // actionShowOne = () => { this.actionRef.current.show() }
  waterMarkText = (text: string) => { this.setState({ waterMarkText: text }) }
  isFocus = () => { this.setState({ isFocus: true }) }
  isBlur = () => { this.setState({ isFocus: false }) }
  // actionLogo = () => { this.actionLogoRef.current.show() }
  EditNavigationScreen = () =>
  this.props.navigation.navigate("Editwatermark", {
    image: this.state.image,
    text: this.state.waterMarkText,
    logoImage: this.state.logoImage,
  })
  // Customizable Area End

  // Customizable Area Start
  // Customizable Area End
}
