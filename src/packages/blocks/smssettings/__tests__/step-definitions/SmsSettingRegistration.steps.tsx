// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import SmsSettingRegistration from "../../src/SmsSettingRegistration"


const ScreenProp = {
    navigation: {
        navigate: jest.fn()
    },
    id: "SmsSettingRegistration"
}

const feature = loadFeature('./__tests__/features/SmsSettingRegistration-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SmsSettingRegistration', ({ given, when, then }) => {
        let smsSettingRegistration : ShallowWrapper;
        let Instance: SmsSettingRegistration;

        given('I am a User loading SmsSettingRegistration', () => {
            smsSettingRegistration = shallow(<SmsSettingRegistration {...ScreenProp} />);
        });

        when('I enter the name in Name field to register', () => {
            Instance = smsSettingRegistration.instance() as SmsSettingRegistration

            const UserNameInput = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'userName')
            UserNameInput.simulate('changeText', 'test')

        });

        then('I successfully enter the name', () => {
            expect(Instance.state.RegistrationName).toBe('test')
        });

        when('I enter my email-id to the email field', () => {
            const UserEmailInput = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'userEmail')
            UserEmailInput.simulate('changeText', 'abc@gmail.com')
        });

        then('I successfully enter the email in the email field', () => {
            expect(Instance.state.RegistrationMail).toBe('abc@gmail.com')

        });

        when('I should enter the password in the field', () => {
            const Password = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'Pass')
            Password.simulate('changeText', '12345')
        })

        then('I enter the password in the password the field', () => {
            expect(Instance.state.RegistrationPass).toBe('12345')
        })


        when('I should confirm the password in confirm password field', () => {
            const ConfirmPassword = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'confimPass')
            ConfirmPassword.simulate('changeText', '123456')

        })

        then("I check the password to confirm", () => {
            expect(Instance.state.RegistrationConfirmPass).toBe('123456')
        });


        when('I click on option modal to select user', () => {
            const Value = 'user'
            const Modal = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'Modal_ID')
            Modal.props().onSelect({ index: 0, value: Value })
        })


        when('I click on the submit button form', () => {
            const SubmitBTN = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'Submit')
            SubmitBTN.simulate('press')

            const requestMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                requestMessage.messageId
            );

            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    data: {
                        attributes: {

                        }
                    }
                }))
            );
            Instance.User_registrationCallID = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);

        })

        then("I navigate to the SmsSettings screen", () => {
            expect(ScreenProp.navigation.navigate).toBeCalledWith('SmsSettings')
        })

        when("I click outside to close the keyboard", () => {
            let Keyboardhide = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'keyboardID')
            Keyboardhide.simulate('press')
        })
    });


});

// Customizable Area End
