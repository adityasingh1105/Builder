import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface IDocumentTypes {
  [key: string]: Array<string>;
}
interface ResponseJson {
  data?: {
    data: {
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
        created_by: string | number;
        url: string;
      };
    };
  };
  errors?: Array<string>;
}

const DocumentTypes: IDocumentTypes = {
  doc: [
    DocumentPicker.types.plainText,
    DocumentPicker.types.csv,
    DocumentPicker.types.doc,
    DocumentPicker.types.docx,
    DocumentPicker.types.ppt,
    DocumentPicker.types.pptx,
    DocumentPicker.types.xls,
    DocumentPicker.types.xlsx,
  ],
  jpg: [DocumentPicker.types.images],
  pdf: [DocumentPicker.types.pdf],
  mp3: [DocumentPicker.types.audio],
  mp4: [DocumentPicker.types.video],
};

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  descInputValue: string;
  tagInputValue: string;
  selectedDocumentType: string;
  token: string;
  isUploading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FileAttachmentUploadController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  loginApiCallId: string = "";
  fileUploadCallId: string = "";
  fileUpdateCallId: string = "";
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
      descInputValue: this.props.navigation.state.params.description ?? "",
      tagInputValue: this.props.navigation.state.params.tag ?? "",
      selectedDocumentType: "doc",
      token: this.props?.navigation?.state?.params.token,
      isUploading: false,
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

      if (apiRequestCallId === this.fileUploadCallId) {
        if (responseJson && !responseJson.errors) {
          this.setState({ isUploading: false });
          this.showAlert("Success", "File uploaded");
          this.props.navigation.navigate("FileAttachment");
        } else {
          this.setState({ isUploading: false });
          this.showAlert("Error", `${responseJson.errors.toString() || ""}`);
        }
      } else if (apiRequestCallId === this.fileUpdateCallId) {
        this.handleUpdateResponse(responseJson);
      }
    }
    // Customizable Area End
  }

  btnExampleProps = {
    onPress: () => {
      this.doButtonPressed();
    },
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(message);
  }

  tagInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ tagInputValue: text });
    },
  };

  descInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ descInputValue: text });
    },
    secureTextEntry: false,
  };

  tagInputMobileProps = {
    ...this.tagInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  tagInputProps = this.isPlatformWeb()
    ? this.tagInputWebProps
    : this.tagInputMobileProps;

  fileAttachBtnExampleProps = {
    onPress: () =>
      this.state.descInputValue === "" || this.state.tagInputValue === ""
        ? this.showAlert("Error", "Add description and tag first")
        : this.fileUploadUpdate(
            DocumentTypes[this.state.selectedDocumentType],
            false,
          ),
  };
  fileUpdateBtnExampleProps = {
    onPress: () =>
      this.fileUploadUpdate(
        DocumentTypes[this.state.selectedDocumentType],
        true,
      ),
  };

  // Customizable Area Start

  handleUpdateResponse = (responseJson: ResponseJson) => {
    if (responseJson && !responseJson.errors) {
      this.setState({ isUploading: false });
      this.showAlert("Success", "File updated");
      this.props.navigation.replace("FileAttachment");
    } else {
      this.setState({ isUploading: false });
      this.showAlert("Error", `${responseJson.errors!.toString() || ""}`);
    }
  };

  pickerProps = {
    onValueChange: (itemValue: string) =>
      this.setState({ selectedDocumentType: itemValue }),
  };
  onConvertFormData(response: DocumentPickerResponse) {
    const formData = new FormData();

    let random: number = Date.now();
    const { descInputValue, tagInputValue, selectedDocumentType } = this.state;

    formData.append("name", response.name || "");
    formData.append("embedded_code", String(random));
    formData.append("url", {
      uri: String(response.uri),
      type: response.type,
      name: this.isPlatformiOS()
        ? response.uri.replace("file://", "")
        : response.name,
    } as unknown as Blob);
    formData.append("tag", tagInputValue);
    formData.append("content_type", selectedDocumentType);
    formData.append("description", descInputValue);
    formData.append("thumbnail", "current");
    formData.append("is_active", "done");
    formData.append("updated_by", "admin");

    return formData;
  }
  /*istanbul ignore next */
  async fileUploadUpdate(types: Array<string>, isUpdate: boolean) {
    const header = {
      Accept: "*/*",
      token: this.state.token,
    };
    const response: DocumentPickerResponse = await DocumentPicker.pickSingle({
      type: types,
      mode: "import",
      copyTo: "documentDirectory",
    });

    const formData = this.onConvertFormData(response);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    /*istanbul ignore next */
    if (isUpdate) {
      this.fileUpdateCallId = requestMessage.messageId;
    } else {
      this.fileUploadCallId = requestMessage.messageId;
    }

    isUpdate
      ? requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `${configJSON.postFileURL}/${this.props?.navigation?.state?.params.id}`,
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
  // Customizable Area End
}
