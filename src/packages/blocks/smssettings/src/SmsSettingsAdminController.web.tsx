// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine"; 


export interface Props {
  isAuthenticated: boolean;
  credentials: {
    token: string;
    user: string;
  };
}

export interface Setting {
  id: string;
  attributes: {
    id: number;
    title: string;
    togle: boolean;
    parent_id: null | number;
    subsetting: {
      id: number;
      title: string;
      parent_id: number;
      togle: boolean;
    }[];
  };
}

interface S {
  txtInputValue: string;
  txtSubInputValue: string[];
  settings: Setting[];
}

interface SS {
}

export default class SmsSettingsAdminController extends BlockComponent<
  Props,
  S,
  SS
> {
  settingsMessageId: string = "";
  settingTogleMessageId: string = "";
  subSettingTogleMessageId: string = "";
  settingAddMessageId: string = "";
  subSettingAddMessageId: string = "";
  settingsDeleteMessageId: string = "";

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
      txtSubInputValue: [],
      settings: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJsonSuccess = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (!responseJsonSuccess) {
      return;
    }

    const { data } = responseJsonSuccess;

    if (this.settingsMessageId === apiRequestCallId) {
      this.handleSettingsUpdate(data);
    }

    if (this.settingTogleMessageId === apiRequestCallId) {
      this.handleSettingTogleUpdate(data);
    }

    if (this.subSettingTogleMessageId === apiRequestCallId) {
      this.handleSubSettingTogleUpdate(data);
    }

    if (this.settingAddMessageId === apiRequestCallId && data) {
      this.handleSettingAdd(data);
    }

    if (this.subSettingAddMessageId === apiRequestCallId && data) {
      this.handleSubSettingAdd();
    }

    if (
      this.settingsDeleteMessageId === apiRequestCallId &&
      responseJsonSuccess
    ) {
      if (responseJsonSuccess.message) {
        this.handleSettingsDelete();
      }
    }
  }

  handleSettingsDelete() {
    this.fetchAdminData();
  }

  handleSettingsUpdate(data: Setting[]) {
    if (data) {
      const reversedData = this.reverseArray(data);
      this.setState({ settings: reversedData });
    }
  }

  reverseArray(array: Setting[]) {
    return [...array].reverse();
  }

  handleSettingTogleUpdate(data: Setting) {
    const { id } = data || {};
    if (id) {
      const settings = this.state.settings.map((setting) => {
        if (setting.id === id) {
          setting.attributes.togle = !setting.attributes.togle;
        }
        return setting;
      });
      this.setState({ settings });
    }
  }

  handleSubSettingTogleUpdate(data: Setting) {
    const subSettingId = Number(data?.id);
    if (subSettingId) {
      const settings = this.state.settings.map((setting) => {
        const subsettings = setting.attributes.subsetting.map((subSetting) => {
          if (subSetting.id === subSettingId) {
            subSetting.togle = !subSetting.togle;
          }
          return subSetting;
        });
        return {
          ...setting,
          attributes: { ...setting.attributes, subsetting: subsettings },
        };
      });
      this.setState({ settings });
    }
  }

  handleSettingAdd(data: Setting) {
    this.fetchAdminData();
  }

  handleSubSettingAdd() {
    this.fetchAdminData();
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setSubInputValue = (text: string, index: number) => {
    const values = this.state.txtSubInputValue;
    values[index] = text;
    this.setState({ txtSubInputValue: values });
  };

  UNSAFE_componentWillMount() {
    this.fetchAdminData();
  }

  deleteSetting(settingId: string) {
    const headers = {
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings/${settingId}`;
    const method = "DELETE";

    const apiFetchMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsDeleteMessageId = apiFetchMessage.messageId;

    apiFetchMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiFetchMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiFetchMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiFetchMessage.id, apiFetchMessage);
  }

  fetchAdminData() {
    const headers = {
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings`;
    const method = "GET";

    const apiFetchMessage2 = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsMessageId = apiFetchMessage2.messageId;

    apiFetchMessage2.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiFetchMessage2.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiFetchMessage2.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiFetchMessage2.id, apiFetchMessage2);
  }

  handleSettingChange(settingIndex: number, settingId: string) {
    const headers = {
      "Content-Type": "application/json",
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings/${settingId}`;
    const method = "PUT";
    const body = {
      data: {
        title: this.state.settings[settingIndex].attributes.title,
        togle: this.state.settings[settingIndex].attributes.togle
          ? "false"
          : "true",
      },
    };

    const apiSettingTogleMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingTogleMessageId = apiSettingTogleMessage.messageId;

    apiSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiSettingTogleMessage.id, apiSettingTogleMessage);
  }

  handleSubSettingChange(
    parentIndex: number,
    subIndex: number,
    settingId: number
  ) {
    const headers = {
      "Content-Type": "application/json",
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings/${settingId}`;
    const method = "PUT";
    const body = {
      data: {
        title:
          this.state.settings[parentIndex].attributes.subsetting[subIndex]
            .title,
        togle: this.state.settings[parentIndex].attributes.subsetting[subIndex]
          .togle
          ? "false"
          : "true",
      },
    };

    const apiSubSettingTogleMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.subSettingTogleMessageId = apiSubSettingTogleMessage.messageId;

    apiSubSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiSubSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiSubSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiSubSettingTogleMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(
      apiSubSettingTogleMessage.id,
      apiSubSettingTogleMessage
    );
  }

  submitSetting(label: string) {
    const headers = {
      "Content-Type": "application/json",
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings`;
    const method = "POST";
    const body = {
      data: {
        title: label,
      },
    };

    const apiSettingAddMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingAddMessageId = apiSettingAddMessage.messageId;

    apiSettingAddMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiSettingAddMessage.id, apiSettingAddMessage);
  }

  submitSubSetting(label: string, settingId: string) {
    const headers = {
      "Content-Type": "application/json",
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/subsetting`;
    const method = "POST";
    const body = {
      data: {
        title: label,
        setting_id: settingId,
      },
    };

    const apiSubSettingAddMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.subSettingAddMessageId = apiSubSettingAddMessage.messageId;

    apiSubSettingAddMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiSubSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiSubSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiSubSettingAddMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiSubSettingAddMessage.id, apiSubSettingAddMessage);
  }
}

// Customizable Area End
