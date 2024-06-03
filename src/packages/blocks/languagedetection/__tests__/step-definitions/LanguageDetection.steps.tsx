// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LanguageDetection from "../../src/LanguageDetection";
// import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { laguagesAPIRes, mockResponseUpdate } from "./mockData";
import { runEngine } from "../../../../framework/src/RunEngine";
import { NativeModules, Platform } from "react-native";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "LanguageDetection",
};

const feature = loadFeature(
  "./__tests__/features/LanguageDetection-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      NativeModules: { I18nManager: { localeIdentifier: "en" } },
    }));
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
  });

  test("User navigates to LanguageDetection", ({ given, when, then }) => {
    let languageDetectionShallow: ShallowWrapper;
    let instance: LanguageDetection;

    given("I am a User loading LanguageDetection", () => {
      languageDetectionShallow = shallow(
        <LanguageDetection {...screenProps} />,
      );
    });

    when("I navigate to the LanguageDetection", () => {
      instance = languageDetectionShallow.instance() as LanguageDetection;

      const loginAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));

      loginAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        loginAPI.messageId,
      );

      loginAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate,
      );

      instance.loginApiCallId = loginAPI.messageId;
      runEngine.sendMessage("Unit Test", loginAPI);

      //test Current Language

      const currentLanguageAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.currentLanguageApiID = currentLanguageAPI.messageId;

      // handleTestApiCall(currentLanguageAPI, {
      //   status: "true",
      //   data: laguagesAPIRes[0],
      // });

      // handleTestApiCall(currentLanguageAPI, {
      //   status: "false",
      // });

      //test List Language
      Platform.OS = "android";
      NativeModules.I18nManager.localeIdentifier = "en";

      const languageListPageAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.languageListApiID = languageListPageAPI.messageId;

      // handleTestApiCall(languageListPageAPI, {
      //   status: "true",
      //   data: laguagesAPIRes,
      // });

      Platform.OS = "ios";
      languageListPageAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        laguagesAPIRes,
      );

      // handleTestApiCall(languageListPageAPI, {
      //   status: "false",
      // });

      //test Update Language
      const updateLanuageAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.updateLanguageApiID = updateLanuageAPI.messageId;

      // handleTestApiCall(updateLanuageAPI, {
      //   status: "true",
      // });

      // handleTestApiCall(updateLanuageAPI, {
      //   status: "false",
      // });

      const newCurrentLanguageAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.currentLanguageApiID = newCurrentLanguageAPI.messageId;

      // handleTestApiCall(newCurrentLanguageAPI, {
      //   status: "true",
      //   data: null,
      // });

      // handleTestApiCall(newCurrentLanguageAPI, {
      //   status: "false",
      // });

      expect(languageDetectionShallow).toBeTruthy();
    });

    then("LanguageDetection will load with out errors", () => {
      expect(languageDetectionShallow).toBeTruthy();
    });

    then("I can select option with out errors", () => {
      instance = languageDetectionShallow.instance() as LanguageDetection;
      let selectComponent = languageDetectionShallow.findWhere(
        (node) => node.prop("testID") === "language-select",
      );
      const event = {
        itemValue: 1,
        itemIndex: 1,
      };
      selectComponent.simulate("valueChange", event);
      expect(languageDetectionShallow).toBeTruthy();
    });

    then("I can update the language with out errors", () => {
      let buttonComponent = languageDetectionShallow.findWhere(
        (node) => node.prop("testID") === "language-select",
      );
      buttonComponent.prop("onValueChange")(jest.fn());
      expect(languageDetectionShallow).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(languageDetectionShallow).toBeTruthy();
    });
  });
});

// Customizable Area End
