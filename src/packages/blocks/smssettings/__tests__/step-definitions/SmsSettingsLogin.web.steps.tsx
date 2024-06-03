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
import SmsSettingsLogin from "../../src/SmsSettingsLogin.web";

const screenProps = {
  credentials: {
    isAuthenticated: false,
    isAdmin: false,
    setAuth: jest.fn(),
  },
};

const feature = loadFeature(
  "./__tests__/features/SmsSettingsLogin-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SmsSettingsLogin", ({ given, when, then }) => {
    let SmsSettingsLoginWrapper: ShallowWrapper;
    let instance: SmsSettingsLogin;

    given("I am a User loading SmsSettingsLogin", () => {
      SmsSettingsLoginWrapper = shallow(<SmsSettingsLogin {...screenProps} />);
    });

    when("I navigate to the SmsSettingsLogin", () => {
      instance = SmsSettingsLoginWrapper.instance() as SmsSettingsLogin;
    });

    then("Login as admin", () => {
      const loginAdmin = SmsSettingsLoginWrapper.find(
        '[data-test-id="loginadmin"]'
      );
      expect(loginAdmin.length).toBe(1);

      loginAdmin.simulate("click");

      const goBackBtn = SmsSettingsLoginWrapper.find('[data-test-id="goback"]');
      goBackBtn.simulate("click");

      loginAdmin.simulate("click");

      const emailLoginInput = SmsSettingsLoginWrapper.find(
        '[data-test-id="email-login"]'
      );
      const emailPasswordInput = SmsSettingsLoginWrapper.find(
        '[data-test-id="password-login"]'
      );
      const emailLoginBtn = SmsSettingsLoginWrapper.find(
        '[data-test-id="email-login-btn"]'
      );

      emailLoginInput.simulate("change", {
        target: { value: "test@mail.com" },
      });
      emailPasswordInput.simulate("change", { target: { value: "testpass" } });
      emailLoginBtn.simulate("click");

      const apiLogin: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiLogin.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: {
          role: "admin",
          user_name: "testname",
          token: ["token"],
          id: 25,
        },
      });
      apiLogin.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiLogin.messageId
      );
      instance.loginMessageId = apiLogin.messageId;
      runEngine.sendMessage("Unit Test", apiLogin);
    });

    then("Login as user", () => {
      const goBackBtn = SmsSettingsLoginWrapper.find('[data-test-id="goback"]');
      goBackBtn.simulate("click");

      const loginUser = SmsSettingsLoginWrapper.find(
        '[data-test-id="loginuser"]'
      );
      expect(loginUser.length).toBe(1);
      loginUser.simulate("click");

      const emailLoginInput = SmsSettingsLoginWrapper.find(
        '[data-test-id="email-login"]'
      );
      const emailPasswordInput = SmsSettingsLoginWrapper.find(
        '[data-test-id="password-login"]'
      );
      const emailLoginBtn = SmsSettingsLoginWrapper.find(
        '[data-test-id="email-login-btn"]'
      );

      emailLoginInput.simulate("change", {
        target: { value: "user@mail.com" },
      });
      emailPasswordInput.simulate("change", { target: { value: "testpass" } });
      emailLoginBtn.simulate("click");

      const apiLogin: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiLogin.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: {
          role: "user",
          user_name: "testname",
          token: ["token"],
          id: 25,
        },
      });
      apiLogin.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiLogin.messageId
      );
      instance.loginMessageId = apiLogin.messageId;
      runEngine.sendMessage("Unit Test", apiLogin);
    });

    then("Register as a user or admin", () => {
      const goBackBtn = SmsSettingsLoginWrapper.find('[data-test-id="goback"]');
      goBackBtn.simulate("click");

      const register = SmsSettingsLoginWrapper.find(
        '[data-test-id="register"]'
      );
      expect(register.length).toBe(1);
      register.simulate("click");

      const registerUsername = SmsSettingsLoginWrapper.find(
        '[data-test-id="username-register"]'
      );
      const registerEmail = SmsSettingsLoginWrapper.find(
        '[data-test-id="email-register"]'
      );
      const registerPassword = SmsSettingsLoginWrapper.find(
        '[data-test-id="password-register"]'
      );
      const registerPasswordConfirm = SmsSettingsLoginWrapper.find(
        '[data-test-id="passwordConfirm-register"]'
      );
      const registerRole = SmsSettingsLoginWrapper.find(
        '[data-test-id="role-register"]'
      );
      const registerBtn = SmsSettingsLoginWrapper.find(
        '[data-test-id="submit-register"]'
      );

      registerUsername.simulate("change", { target: { value: "testuser" } });
      registerEmail.simulate("change", {
        target: { value: "testuser@mail.com" },
      });
      registerPassword.simulate("change", { target: { value: "pass" } });
      registerPasswordConfirm.simulate("change", { target: { value: "pass" } });
      registerRole.simulate("change", { target: { value: "user" } });
      registerBtn.simulate("click");

      const apiRegister: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiRegister.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: { token: "token" },
      });
      apiRegister.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiRegister.messageId
      );
      instance.registerMessageId = apiRegister.messageId;
      runEngine.sendMessage("Unit Test", apiRegister);
    });
  });
});

// Customizable Area End
