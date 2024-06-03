// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import { Setting } from "./SmsSettingsAdminController.web";

interface NormalSetting {
  id: string;
  attributes: {
    id: number;
    togle: boolean;
    user_id: number;
    setting_id: number;
  };
}

interface CurrentSetting {
  id: string;
  attributes: {
    title: string;
    togle: boolean;
    subsettings: { id: string; title: string; togle: boolean }[];
  };
}

export interface Props {
  isAuthenticated: boolean;
  credentials: {
    token: string;
    user: string;
    id: number | undefined;
  };
}

interface S {
  txtInputValue: string;
  settings: Setting[];
  normalUserSetting: NormalSetting[];
  currentUserSetting: CurrentSetting[];
}

interface SS {
}

export default class SmsSettingsUserController extends BlockComponent<
  Props,
  S,
  SS
> {
  settingsMessageId: string = "";
  settingsNormalMessageId: string = "";
  settingsUpdateAllMessageId: string = "";
  settingsNormalFetchAgainMessageId: string = "";
  settingTogleMessageId: string = "";

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
      settings: [],
      normalUserSetting: [],
      currentUserSetting: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJsonSuccess = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (this.settingsMessageId === apiRequestCallId && responseJsonSuccess) {
      this.updateNormalUserData(responseJsonSuccess.data);
    }

    if (
      this.settingsNormalMessageId === apiRequestCallId &&
      responseJsonSuccess
    ) {
      this.setState(
        {
          normalUserSetting: responseJsonSuccess.data,
        },
        () => {
          this.updateEverythingSettings();
        }
      );
    }

    if (
      this.settingsUpdateAllMessageId === apiRequestCallId &&
      responseJsonSuccess
    ) {
      this.fetchUpdatedNormalSettings();
    }

    if (
      this.settingsNormalFetchAgainMessageId === apiRequestCallId &&
      responseJsonSuccess
    ) {
      if (responseJsonSuccess.data) {
        this.setState(
          {
            normalUserSetting: responseJsonSuccess.data.filter(
              (setting: NormalSetting) =>
                setting.attributes.user_id === this.props.credentials.id
            ),
          },
          () => {
            this.comparisonAndUpdateSettings();
          }
        );
      }
    }

    if (
      this.settingTogleMessageId === apiRequestCallId &&
      responseJsonSuccess
    ) {
      if (responseJsonSuccess.data) {
        this.changeSettingState(responseJsonSuccess.data[0]);
      }
    }
  }

  // web events

  UNSAFE_componentWillMount() {
    this.fetchUserData();
  }

  changeSettingState(response: NormalSetting) {
    const setting = this.state.currentUserSetting.map((sett) => {
      if (Number(sett.id) === response.attributes.setting_id) {
        sett.attributes.togle = response.attributes.togle;
      }

      const subSetting = sett.attributes.subsettings.map((subSet) => {
        if (Number(subSet.id) === response.attributes.setting_id) {
          subSet.togle = response.attributes.togle;
        }

        return subSet;
      });

      sett.attributes.subsettings = subSetting;

      return sett;
    });

    this.setState({
      currentUserSetting: setting,
    });
  }

  comparisonAndUpdateSettings() {
    const changeStateForCurrentSetting: CurrentSetting[] = [];
    this.state.settings.forEach((setting) => {
      const subSettings: { id: string; togle: boolean; title: string }[] = [];

      setting.attributes.subsetting.forEach((subSetting) => {
        subSettings.push({
          id: String(subSetting.id),
          togle: subSetting.togle,
          title: subSetting.title,
        });
      });

      changeStateForCurrentSetting.push({
        id: setting.id,
        attributes: {
          togle: setting.attributes.togle,
          subsettings: subSettings,
          title: setting.attributes.title,
        },
      });
    });

    const newCurrentSetting = changeStateForCurrentSetting.map((setting) => {
      this.state.normalUserSetting.forEach((normalSetting) => {
        if (normalSetting.attributes.setting_id === Number(setting.id)) {
          setting.attributes.togle = normalSetting.attributes.togle;
        }
      });

      const newSubSetting = setting.attributes.subsettings.map((subSetting) => {
        this.state.normalUserSetting.forEach((normalSetting) => {
          if (normalSetting.attributes.setting_id === Number(subSetting.id)) {
            subSetting.togle = normalSetting.attributes.togle;
          }
        });

        return subSetting;
      });

      setting.attributes.subsettings = newSubSetting;
      return setting;
    });

    this.setState({
      currentUserSetting: newCurrentSetting,
    });
  }

  fetchUpdatedNormalSettings() {
    const headers = {
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/smssettings`;
    const method = "GET";

    const apiFetchNormalAgainMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsNormalFetchAgainMessageId =
      apiFetchNormalAgainMessage.messageId;

    apiFetchNormalAgainMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiFetchNormalAgainMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiFetchNormalAgainMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(
      apiFetchNormalAgainMessage.id,
      apiFetchNormalAgainMessage
    );
  }

  updateEverythingSettings() {
    const headers = {
      token: this.props.credentials.token,
      "Content-Type": "application/json",
    };
    const endpoint = `/bx_block_smssettings/smssetting`;
    const method = "POST";

    const forBody: { setting_id: string; togle: string }[] = [];

    this.state.settings.forEach((setting) => {
      const isExisting = this.state.normalUserSetting.some(
        (normalSetting) =>
          normalSetting.attributes.setting_id === Number(setting.id) &&
          normalSetting.attributes.user_id === this.props.credentials.id
      );
      if (!isExisting) {
        forBody.push({ setting_id: setting.id, togle: String(setting.attributes.togle) });
      }
      setting.attributes.subsetting.forEach((subsetting) => {
        const isExistingInSub = this.state.normalUserSetting.some(
          (normalSetting) => {
            return (
              normalSetting.attributes.setting_id === subsetting.id &&
              normalSetting.attributes.user_id === this.props.credentials.id
            );
          }
        );
        if (!isExistingInSub) {
          forBody.push({ setting_id: String(subsetting.id), togle: String(subsetting.togle) });
        }
      });
    });

    const body = {
      data: forBody,
    };

    const apiSyncDataMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsUpdateAllMessageId = apiSyncDataMessage.messageId;

    apiSyncDataMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    apiSyncDataMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiSyncDataMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiSyncDataMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    runEngine.sendMessage(apiSyncDataMessage.id, apiSyncDataMessage);
  }

  updateNormalUserData(data: Setting[]) {
    this.setState({
      settings: data,
    });

    const headers = {
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/smssettings`;
    const method = "GET";

    const apiFetchNormalMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsNormalMessageId = apiFetchNormalMessage.messageId;

    apiFetchNormalMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiFetchNormalMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiFetchNormalMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiFetchNormalMessage.id, apiFetchNormalMessage);
  }

  fetchUserData() {
    const headers = {
      token: this.props.credentials.token,
    };
    const endpoint = `/bx_block_smssettings/settings`;
    const method = "GET";

    const apiFetchMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.settingsMessageId = apiFetchMessage.messageId;

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

  handleSettingChange(setting: { settingId: string; togle: boolean }) {
    const headers = {
      "Content-Type": "application/json",
      token: this.props.credentials.token,
    };
    const endpoint = `bx_block_smssettings/smssetting`;
    const method = "POST";
    const body = {
      data: [
        {
          setting_id: setting.settingId,
          togle: setting.togle ? "false" : "true",
        },
      ],
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
}

// Customizable Area End
