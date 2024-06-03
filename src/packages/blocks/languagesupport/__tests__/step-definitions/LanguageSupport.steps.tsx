//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import {LanguageSupport} from "../../src/LanguageSupport"
import { setStorageData } from "framework/src/Utilities"
import SignupScreenOne from "../../src/SignUpScreenOne"
import { Alert } from "react-native"
const navigation = require("react-navigation")


const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
          callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        replace: jest.fn(),
        trim: jest.fn(),
        Alert: jest.fn(),
        split:jest.fn(),
      },
    id: "LanguageSupport"
  }

const feature = loadFeature('./__tests__/features/LanguageSupport-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LanguageSupport', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LanguageSupport; 

        given('I am a User loading LanguageSupport', () => {
            exampleBlockA = shallow(<LanguageSupport {...screenProps}/>);
        });

        when('I navigate to the LanguageSupport', () => {
             instance = exampleBlockA.instance() as LanguageSupport
        });

        then('LanguageSupport will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can select button with out errors', () => {
            instance = exampleBlockA.instance() as LanguageSupport
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'selectlngId');
            buttonComponent.simulate('press');
            instance.selectlng(instance.changeLang('French'));
            
       });
       then('I can choose language with out errors', async() => {
        const mockChangeLang = jest.fn();
        const language = { alternateLanguage: jest.fn()};
        const mockNavigation = { replace: jest.fn() };

        const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
          buttons[0].onPress();
          buttons[1].onPress();
          buttons[2].onPress();
        });
        const wrapper = shallow(<LanguageSupport changeLang={mockChangeLang}  lan={language} />);
        
        wrapper.instance().selectlng();
        expect(mockAlert).toHaveBeenCalled();
        wrapper.instance().props.lan.alternateLanguage('fr');        

        wrapper.instance().props.lan.alternateLanguage('es');


        wrapper.instance().props.lan.alternateLanguage('en');


        instance.receive()
        mockAlert.mockRestore();
   });
        
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
