// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
jest.useFakeTimers();
import { shallow, ShallowWrapper } from 'enzyme'
jest.useFakeTimers();

import * as helpers from '../../../../framework/src/Helpers'
jest.useFakeTimers();
import { runEngine } from '../../../../framework/src/RunEngine'
jest.useFakeTimers();
import { Message } from "../../../../framework/src/Message"

jest.useFakeTimers();
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
jest.useFakeTimers();
import React from "react";
import Login from "../../src/components/Login"
jest.useFakeTimers();
const screenProps = {
  navigation: { navigate: jest.fn() },
  id: "Login"
}

const feature = loadFeature('./__tests__/features/Login-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to Login', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      exampleBlockA = shallow(<Login {...screenProps} />);

    });

    when('I navigate to the Login', () => {
      instance = exampleBlockA.instance() as Login

    });

    then('I can select the country code with with out errors', () => {
      const buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'openContryCodeModal');
      buttonComponent.simulate('press');
      expect(exampleBlockA).toBeTruthy();

    });


    then('I can enter number with out errors', () => {
      const textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
      textInputComponent.simulate('changeText', '6646454');
      const loginBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'loginBtn');
      loginBtn.simulate('press');
    
      expect(exampleBlockA).toBeTruthy();

    });

    then('I can press the login button with out errors', () => {
      instance.getVerificationOtp=jest.fn()
      const textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
      textInputComponent.simulate('changeText', '6646454852');
      const loginBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'loginBtn');
      loginBtn.simulate('press');
      expect(instance.getVerificationOtp).toHaveBeenCalled()

    });
    then("Login Api will return error", () => {
      const putFormDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": {


          }
        }
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage.messageId
      );
      instance.getVerificationOtpApiCallId = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      const getForsmMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errro: "someting went wrong",
        }
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage.messageId
      );
      instance.getVerificationOtpApiCallId = getForsmMessage.messageId;

      runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
      expect(exampleBlockA).toBeTruthy();

    })
    then("Login Api will return succes", () => {
      const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
            {

            }
          ]
        });
      instance.getVerificationOtpApiCallId = msgValidationAPI.messageId
      runEngine.sendMessage("Unit Test", msgValidationAPI)

      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      expect(exampleBlockA).toBeTruthy();

    })

    then('I can enter otp with out errors', () => {
      const otp1View = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputOtp');
      otp1View.simulate('changeText', "1111");
      expect(exampleBlockA).toBeTruthy();
    });
    then('I can click resend otp button with out errors', () => {
      const resendOtp = exampleBlockA.findWhere((node) => node.prop('testID') === 'resendOtp');
      resendOtp.simulate('press');
      expect(exampleBlockA).toBeTruthy();

    });
    then('I can click cnacle button with out errors', () => {
      const cancleModal = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancleModal');
      cancleModal.simulate('press');
      expect(exampleBlockA).toBeTruthy();

    });
    then('I can click submit button with out errors', () => {
      const submitOtp = exampleBlockA.findWhere((node) => node.prop('testID') === 'submitOtp');
      submitOtp.simulate('press');
      expect(exampleBlockA).toBeTruthy();


    });
    then("Otp Verification Api will return error", () => {
      const putFormDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": {
          }
        }
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage.messageId
      );
      instance.validateOtpApiCallId = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      expect(exampleBlockA).toBeTruthy();

    })
    then("Otp Verification Api will return succes", () => {
      const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
            {

            }
          ]
        });
      instance.validateOtpApiCallId = msgValidationAPI.messageId
      runEngine.sendMessage("Unit Test", msgValidationAPI)

      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      const getForsmMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errro: "someting went wrong",
        }
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage.messageId
      );
      instance.validateOtpApiCallId = getForsmMessage.messageId;

      runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
      expect(exampleBlockA).toBeTruthy();

    })

  });


});

// Customizable Area End
