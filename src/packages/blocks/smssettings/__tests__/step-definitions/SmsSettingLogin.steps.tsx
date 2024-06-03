// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import SmsSettingLogin from "../../src/SmsSettingLogin";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";


const screenprops = {
    navigation: {
        navigate: jest.fn(),
        state:{
            param:{
                Token:''
            }
        }
    },
    id: "SmsSettingLogin"
}


const feaTure = loadFeature('./__tests__/features/SmsSettingLogin-scenario.feature');

defineFeature(feaTure, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SmsSettingLogin', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: SmsSettingLogin;

        given('I am a User loading SmsSettingLogin', () => {
            exampleBlockA = shallow(<SmsSettingLogin {...screenprops} />);
        });

        when('SmsSettingLogin will load with out errors', () => {
            let Keyboardhide = exampleBlockA.findWhere((node) => node.prop('testID') === 'keybord')
            Keyboardhide.simulate('press')
            expect(Keyboardhide).toBeDefined()
        });

        then('I can enter text with out errors', () => {
            const userNameInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'userName')
            userNameInput.simulate('changeText', 'ounoanud')
            expect(userNameInput).toBeDefined()
        });

        then('I can select the button with with out errors', () => {
            const PassInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'Password')
            PassInput.simulate('changeText', 'aiudniand')
            expect(PassInput).toBeDefined()
        });

        then('I can leave the screen with out errors', () => {
            const SubmitBTN = exampleBlockA.findWhere((node) => node.prop('testID') === 'SubmitBTN')
            SubmitBTN.simulate('press')
            expect(SubmitBTN).toBeDefined()

        });
    });


});

// Customizable Area End
