// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SmsSettingAdminLogin from "../../src/SmsSettingAdminLogin"


const Props = {
    navigation: {
        navigate: jest.fn()
    },
    id: "SmsSettingAdminLogin"
}

const Feature = loadFeature('./__tests__/features/SmsSettingAdminLogin-scenario.feature');

defineFeature(Feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
    });

    test('User navigates to SmsSettingAdminLogin', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: SmsSettingAdminLogin;

        given('I am a User loading SmsSettingAdminLogin', () => {
            exampleBlockA = shallow(<SmsSettingAdminLogin {...Props} />);
            instance = exampleBlockA.instance() as SmsSettingAdminLogin
        });

        when('I enter the admin user name in the SmsSettingAdminLogin input field', () => {
            const AdminuserName = exampleBlockA.findWhere((node) => node.prop('testID') === 'AdminuserName');
            AdminuserName.simulate('changeText', "hello@aol.com");
        });

        then('SmsSettingAdminLogin admin user name get will load in the screen', async () => {
            await act(async () => { });
            await waitFor(() => {
                expect(instance.state.UserMail).toBe('hello@aol.com');
            });
        });

        when("I can enter admimPassword in the SmsSettingAdminLogin in the adminPassword", () => {
            const AdminPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'AdminPassword')
            AdminPassword.simulate('changeText', '12345')
        })

        then('I can check adminPassword weather is correct or not', async () => {
            await act(async () => { });
            await waitFor(() => {
                expect(instance.state.UserPass).toBe('12345');
            });
        });



        when('I can click on the submit button after filling all the data', () => {
            const SubmitBTN = exampleBlockA.findWhere((node) => node.prop('testID') === 'AdminSubmitBTN')
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
                    meta: {
                        token: "",
                        role: 'super_user'
                    }
                }))
            );
            instance.LoginCall_ID = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);


            const API_Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            API_Message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                API_Message.messageId
            );
            API_Message.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    meta: {
                        token: "",
                        role: 'user'
                    }
                }))
            );
            instance.LoginCall_ID = API_Message.messageId;
            runEngine.sendMessage("Unit Test", API_Message);
        });


        then("User get navigate to the SmsSettingAdminLayout screen after clicking on submit the creditails", () => {
            expect(Props.navigation.navigate).toBeCalledWith('SmsSettingAdminLayout', {  "Token": undefined })
        })

        when("user can close keyboard by click without of the screen",()=>{
               let Keyboardhide = exampleBlockA.findWhere((node) => node.prop('testID') === 'keybord')
            Keyboardhide.simulate('press')
        })

    });

});


// Customizable Area End
