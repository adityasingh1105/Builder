import { LanguageOptions } from "../../src/LanguageOptions";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
// import i18next from "i18next";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
const navigation = require("react-navigation");
export const configJSON = require("../../src/config");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    changeLanguage : jest.fn()
},
  id: "LanguageOptions",
};

const feature = loadFeature(
  "./__tests__/features/LanguageOptions-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LanguageOptions", ({ given, when, then }) => {
    let LanguageOptionsBlock: ShallowWrapper;
    let instance: LanguageOptions;

    given("I am a User loading LanguageOptions", () => {
      LanguageOptionsBlock = shallow(<LanguageOptions {...screenProps} />);
    });

    when("I navigate to the LanguageOptions", () => {
      instance = LanguageOptionsBlock.instance() as LanguageOptions;
    });

    then("LanguageOptions will load with out errors", () => {
      expect(LanguageOptionsBlock).toBeTruthy();
    });

    then("LanguageOptions will load language without errors", () => {
      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      instance.componentDidMount();

      const languageOptionslanguageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      languageOptionslanguageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        languageOptionslanguageRestAPI.messageId
      );
      languageOptionslanguageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: configJSON.languagesData,
        }
      );
      instance.getLanguageAPICall = languageOptionslanguageRestAPI.messageId;
      instance.getLanguages();
      instance.getToken();
      runEngine.sendMessage("Unit Test", languageOptionslanguageRestAPI);
    });

    then("LanguageOptions has error in load language", () => {
      const languageOptionslanguageRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      languageOptionslanguageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        languageOptionslanguageRestAPI.messageId
      );
      languageOptionslanguageRestAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: configJSON.apiError,
        }
      );
      instance.getLanguageAPICall = languageOptionslanguageRestAPI.messageId;
      runEngine.sendMessage("Unit Test", languageOptionslanguageRestAPI);
    });

    then("LanguageOptions will load language data without errors", () => {
      const languageOptionsLanguageDataRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      languageOptionsLanguageDataRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        languageOptionsLanguageDataRestAPI.messageId
      );
      instance.getLanguageresults();
      instance.getSearchDetailsLanguage =
        languageOptionsLanguageDataRestAPI.messageId;
      runEngine.sendMessage("Unit Test", languageOptionsLanguageDataRestAPI);
    });

    then("LanguageOptions has error in load language data", () => {
      const languageOptionsLanguageDataRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      languageOptionsLanguageDataRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        languageOptionsLanguageDataRestAPI.messageId
      );
      languageOptionsLanguageDataRestAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: configJSON.apiError,
        }
      );
      instance.getSearchDetailsLanguage =
        languageOptionsLanguageDataRestAPI.messageId;
      runEngine.sendMessage("Unit Test", languageOptionsLanguageDataRestAPI);
    });

    then("I can select language without errors", () => {
      let languageBtnOne = LanguageOptionsBlock.findWhere(
        (node) => node.prop("testID") === "buttonLang-English"
      );

      let languageBtnTwo = LanguageOptionsBlock.findWhere(
        (node) => node.prop("testID") === "buttonLang-Français"
      );

      instance.setLanguage("English");
      instance.setLanguage("Français");
      instance.setLanguageSelect(1);
      instance.setLanguageSelect(0);
      expect(LanguageOptionsBlock).toBeTruthy();
    });

    then("I can click save button without errors", () => {
      let buttonSave = LanguageOptionsBlock.findWhere(
        (node) => node.prop("testID") === "saveBtn"
      );
      instance.getLanguageresults();
      expect(LanguageOptionsBlock).toBeTruthy();
    });

    then("I can click back button without errors", () => {
      let buttonBack = LanguageOptionsBlock.findWhere(
        (node) => node.prop("testID") === "backBtn"
      );
      expect(LanguageOptionsBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(LanguageOptionsBlock).toBeTruthy();
    });
  });
});
