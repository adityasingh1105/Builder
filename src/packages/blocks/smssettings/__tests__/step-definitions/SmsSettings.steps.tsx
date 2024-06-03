// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import SmsSettings from "../../src/SmsSettings"


const SProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "SmsSettings"
}


const FEATURE = loadFeature('./__tests__/features/SmsSettings-scenario.feature');

defineFeature(FEATURE, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SmsSettings', ({ given, when, then }) => {
        let smsSettingRegistration: ShallowWrapper;
        let instance: SmsSettings;

        given('I am a User loading SmsSettings', () => {
            smsSettingRegistration = shallow(<SmsSettings {...SProps} />);
        });


        when('I can navigate from the SmsSettings to the SmsSettingRegistration', () => {
            const Resigter = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'Registertion')
            Resigter.simulate('press')
        });

        then('I navigate to the SmsSettingRegistration screen after clicking on Sms Setting Registration button', () => {
            expect(SProps.navigation.navigate).toBeCalledWith('SmsSettingRegistration')
        })

        when('I can navigate from the SmsSettings to the SmsSettingLogin', () => {
            const Login_With_user = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'loginuser')
            Login_With_user.simulate('press')
        });

        then('I navigate to the SmsSettingLogin screen after clicking on Sms Setting login user button', () => {
            expect(SProps.navigation.navigate).toBeCalledWith('SmsSettingLogin')
        })

        when('I can navigate from the SmsSettings to the SmsSettingAdminLogin', () => {
            const Login_With_Admin = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'loginadmin')
            Login_With_Admin.simulate('press')
        });

        then('I navigate to the SmsSettingAdminLogin screen after clicking on Sms Setting Admin loginbutton', () => {
            expect(SProps.navigation.navigate).toBeCalledWith('SmsSettingAdminLogin')
        })

        when("user can close the keyboard by clicking out side of the screen", () => {
            let Keyboardhide = smsSettingRegistration.findWhere((node) => node.prop('testID') === 'keyboardID')
            Keyboardhide.simulate('press')
        })

    });


});



// Customizable Area End
