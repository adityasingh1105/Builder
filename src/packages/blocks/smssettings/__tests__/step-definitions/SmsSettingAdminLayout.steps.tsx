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
import SmsSettingAdminLayout from "../../src/SmsSettingAdminLayout";

const ScreenProp = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "SmsSettingAdminLayout",
};
const Data = [
  {
    id: "66",
    type: "setting",
    attributes: {
      id: 66,
      title: "multimedia settings",
      togle: false,
      parent_id: null,
      subsetting: [
        {
          id: 67,
          title: "vibration",
          parent_id: 66,
          togle: false,
          created_at: "2023-04-28T05:21:50.994Z",
          updated_at: "2023-04-28T05:21:50.994Z",
        },
      ],
    },
  },
  {
    id: "59",
    type: "setting",
    attributes: {
      id: 59,
      title: "notification setting",
      togle: true,
      parent_id: null,
      subsetting: [
        {
          id: 61,
          title: "subssettings2 for 59",
          parent_id: 59,
          togle: false,
          created_at: "2023-04-27T12:25:52.259Z",
          updated_at: "2023-04-27T12:25:52.259Z",
        },
      ],
    },
  },
];

const feat = loadFeature(
  "./__tests__/features/SmsSettingAdminLayout-scenario.feature"
);

defineFeature(feat, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SmsSettingAdminLayout", ({ given, when, then }) => {
    let childWapper: ShallowWrapper;
    let instance: SmsSettingAdminLayout;

    given("I am a User loading SmsSettingAdminLayout", () => {
      childWapper = shallow(<SmsSettingAdminLayout {...ScreenProp} />);
    });

    when(
      "I navigate to the SmsSettingAdminLayout I have a input field to create a settings",
      () => {
        instance = childWapper.instance() as SmsSettingAdminLayout;

        const CreateMainSetting = childWapper.findWhere(
          (node) => node.prop("testID") === "createSettingID"
        );
        CreateMainSetting.simulate("changeText", "mainSetting");
      }
    );

    then(
      "As I enter value in textinput field I can check weather that is correct or wrong",
      () => {
        expect(instance.state.createPost).toBe("mainSetting");
      }
    );

    when("I can create a setting by click on submit button", () => {
      const create_Setting_BTN = childWapper.findWhere(
        (node) => node.prop("testID") === "BTNID"
      );
      create_Setting_BTN.simulate("press");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            attributes: {},
          },
        }
      );
      instance.CreateSettingS_CallID = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);

      const SettingList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      SettingList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      SettingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: Data,
      });
      instance.SettingList_CallID = SettingList.messageId;
      runEngine.sendMessage("Unit Test", SettingList);
    });

    then("Setting List Data should get update in list", () => {
      expect(instance.state.createPost).toBe("");
    });

    when("SmsSettingAdminLayout will load with setting list", () => {
      const ListItem = childWapper.findWhere(
        (node) => node.prop("testID") === "Setting_List"
      );
      childWapper = shallow(
        ListItem.props().renderItem({ item: Data[1], index: 1 })
      );
      childWapper = shallow(
        ListItem.props().renderItem({ item: Data[0], index: 1 })
      );
    });

    then("SmssettingAdminlayout screen will load the data", () => {
      expect(instance.state.Data).toStrictEqual([]);
    });

    when("I can delete parent settings from the Setting list", () => {
      const DeleteparentBTN = childWapper.findWhere(
        (node) => node.prop("testID") === "Delete_BTN"
      );
      DeleteparentBTN.simulate("press");

      const DeleteRequestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      DeleteRequestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        DeleteRequestMessage.messageId
      );
      DeleteRequestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            message: "",
          },
        }
      );
      instance.callIdDeleteSettings = DeleteRequestMessage.messageId;
      runEngine.sendMessage("Unit Test", DeleteRequestMessage);
    });

    then("I can check the setting is deleted or not", () => {
      expect(instance.state.Data.length).toBe(0);
    });

    when("I can turn the toggle to be on or off", () => {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            attributes: {},
          },
        }
      );
      instance.UpdateToggle_ID = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);
    });

    then("I can check weather the value is on or off", () => {
      expect(instance.state.Data.length).toBe(0);
    });

    when("I can create a sub settings from the main setting", () => {
      const SubsettingInput = childWapper.findWhere(
        (node) => node.prop("testID") === "Subsetting_ID"
      );
      SubsettingInput.simulate("changeText", undefined);
    });

    then("I can check sub settings weather is settings", () => {
      expect(instance.state.SubSettings[1]).toBe(undefined);
    });

    when("I can create a SubSettings by click on the submit button", () => {
      const CreateSubSettings = childWapper.findWhere(
        (node) => node.prop("testID") === "BTNID2"
      );
      CreateSubSettings.simulate("press");

      const RequestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      RequestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        RequestMessage.messageId
      );
      RequestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.GetCreateSubSettingS_CallID = RequestMessage.messageId;
      runEngine.sendMessage("Unit Test", RequestMessage);
    });

    then("I can check the subSettings responces is appear or not", () => {
      expect(instance.state.Data.length).toBe(0);
    });

    when("user can turn on or off subsettings toggles", () => {
      const subSetttingToggle = childWapper.findWhere(
        (node) => node.prop("testID") === "SubSetting_toggle-67"
      );
      subSetttingToggle.simulate("valueChange");
    });

    then("toggle get update on clicking the switch", () => {
      expect(instance.state.Data).toStrictEqual([]);
    });

    when("I can delete child settings from the settings list", () => {
      const childDeleteBTN = childWapper.findWhere(
        (node) => node.prop("testID") === "childDeleteBTN-67"
      );
      childDeleteBTN.simulate("press");
    });
    then("I can check weather is delete or not from the list", () => {
      expect(instance.state.Data.length).toBe(0);
    });
  });
});

// Customizable Area End
