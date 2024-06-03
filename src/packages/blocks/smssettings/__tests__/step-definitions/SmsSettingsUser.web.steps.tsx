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
import SmsSettingsUser from "../../src/SmsSettingsUser.web";
const navigation = require("react-navigation");

const screenProps = {
  isAuthenticated: true,
  credentials: {
    token: "test-token",
    user: "test-user",
    id: 25,
  },
};

const screenProps2 = {
  isAuthenticated: false,
  credentials: {
    token: "test-token",
    user: "test-user",
    id: 25,
  },
};

const feature = loadFeature(
  "./__tests__/features/SmsSettingsUser-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SmsSettingsUser", ({ given, when, then }) => {
    let SmsSettingsUserWrapper: ShallowWrapper;
    let SmsSettingsUserWrapper2: ShallowWrapper;
    let instance: SmsSettingsUser;
    let instance2: SmsSettingsUser;

    given("I am a User loading SmsSettingsUser", () => {
      SmsSettingsUserWrapper = shallow(<SmsSettingsUser {...screenProps} />);
      SmsSettingsUserWrapper2 = shallow(<SmsSettingsUser {...screenProps2} />);
    });

    when("I navigate to the SmsSettingsUser", () => {
      instance = SmsSettingsUserWrapper.instance() as SmsSettingsUser;
      instance2 = SmsSettingsUserWrapper2.instance() as SmsSettingsUser;
    });

    then("Fetch initial data and add user to database", () => {
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
      const apiFetchGlobaData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchGlobaData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dataFetched
      );
      apiFetchGlobaData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchGlobaData.messageId
      );
      instance.settingsMessageId = apiFetchGlobaData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchGlobaData);

      const apiFetchUserData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchUserData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "100",
              type: "smssetting",
              attributes: {
                id: 100,
                togle: false,
                user_id: 25,
                setting_id: 1,
              },
            },
            {
              id: "101",
              type: "smssetting",
              attributes: {
                id: 101,
                togle: false,
                user_id: 25,
                setting_id: 2,
              },
            },
          ],
        }
      );
      apiFetchUserData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchUserData.messageId
      );
      instance.settingsNormalMessageId = apiFetchUserData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchUserData);

      expect(instance.state.normalUserSetting.length).toBe(2);
    });

    then("Update user data after adding to database", () => {
      const apiUpdateUserData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiUpdateUserData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Success",
        }
      );
      apiUpdateUserData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiUpdateUserData.messageId
      );
      instance.settingsUpdateAllMessageId = apiUpdateUserData.messageId;
      runEngine.sendMessage("Unit Test", apiUpdateUserData);

      const apiFetchUpdatedUserData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiFetchUpdatedUserData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "100",
              type: "smssetting",
              attributes: {
                id: 100,
                togle: false,
                user_id: 25,
                setting_id: 1,
              },
            },
            {
              id: "101",
              type: "smssetting",
              attributes: {
                id: 101,
                togle: false,
                user_id: 25,
                setting_id: 2,
              },
            },
          ],
        }
      );
      apiFetchUpdatedUserData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiFetchUpdatedUserData.messageId
      );
      instance.settingsNormalFetchAgainMessageId =
        apiFetchUpdatedUserData.messageId;
      runEngine.sendMessage("Unit Test", apiFetchUpdatedUserData);

      expect(instance.state.currentUserSetting.length).toBe(1);
    });

    then("Test POST after user setting switch", () => {
      const settingSwitch = SmsSettingsUserWrapper.find(
        '[data-test-id="setting-change-test"]'
      );
      settingSwitch.simulate("change");

      const apiSettingToggleData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiSettingToggleData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "100",
              type: "smssetting",
              attributes: {
                id: 100,
                togle: true,
                user_id: 25,
                setting_id: 1,
              },
            },
          ],
        }
      );
      apiSettingToggleData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSettingToggleData.messageId
      );
      instance.settingTogleMessageId = apiSettingToggleData.messageId;
      runEngine.sendMessage("Unit Test", apiSettingToggleData);

      expect(instance.state.currentUserSetting[0].attributes.togle).toBe(true);
    });

    then("Test POST after user subsetting switch", () => {
      const subsettingSwitch = SmsSettingsUserWrapper.find(
        '[data-test-id="subsetting-change-test"]'
      );
      subsettingSwitch.simulate("change");

      const apiSettingToggleData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiSettingToggleData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "101",
              type: "smssetting",
              attributes: {
                id: 101,
                togle: true,
                user_id: 25,
                setting_id: 2,
              },
            },
          ],
        }
      );
      apiSettingToggleData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSettingToggleData.messageId
      );
      instance.settingTogleMessageId = apiSettingToggleData.messageId;
      runEngine.sendMessage("Unit Test", apiSettingToggleData);

      expect(
        instance.state.currentUserSetting[0].attributes.subsettings[0].togle
      ).toBe(true);
    });
  });
});

// Customizable Area End
