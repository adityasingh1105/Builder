// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName, } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";



export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
}

interface SubSettingsTypes {
  id: number;
  title: string;
  parent_id: number;
  togle: boolean;
}


interface Attributes {

  id: number;
  title: string;
  togle: boolean;
  parent_id: null | number;
  subsetting: SubSettingsTypes[]
}



export interface Setting {
  id: string;
  attributes: Attributes
}



interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  UserMail: string;
  UserPass: string;
  Option: (string)[];
  SelectRole: string;
  RegistrationName: string;
  RegistrationMail: string;
  RegistrationPass: string;
  RegistrationConfirmPass: string;
  isEnabled: boolean;
  createPost: string;
  Data: Setting[];
  UserToken: string;
  SubSettings: string[];
  saveIndex: number

}

interface SS {
  id: any;
}

export default class SmsSettingsController extends BlockComponent<
  Props,
  S,
  SS
> {
  User_registrationCallID: string = '';
  LoginCall_ID: string = '';
  CreateSettingS_CallID: string = '';
  GetCreateSubSettingS_CallID: string = '';
  UpdateToggle_ID: string = '';
  SettingList_CallID: string = '';
  callIdDeleteSettings: string = '';

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);


    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      UserMail: '',
      UserPass: '',
      Option: ['super_user', 'user'],
      SelectRole: '',
      RegistrationName: '',
      RegistrationMail: '',
      RegistrationPass: '',
      RegistrationConfirmPass: '',
      isEnabled: false,
      createPost: '',
      Data: [],
      UserToken: this.props.navigation.state?.params?.Token,
      SubSettings: [],
      saveIndex: 0
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    if (this.User_registrationCallID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.data.attributes) {
        this.props.navigation.navigate('SmsSettings')
      }
    }
    if (this.LoginCall_ID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.meta) {
        if (apiResponse.meta.role == 'super_user') {
          const token = apiResponse?.meta?.token[0]
          this.props.navigation.navigate('SmsSettingAdminLayout', { Token: token })
        } else {
          const token = apiResponse?.meta?.token[0]
          this.props.navigation.navigate('SmsSettingUserLayout', { Token: token })
        }
      }
    }
    if (this.CreateSettingS_CallID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.data.attributes) {
        this.setState({ createPost: '' }, () => {
          this.SettingsList()
        })
      }
    }
    if (this.SettingList_CallID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.data) {
        this.setState({ Data: apiResponse.data, SubSettings: [] })
      }
    }
    if (this.GetCreateSubSettingS_CallID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.data) {
        this.SettingsList()
      }
    }
    if (this.UpdateToggle_ID === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.data.attributes) {
        this.SettingsList()
      }
    }
    if (this.callIdDeleteSettings === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      if (apiResponse.message) {
        this.SettingsList()
      }
    }
  }



  handlePost = {
    onChangeText: (text: string) => {
      this.setState({ createPost: text })
    }
  }


  handleUsername = {
    onChangeText: (text: string) => {
      this.setState({ UserMail: text })
    }
  }


  handlePassword = {
    onChangeText: (text: string) => {
      this.setState({ UserPass: text })
    }
  }

  handleSubSetingTexts(index: number, text: string) {
    let { SubSettings } = this.state;
    SubSettings[index] = text;
    this.setState({ SubSettings, saveIndex: index })
  }




  handleSubmit = {
    onPress: () => {
      this.LoginUser()
    }
  }

  handleUserlogin = {
    onPress: () => {
      this.props.navigation.navigate('SmsSettingLogin')
    }
  }

  handleAdminLogin = {
    onPress: () => {
      this.props.navigation.navigate('SmsSettingAdminLogin')
    }
  }
  handleRegistertionUser = {
    onPress: () => {
      this.props.navigation.navigate('SmsSettingRegistration')
    }
  }

  handleRegistration = {
    onPress: () => {
      this.RegistertionUser()
    }
  }



  handleUserSwitch(Item_DATA: Attributes | SubSettingsTypes) {
    this.UpdateToggles(Item_DATA)
  }


  handleRegistrationName = {
    onChangeText: (text: string) => {
      this.setState({ RegistrationName: text })
    }
  }


  handleRegistrationMail = {
    onChangeText: (text: string) => {
      this.setState({ RegistrationMail: text })
    }
  }

  handleRegistrationPass = {
    onChangeText: (text: string) => {
      this.setState({ RegistrationPass: text })
    }
  }


  handleRegistrationConfirmPass = {
    onChangeText: (text: string) => {
      this.setState({ RegistrationConfirmPass: text })
    }
  }


  handleOnSelect(index: string, value: string) {
    this.setState({ SelectRole: value })
  }

  handleCreateSetting = {
    onPress: () => {
      this.CreateSettings()
    }
  }




  DeleteSettings(Delete_ID:number) {
    const headers = {
      'token': this.state.UserToken
    }
    const DeleteSettins_ID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.callIdDeleteSettings = DeleteSettins_ID.messageId;
    DeleteSettins_ID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_smssettings/settings/${Delete_ID}`
    );
    DeleteSettins_ID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    DeleteSettins_ID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );
    runEngine.sendMessage(DeleteSettins_ID.id, DeleteSettins_ID);

  }




  SettingsList() {
    const headers = {
      'token': this.state.UserToken,
      'Content-Type': 'application/json'
    }
    const SettingList_ID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.SettingList_CallID = SettingList_ID.messageId;
    SettingList_ID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_smssettings/settings`
    );
    SettingList_ID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    SettingList_ID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(SettingList_ID.id, SettingList_ID);
  }





  UpdateToggles(Item_Data: Attributes | SubSettingsTypes) {
    const ITEM_ID = Item_Data?.id
    const TOGGLESWitch = Item_Data?.togle
    const Title = Item_Data?.title
    const headers = {
      'token': this.state.UserToken,
      'Content-Type': 'application/json',
    }
    const UpdateToggle_CallID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.UpdateToggle_ID = UpdateToggle_CallID.messageId;
    UpdateToggle_CallID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_smssettings/settings/${ITEM_ID}`
    );
    UpdateToggle_CallID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    UpdateToggle_CallID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );
    const Data = {
      "data": {
        "title": Title,
        "togle": TOGGLESWitch == false ? 'true' : 'false'
      }
    }
    UpdateToggle_CallID.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Data)
    );
    runEngine.sendMessage(UpdateToggle_CallID.id, UpdateToggle_CallID);
  }




  SubSettingsFun(Setting_ID: string | number) {
    const headers = {
      'token': this.state.UserToken,
      'Content-Type': 'application/json',
    }
    const CreateSubSettingsID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.GetCreateSubSettingS_CallID = CreateSubSettingsID.messageId;
    CreateSubSettingsID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_smssettings/subsetting'
    );
    CreateSubSettingsID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    CreateSubSettingsID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    const Data = {
      "data": {
        "title": this.state.SubSettings[this.state.saveIndex],
        "setting_id": Setting_ID
      }
    }
    CreateSubSettingsID.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Data)
    );
    runEngine.sendMessage(CreateSubSettingsID.id, CreateSubSettingsID);
  }






  CreateSettings() {
    const headers = {
      'token': this.state.UserToken,
      'Content-Type': 'application/json',
    }
    const CreateSettingsID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.CreateSettingS_CallID = CreateSettingsID.messageId;
    CreateSettingsID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_smssettings/settings'
    );
    CreateSettingsID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    CreateSettingsID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    const Data = {
      "data": {
        "title": this.state.createPost
      }
    }
    CreateSettingsID.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Data)
    );
    runEngine.sendMessage(CreateSettingsID.id, CreateSettingsID);
  }




  LoginUser() {
    const headers = {
      "Content-Type": "application/json"
    };
    const LogInID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.LoginCall_ID = LogInID.messageId;
    LogInID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_smssettings/logins'
    );
    LogInID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    LogInID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    const Data = {
      "data": {
        "type": "email_user",
        "attributes": {
          "email": this.state.UserMail,
          "password": this.state.UserPass
        }
      }
    }
    LogInID.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Data)
    );
    runEngine.sendMessage(LogInID.id, LogInID);
  }



  RegistertionUser() {
    const headers = {
      "Content-Type": "application/json"
    };
    const RegistrationID = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.User_registrationCallID = RegistrationID.messageId;
    RegistrationID.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_smssettings/users'
    );
    RegistrationID.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    RegistrationID.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    const Data = {
      "data": {
        "type": "email_user",
        "attributes": {
          "user_name": this.state.RegistrationName,
          "email": this.state.RegistrationMail,
          "password": this.state.RegistrationPass,
          "password_confirmation": this.state.RegistrationConfirmPass,
          "role": this.state.SelectRole
        }
      }
    }
    RegistrationID.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(Data));
    runEngine.sendMessage(RegistrationID.id, RegistrationID);
  }



  // web events


}

// Customizable Area End
