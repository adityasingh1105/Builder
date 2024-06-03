// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SmsSettingsAdmin from "../../src/SmsSettingsAdmin.web";

const screenProps = {
  isAuthenticated: true,
  credentials: {
    token: "token",
    user: "test-user",
  },
};
const screenProps2 = {
  isAuthenticated: false,
  credentials: {
    token: "token",
    user: "test-user",
  },
};

const feature = loadFeature(
  "./__tests__/features/SmsSettingsAdmin-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SmsSettingsAdmin", ({ given, when, then }) => {
    let SmsSettingsAdminWrapper: ShallowWrapper;
    let SmsSettingsAdminWrapper2: ShallowWrapper;
    let instance: SmsSettingsAdmin;
    let instance2: SmsSettingsAdmin;

    given("I am a User loading SmsSettingsAdmin", () => {
      SmsSettingsAdminWrapper = shallow(<SmsSettingsAdmin {...screenProps} />);
      SmsSettingsAdminWrapper2 = shallow(
        <SmsSettingsAdmin {...screenProps2} />
      );
    });

    when("I navigate to the SmsSettingsAdmin", () => {
      instance = SmsSettingsAdminWrapper.instance() as SmsSettingsAdmin;
      instance2 = SmsSettingsAdminWrapper2.instance() as SmsSettingsAdmin;
    });

    then("Fetch Initial Data without error", () => {
      const apiFetchData2: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchData2.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        error: "error",
      });
      apiFetchData2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchData2.messageId
      );
      instance.settingsMessageId = apiFetchData2.messageId;
      runEngine.sendMessage("Unit Test", apiFetchData2);

      const dataFetched = {
        data: [
          {
            id: "1",
            type: "setting",
            attributes: {
              id: 1,
              title: "test-setting",
              togle: false,
              parent_id: null,
              subsetting: [
                {
                  id: 2,
                  title: "test-subsetting",
                  parent_id: 1,
                  togle: false,
                },
              ],
            },
          },
        ],
      };
      const apiFetchData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched
      );
      apiFetchData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchData.messageId
      );
      instance.settingsMessageId = apiFetchData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchData);

      expect(instance.state.settings.length).toBe(dataFetched.data.length);
    });

    then("Test Post after Setting Input", () => {
      const input = SmsSettingsAdminWrapper.find(
        `[data-test-id="add-setting-input-test"]`
      );
      const addSettingBtn = SmsSettingsAdminWrapper.find(
        `[data-test-id="add-setting-btn-test"]`
      );
      input.simulate("change", { target: { value: "Test Setting" } });
      addSettingBtn.simulate("click");

      const dataFetched = {
        data: {
          id: "3",
          type: "setting",
          attributes: {
            id: 3,
            title: "Test Setting",
            togle: false,
            parent_id: null,
            subsetting: [],
          },
        },
      };

      const apiFetchData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched
      );
      apiFetchData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchData.messageId
      );
      instance.settingAddMessageId = apiFetchData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchData);

      const dataFetched2 = {
        data: [
          {
            id: "1",
            type: "setting",
            attributes: {
              id: 1,
              title: "test-setting",
              togle: false,
              parent_id: null,
              subsetting: [
                {
                  id: 2,
                  title: "test-subsetting",
                  parent_id: 1,
                  togle: false,
                },
              ],
            },
          },
          {
            id: "3",
            type: "setting",
            attributes: {
              id: 3,
              title: "Test Setting",
              togle: false,
              parent_id: null,
              subsetting: [],
            },
          },
        ],
      };

      const apiFetchData2: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchData2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched2
      );
      apiFetchData2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchData2.messageId
      );
      instance.settingsMessageId = apiFetchData2.messageId;
      runEngine.sendMessage("Unit Test", apiFetchData2);

      expect(instance.state.settings.length).toBe(2);
    });

    then("Test Post after Switch Setting", () => {
      const switchSetting = SmsSettingsAdminWrapper.find(
        '[data-test-id="change-setting-btn-test"]'
      );
      switchSetting.at(0).simulate("change");

      const apiPostSettingMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiPostSettingMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "1",
          },
        }
      );
      apiPostSettingMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiPostSettingMessage.messageId
      );
      instance.settingTogleMessageId = apiPostSettingMessage.messageId;
      runEngine.sendMessage("Unit Test", apiPostSettingMessage);

      const switchSubSetting = SmsSettingsAdminWrapper.find(
        '[data-test-id="change-subsetting-btn-test"]'
      );
      switchSubSetting.at(0).simulate("change");

      const apiPostSubSettingMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiPostSubSettingMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "2",
          },
        }
      );
      apiPostSubSettingMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiPostSubSettingMessage.messageId
      );
      instance.subSettingTogleMessageId = apiPostSubSettingMessage.messageId;
      runEngine.sendMessage("Unit Test", apiPostSubSettingMessage);

      expect(instance.state.settings[1].attributes.subsetting[0].togle).toBe(
        true
      );
    });

    then("Test Post after Switch SubSetting", () => {
      const subSettingInput = SmsSettingsAdminWrapper.find(
        '[data-test-id="input-subsetting-test"]'
      );
      const subSettingBtn = SmsSettingsAdminWrapper.find(
        '[data-test-id="btn-subsetting-test"]'
      );
      subSettingInput.at(0).simulate("change", {
        target: { value: "Test Subsetting" },
      });
      subSettingBtn.at(0).simulate("click");

      const apiPostSubSettingAddMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiPostSubSettingAddMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "Success" }
      );
      apiPostSubSettingAddMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiPostSubSettingAddMessage.messageId
      );
      instance.subSettingAddMessageId = apiPostSubSettingAddMessage.messageId;
      runEngine.sendMessage("Unit Test", apiPostSubSettingAddMessage);

      const dataFetched = {
        data: [
          {
            id: "1",
            type: "setting",
            attributes: {
              id: 1,
              title: "test-setting",
              togle: false,
              parent_id: null,
              subsetting: [
                {
                  id: 2,
                  title: "test-subsetting",
                  parent_id: 1,
                  togle: false,
                },
                {
                  id: 4,
                  title: "Test Subsetting",
                  parent_id: 1,
                  togle: false,
                },
              ],
            },
          },
          {
            id: "3",
            type: "setting",
            attributes: {
              id: 3,
              title: "Test Setting",
              togle: false,
              parent_id: null,
              subsetting: [],
            },
          },
        ],
      };
      const apiFetchAfterData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchAfterData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched
      );
      apiFetchAfterData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchAfterData.messageId
      );
      instance.settingsMessageId = apiFetchAfterData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchAfterData);

      expect(instance.state.settings[1].attributes.subsetting.length).toBe(2);
    });

    then("Test Delete after Clicking", () => {
      const deleteSettingBtn = SmsSettingsAdminWrapper.find(
        '[data-test-id="setting-delete"]'
      );
      const deleteSubSettingBtn = SmsSettingsAdminWrapper.find(
        '[data-test-id="setting-delete"]'
      );

      deleteSettingBtn.at(0).simulate("click");
      deleteSubSettingBtn.at(0).simulate("click");

      const dataFetched = {
        message: "Deleted",
      };
      const apiDeleteData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiDeleteData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched
      );
      apiDeleteData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiDeleteData.messageId
      );
      instance.settingsDeleteMessageId = apiDeleteData.messageId;
      runEngine.sendMessage("Unit Test", apiDeleteData);

      const dataFetched2 = {
        error: "error",
      };
      const apiDeleteData2: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiDeleteData2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched2
      );
      apiDeleteData2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiDeleteData2.messageId
      );
      instance.settingsDeleteMessageId = apiDeleteData2.messageId;
      runEngine.sendMessage("Unit Test", apiDeleteData2);

      const dataFetched3 = {
        data: [
          {
            id: "1",
            type: "setting",
            attributes: {
              id: 1,
              title: "test-setting",
              togle: false,
              parent_id: null,
              subsetting: [
                {
                  id: 2,
                  title: "test-subsetting",
                  parent_id: 1,
                  togle: false,
                },
              ],
            },
          },
        ],
      };
      const apiFetchGlobaData3: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchGlobaData3.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched3
      );
      apiFetchGlobaData3.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchGlobaData3.messageId
      );
      instance.settingsMessageId = apiFetchGlobaData3.messageId;
      runEngine.sendMessage("Unit Test", apiFetchGlobaData3);

      expect(instance.state.settings[0].attributes.subsetting.length).toBe(1);
    });
  });
});

// Customizable Area End
