import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface IAttribute {
  name: string;
  title: string;
  field_type: string;
  is_enable: boolean;
  is_required: boolean;
  value: string | number;
}

export interface IAttributeValues {
  name: string;
  value: string;
}

type FieldType =
  | "string"
  | "file"
  | "textarea"
  | "text"
  | "date"
  | "datetime"
  | "integer"
  | "number"
  | "boolean"
  | "float"
  | "checkbox";
type FieldValue = string | number | boolean | Date | null;
export interface IField {
  name: string;
  title: string;
  field_type: FieldType;
  is_enable: boolean;
  is_required: boolean;
}

interface IProfileDataWeb {
  attributes?: { user_profile_data: { [key: string]: FieldValue } };
}

export interface IProfileData {
  [key: string]: FieldValue;
}

export interface IProfileValues {
  value: string;
}

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  profile: { [key: string]: FieldValue };
  fields: IField[];
  currentProfile?: { [key: string]: FieldValue };
  profileImageUrl: string;
  saveEnabled?: boolean;
  cancelEnabled?: boolean;

  txtInputValue: string;
  txtSavedValue: string;

  first_name: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  attributesValues: IProfileValues[];
  countryOpen: boolean;
  postalCode: string;
  profilePicture: string;
  profileRole: string;
  aboutMe: string;
  gender: string;
  user_name: string;
  dateOfBirth: string;
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
  instagram: string;
  facebook: string;
  youtube: string;
  qrCode: string;
  profileId: string;
  user_type: string;
  imageModalVisible: boolean;
  userAge: number;
  biography: string;
  video: string;
  attributes: IAttribute[];

  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;
  isDatePickerVisible: boolean;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;

  saveButtonDisable: boolean;
  enableField: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomisableUserProfilesController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getCustomizableProfileCallId: string = "";
  getCustomizableProfileFieldsCallId: string = "";
  updateCustomizableProfileCallId: string = "";
  getProfileAccountID: string = "";
  updateProfileID: string = "";
  getAttributesID: string = "";
  token: string = "";
  intervalId: number = 0;

  labelEmail: string = "";

  btnTextCancelPasswordChange: string = "";
  btnTextSaveChanges: string = "";
  labelHeader: string = "";
  btnTextChangePassword: string = "";

  apiCallMessageUpdateProfileRequestId: string = "";
  validationApiCallId: string = "";
  apiChangePhoneValidation: string = "";
  registrationAndLoginType: string = "";
  authToken: string = "";
  uniqueSessionRequesterId: string = "";
  userProfileGetApiCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      profile: {},
      profileImageUrl: "",
      fields: [],

      attributes: [],
      attributesValues: [],
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      first_name: "",
      lastName: "",
      fullName: "",
      email: "",
      city: "",
      address: "",
      postalCode: "",
      profilePicture: "",
      profileRole: "jobseeker",
      aboutMe: "",
      gender: "",
      user_name: "",
      dateOfBirth: "",
      biography: "",
      currentPassword: "",
      newPassword: "",
      reNewPassword: "",
      youtube: "",
      instagram: "",
      facebook: "",
      qrCode: "",
      profileId: "",
      countryOpen: false,
      user_type: "",
      imageModalVisible: false,
      userAge: 0,
      phoneNumber: "",
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,
      video: "",

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,
      isDatePickerVisible: false,

      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false

      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    // Customizable Area Start

    // Customizable Area End
  }

  getToken = () => {
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  onCustomizableProfileData = (data: IProfileDataWeb | null) => {
    if (data === null) return this.setState({ currentProfile: { ...this.state.profile } });
    if (!data) return;
    if (!data.attributes || !data.attributes.user_profile_data)
      return this.setState({ currentProfile: { ...this.state.profile } });

    const newProfile = data.attributes.user_profile_data;
    this.setState({ profile: newProfile, currentProfile: { ...newProfile } });
  };

  checkSession = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      if (
        !message.getData(getName(MessageEnum.SessionResponseToken)) ||
        message.getData(getName(MessageEnum.SessionResponseToken)) === "null"
      )
        this.token =
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDY3LCJleHAiOjE2NzkwNDI3NTAsInRva2VuX3R5cGUiOiJsb2dpbiJ9.zi-zzVPBT-4TQm8cQK8uK6qsoDqTIL_rT-LZX1sptxseOUYhWeHtibNbbmdRUJTSz2THXUUuNlBfkIH6QCFGgg";
      else this.token = message.getData(getName(MessageEnum.SessionResponseToken));

      const testToken = window.localStorage.getItem("testToken");
      if (testToken) this.token = testToken;
      runEngine.debugLog("TOKEN1", this.token);
      this.getCustomizableProfile();
      this.getCustomizableProfileFields();
      return true;
    }
  };

  checkProfileAccount = (message: Message) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (apiRequestCallId === this.getProfileAccountID) {
      if (!responseJson.data || !responseJson.data.attributes) return;
      const dataResponse = responseJson;
      const userProfile = dataResponse.data.attributes.user_profile_data || {};
      const about_me =
        dataResponse.data.attributes.profile_bio &&
        dataResponse.data.attributes.profile_bio.about_me;
      const qr_code =
        dataResponse.data.attributes.qr_code && dataResponse.data.attributes.qr_code.qr_code;
      this.setState({
        address: dataResponse.data.attributes.address,
        user_name: userProfile.user_name,
        aboutMe: about_me,
        qrCode: qr_code,
        instagram: dataResponse.data.attributes.instagram,
        city: dataResponse.data.attributes.city,
        postalCode: dataResponse.data.attributes.postal_code,
        fullName: dataResponse.data.attributes.name,
        first_name: dataResponse.data.attributes.first_name,
        lastName: dataResponse.data.attributes.last_name,
        profilePicture: userProfile.profile_pic,
        user_type: userProfile.user_type,
        dateOfBirth: dataResponse.data.attributes.dob,
        video: dataResponse.data.attributes.video,
        youtube: dataResponse.data.attributes.youtube,
        facebook: dataResponse.data.attributes.facebook,
        biography: dataResponse.data.attributes.bio,
        attributesValues: Object.keys(dataResponse.data.attributes.user_profile_data).map(
          (item) => {
            return {
              ...this.state.attributes[(item as unknown) as number],
              value: dataResponse.data.attributes.user_profile_data[item]
            };
          }
        )
      });
      this.setState({
        attributes: this.state.attributesValues.map((item, index) => {
          return {
            ...this.state.attributes[index],
            value: item.value
          };
        })
      });
      return true;
    }
  };

  checkOtherResponses = (message: Message) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

    if (apiRequestCallId === this.getCustomizableProfileCallId) {
      this.onCustomizableProfileData(responseJson.data);
    } else if (apiRequestCallId === this.getCustomizableProfileFieldsCallId) {
      if (!responseJson.data) return;
      const fields = responseJson.data;
      this.setState({ fields });
    } else if (apiRequestCallId === this.updateCustomizableProfileCallId) {
      this.setState({
        currentProfile: { ...this.state.profile },
        saveEnabled: false,
        cancelEnabled: false
      });
    } else if (apiRequestCallId === this.updateProfileID) {
      this.fetchProfileData();
      alert("Profile Updated Successfully");
    } else if (apiRequestCallId === this.getAttributesID) {
      this.fetchProfileData();
      this.setState({
        attributes: responseJson.data.map((item: object) => {
          return {
            ...item,
            value: ""
          };
        })
      });
    }
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (this.checkSession(message)) return;
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (responseJson) {
        if (responseJson.errors) return;
        this.checkOtherResponses(message);
        this.checkProfileAccount(message);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleChangeAttributeValue = (value: string, index: number) => {
    const temporaryValue = this.state.attributes;
    temporaryValue[index].value = value;
    this.setState({ attributes: temporaryValue });
  };

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  checkRequiredFields = () => {
    if (!this.state.saveEnabled) {
      for (const field of this.state.fields) {
        if (field.is_required && !this.state.profile[field.name]) return;
      }
      this.setState({ saveEnabled: true });
    } else {
      for (const field of this.state.fields) {
        if (field.is_required && this.state.profile[field.name] === undefined)
          return this.setState({ saveEnabled: false });
      }
    }
  };

  async componentDidUpdate() {
    if (this.state.currentProfile) {
      if (JSON.stringify(this.state.currentProfile) !== JSON.stringify(this.state.profile)) {
        if (!this.state.cancelEnabled) this.setState({ cancelEnabled: true });
        this.checkRequiredFields();
      }
    }
    this.fetchAttributes();
  }

  changeFormValue = (
    valueKey: string,
    value: string | Date | number | boolean | null,
    fieldType: FieldType
  ) => {
    if (value !== undefined) {
      if (fieldType === "float") value = parseFloat(value as string);
      else if (fieldType === "integer") value = parseInt(value as string);
      else if (fieldType === "date") value = (value as Date).toDateString();
      else if (fieldType === "boolean") value = value === "true";
      else if (fieldType === "checkbox") value = !!value;
    }
    this.setState({ profile: { ...this.state.profile, [valueKey]: value } });
  };

  onKeyPress = (event: React.KeyboardEvent, field: IField) => {
    if (field.field_type === "integer" && (event.key === "." || event.key === ",")) {
      event.preventDefault();
    }
  };

  getCustomizableProfileFields = () => {
    const header = {
      "Content-Type": configJSON.searchApiContentType,
      token: this.token
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCustomizableProfileFieldsCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getCustomizableProfileFieldsEndPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getCustomizableProfile = () => {
    const header = {
      "Content-Type": configJSON.searchApiContentType,
      token: this.token
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCustomizableProfileCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getCustomizableProfileEndPoint}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  checkForRequiredFields = () => {
    const RequiredField = this.state.attributes.map((item: IAttribute) => {
      if (item.is_required && !(item.value as string).trim() && item.is_enable) {
        alert(`Please Enter ${item.name}`);
        return false;
      }
      return true;
    });
    if (RequiredField?.includes(false)) {
      return false;
    } else {
      this.updateProfile();
    }
  };

  cancelChanges = () => {
    if (this.state.currentProfile)
      this.setState({
        profile: { ...this.state.currentProfile },
        saveEnabled: false,
        cancelEnabled: false
      });
  };

  updateCustomizableProfile = () => {
    const header = {
      "Content-Type": configJSON.searchApiContentType,
      token: this.token
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.updateCustomizableProfileCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.updateCustomizableProfileEndPoint}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(this.state.profile)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchProfileData = async () => {
    const header = {
      "Content-Type": "application/json",
      token: configJSON.temporaryToken
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getProfileAccountID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.baseURLGetProfileAccount
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchAttributes = async () => {
    const header = {
      "Content-Type": "application/json",
      token: configJSON.temporaryToken
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getAttributesID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getFields
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updateProfile = async () => {
    const header = {
      "Content-Type": "application/json",
      token: configJSON.temporaryToken
    };

    const deliveredData = this.state.attributes
      .map((item) => {
        if (item && item.is_enable) {
          return {
            [item.name]: item.value
          };
        }
      })
      .filter((item) => item != undefined);

    const filteredPosts: IProfileData = {};

    deliveredData.map((item) => {
      filteredPosts[Object.keys(item as object)[0]] = Object.values(item as object)[0];
    });

    const dataToBeUsed = {
      profile: filteredPosts
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.updateProfileID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateProfileURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.putMethod);
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(dataToBeUsed)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
