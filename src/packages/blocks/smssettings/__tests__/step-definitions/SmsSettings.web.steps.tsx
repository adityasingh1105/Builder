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
import SmsSettings from "../../src/SmsSettings.web";
const navigation = require("react-navigation");
import { Redirect, Route } from "react-router-dom"; 

const feature = loadFeature(
  "./__tests__/features/SmsSettings-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SmsSettings", ({ given, when, then }) => {
    let SmsSettingsWrapper: ShallowWrapper;
    let instance: SmsSettings;

    given("I am a User loading SmsSettings", () => {
      SmsSettingsWrapper = shallow(<SmsSettings />);
    });

    when("I navigate to the SmsSettings", () => {
      instance = SmsSettingsWrapper.instance() as SmsSettings;
    });

    then("SmsSettings will load with out errors", () => {
      expect(SmsSettingsWrapper.find(Route).at(0).prop("render")()).toEqual(
        <Redirect to="/SmsSettings/credentials" />
      );
    });

    then("I can enter text with out errors", () => {
      instance.setAuthLogin(false, "test-user", "test-token", 1);
      expect(SmsSettingsWrapper.find(Route).at(0).prop("render")()).toEqual(
        <Redirect to="/SmsSettings/user" />
      );
    });

    then("I can select the button with with out errors", () => {
      instance.setAuthLogin(true, "test-user", "test-token", 1);
      expect(SmsSettingsWrapper.find(Route).at(0).prop("render")()).toEqual(
        <Redirect to="/SmsSettings/admin" />
      );
    });
  });
});

// Customizable Area End
