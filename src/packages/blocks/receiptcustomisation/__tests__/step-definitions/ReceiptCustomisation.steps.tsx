// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { expect, jest, beforeEach } from "@jest/globals";
import React from "react";
import ReceiptCustomisation from "../../src/ReceiptCustomisation"
import { Dimensions } from "react-native";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ReceiptCustomisation"
  }

const feature = loadFeature('./__tests__/features/ReceiptCustomisation-scenario.feature');
global.console.error = jest.fn();
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(Dimensions, "addEventListener").mockImplementation((event: string, callback: Function) => callback())
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ReceiptCustomisation', ({ given, when, then }) => {
        let ReceiptCustomisationBlockA:ShallowWrapper;
        let instance:ReceiptCustomisation; 

        given('I am a User loading ReceiptCustomisation', () => {
            ReceiptCustomisationBlockA = shallow(<ReceiptCustomisation {...screenProps}/>);
        });

        when('I navigate to the ReceiptCustomisation', () => {
             instance = ReceiptCustomisationBlockA.instance() as ReceiptCustomisation
        });

        then('ReceiptCustomisation will load with out errors', () => {
            expect(ReceiptCustomisationBlockA).toBeTruthy();
            instance.isPlatformWeb = () => false;
            console.log("Log---",instance.txtInputProps);
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = ReceiptCustomisationBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            instance.btnShowHideProps.onPress();
            jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');

        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = ReceiptCustomisationBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
            instance.setInputValue("");
            instance.setEnableField();
        });

        then("I press on button to show the password", () => {
            let btnShowHide = ReceiptCustomisationBlockA.findWhere((node) => node.prop('testID') === 'btnShowHide');
            btnShowHide.simulate('press');
            instance.txtInputWebProps.secureTextEntry = false;
        });

        then("I press on button to hide the password", () => {
            let btnShowHide = ReceiptCustomisationBlockA.findWhere((node) => node.prop('testID') === 'btnShowHide');
            btnShowHide.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(ReceiptCustomisationBlockA).toBeTruthy();
        });
    });


});

// Customizable Area End
