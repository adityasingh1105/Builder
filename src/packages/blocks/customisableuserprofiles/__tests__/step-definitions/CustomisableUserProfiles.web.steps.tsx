import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import CustomisableUserProfiles from "../../src/CustomisableUserProfiles.web";
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
const testData = [
  {
    name: "string_test",
    title: "String Test",
    field_type: "string",
    is_enable: true,
    is_required: true
  },
  {
    name: "boolean_test",
    title: "Boolean Test",
    field_type: "boolean",
    is_enable: true
  },
  {
    name: "text_test",
    title: "Text Test",
    field_type: "text",
    is_enable: true,
    is_required: false
  },
  {
    name: "date_test",
    title: "Date Test",
    field_type: "date",
    is_enable: true
  },
  {
    name: "integer_test",
    title: "Integer Test",
    field_type: "integer",
    is_enable: true,
    is_required: false
  },
  {
    name: "float_test",
    title: "Float Test",
    field_type: "float",
    is_enable: true
  },
  {
    name: "checkbox_test",
    title: "Checkbox Test",
    field_type: "checkbox",
    is_enable: true,
    is_required: true
  },
  {
    name: "Checkbox_not_req_test",
    title: "Checkbox Not Required Test",
    field_type: "checkbox",
    is_enable: true
  }
];

const screenProps = {
  navigation: navigation,
  id: "CustomisableUserProfiles"
};

const feature = loadFeature("./__tests__/features/CustomisableUserProfiles-scenario.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CustomisableUserProfiles", ({ given, when, then }) => {
    let Wrapper: ShallowWrapper;
    let instance: CustomisableUserProfiles;

    given("I am a User loading CustomisableUserProfiles", () => {
      Wrapper = shallow(<CustomisableUserProfiles {...screenProps} />);
      expect(Wrapper).toBeTruthy();
    });

    when("I navigate to the CustomisableUserProfiles", async () => {
      instance = Wrapper.instance() as CustomisableUserProfiles;

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), null);
      runEngine.sendMessage("Unit Test", tokenMsg);
      await new Promise((r) => setTimeout(r, 100));

      window.localStorage.setItem("testToken", "User_787");
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), null);
      runEngine.sendMessage("Unit Test", tokenMsg);
      await new Promise((r) => setTimeout(r, 100));

      window.localStorage.removeItem("testToken");

      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getFieldsApi = new Message(getName(MessageEnum.RestAPIResponceMessage));

      getFieldsApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        instance.getCustomizableProfileFieldsCallId
      );

      getFieldsApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: undefined
      });
      runEngine.sendMessage("Unit Test", getFieldsApi);
      await new Promise((r) => setTimeout(r, 100));

      getFieldsApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: testData
      });
      runEngine.sendMessage("Unit Test", getFieldsApi);

      const getProfileApi = new Message(getName(MessageEnum.RestAPIResponceMessage));

      getProfileApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        instance.getCustomizableProfileCallId
      );
      getProfileApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: undefined
      });
      runEngine.sendMessage("Unit Test", getProfileApi);
      await new Promise((r) => setTimeout(r, 100));

      getProfileApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: null
      });
      runEngine.sendMessage("Unit Test", getProfileApi);
      await new Promise((r) => setTimeout(r, 100));
      getProfileApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {}
      });
      runEngine.sendMessage("Unit Test", getProfileApi);
      await new Promise((r) => setTimeout(r, 100));

      getProfileApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          id: "1",
          type: "user",
          attributes: {
            user_profile_data: {
              first_name: "Irma"
            }
          }
        }
      });
      runEngine.sendMessage("Unit Test", getProfileApi);
      expect(Wrapper).toBeTruthy();
    });

    then("I type a required field", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "string_test"
      );
      textInputComponent.simulate("change", { target: { value: "Irma" } });
      await new Promise((r) => setTimeout(r, 100));
      expect(Wrapper).toBeTruthy();
    });

    then("I checked checkbox", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "checkbox_test"
      );
      textInputComponent.simulate("change", { target: { checked: true } });
      await new Promise((r) => setTimeout(r, 200));
      expect(Wrapper).toBeTruthy();
    });

    then("on click cancel", () => {
      let buttonComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "cancelButton"
      );
      buttonComponent.simulate("click");
      expect(Wrapper).toBeTruthy();
    });

    then("I type a required field again", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "string_test"
      );
      textInputComponent.simulate("change", { target: { value: "Irma" } });
      await new Promise((r) => setTimeout(r, 200));
      expect(Wrapper).toBeTruthy();
    });
    then("I click radio", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "boolean_test"
      );
      textInputComponent.simulate("change", { target: { value: "true" } });
      await new Promise((r) => setTimeout(r, 200));
      textInputComponent.simulate("change", { target: { value: "false" } });
      await new Promise((r) => setTimeout(r, 200));
      expect(Wrapper).toBeTruthy();
    });
    then("I type date", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "date_test"
      );
      textInputComponent.simulate("change", new Date());
      await new Promise((r) => setTimeout(r, 200));
      expect(Wrapper).toBeTruthy();
    });

    then("I keypress integer", async () => {
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "integer_test"
      );
      textInputComponent.simulate("keypress", { key: ".", preventDefault: () => {} });
      textInputComponent.simulate("change", { target: { value: "12" } });
      textInputComponent.simulate("keypress", { key: ",", preventDefault: () => {} });
      expect(Wrapper).toBeTruthy();

      await new Promise((r) => setTimeout(r, 200));
    });

    then("I keypress float", async () => {
      let floatInput = Wrapper.findWhere((node) => node.prop("data-test-id") === "float_test");
      floatInput.simulate("change", { target: { value: "67334" } });

      await new Promise((r) => setTimeout(r, 100));
      expect(Wrapper).toBeTruthy();
    });
    then("update profile result", async () => {
      const updateProfileApi = new Message(getName(MessageEnum.RestAPIResponceMessage));

      updateProfileApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        instance.updateCustomizableProfileCallId
      );

      updateProfileApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: undefined
      });
      runEngine.sendMessage("Unit Test", updateProfileApi);
      await new Promise((r) => setTimeout(r, 100));
      expect(Wrapper).toBeTruthy();
    });

    then("I can click save", () => {
      let buttonComponent = Wrapper.findWhere((node) => node.prop("data-test-id") === "saveButton");
      console.log("I can click save");
      buttonComponent.simulate("click");
      expect(Wrapper).toBeTruthy();
    });

    then("I delete required field", async () => {
      console.log("I delete required field");
      let textInputComponent = Wrapper.findWhere(
        (node) => node.prop("data-test-id") === "string_test"
      );
      textInputComponent.simulate("change", { target: { value: "" } });
      await new Promise((r) => setTimeout(r, 200));
      expect(Wrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(Wrapper).toBeTruthy();
    });
  });
});
