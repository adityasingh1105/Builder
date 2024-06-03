// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import LoginWeb from "../../src/components/LoginWeb.web"

const screenProps = {
    navigation: {navigate:jest.fn()},
    id: "LoginWeb"
  }

const feature = loadFeature('./__tests__/features/LoginWeb-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LoginWeb', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LoginWeb; 

        given('I am a User loading LoginWeb', () => {
            exampleBlockA = shallow(<LoginWeb {...screenProps}/>);
            expect(exampleBlockA).toBeTruthy();

        });

        when('I navigate to the LoginWeb', () => {
             instance = exampleBlockA.instance() as LoginWeb
             expect(exampleBlockA).toBeTruthy();

        });

        then('LoginWeb will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can select the country code with with out errors', () => {
            const buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'openContryCodeModal');
            buttonComponent.simulate('click');
            expect(exampleBlockA).toBeTruthy();

        });
        then('I can enter number with out errors', () => {
            const textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            const event={target:{value:'6646454'}}
            textInputComponent.simulate('change', event);
            const loginBtn = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'loginBtn');
            loginBtn.simulate('click');
            const even={target:null}
            textInputComponent.simulate('change', even);
            expect(exampleBlockA).toBeTruthy();

        });

       then('I can press the LoginWeb button with out errors', () => {
        const textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            const event={target:{value:'6646454523'}}
            textInputComponent.simulate('change', event);
            const loginBtn = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'loginBtn');
            loginBtn.simulate('click');
            expect(exampleBlockA).toBeTruthy();

        });
        then("LoginWeb Api will return error",()=>{
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
              instance.getVerificationOtpWebApiCallId = putFormDataMessage.messageId;
              runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
             expect(exampleBlockA).toBeTruthy();

        })
        then("LoginWeb Api will return succes",()=>{
            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [
                        {

                        }
                    ]
                });
            instance.getVerificationOtpWebApiCallId = msgValidationAPI.messageId
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
              instance.getVerificationOtpWebApiCallId = getForsmMessage.messageId;
        
              runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
            expect(exampleBlockA).toBeTruthy();

        })
       
        then('I can enter otpWeb with out errors', () => {
            const otp1View = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInputOtp');
           const event={target:{value:'123456'}}
            otp1View.simulate('change',event );
            const even={target:null}
            otp1View.simulate('change',even );

            expect(exampleBlockA).toBeTruthy();
        });
        then('I can click resend otpWeb button with out errors', () => {
            const resendOtp = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'resendOtp');
            resendOtp.simulate('click');
            expect(exampleBlockA).toBeTruthy();

        });
        then('I can click cnacle button with out errors', () => {
            const cancleModal = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'cancleModal');
            cancleModal.simulate('click');
            expect(exampleBlockA).toBeTruthy();
            
        });
        then('I can click submit button with out errors', () => {
            const submitOtp = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'submitOtp');
            submitOtp.simulate('click');
            expect(exampleBlockA).toBeTruthy();
           

        });
        then("otpWeb Verification Api will return error",()=>{
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
              instance.validateOtpWebApiCallId = putFormDataMessage.messageId;
              runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
             expect(exampleBlockA).toBeTruthy();

        })
        then("otpWeb Verification Api will return succes",()=>{
            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [
                        {

                        }
                    ]
                });
            instance.validateOtpWebApiCallId = msgValidationAPI.messageId
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
              instance.validateOtpWebApiCallId = getForsmMessage.messageId;
        
              runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
            expect(exampleBlockA).toBeTruthy();

        })
       
        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });


});

// Customizable Area End
