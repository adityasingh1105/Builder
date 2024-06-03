import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Print from "../../src/Print"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Print"
  }

const feature = loadFeature('./__tests__/features/Print-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Print', ({ given, when, then }) => {
        let printBlock:ShallowWrapper;
        let instance:Print; 

        given('I am a User loading Print', () => {
            printBlock = shallow(<Print {...screenProps}/>);
        });

        when('I navigate to the Print', () => {
             instance = printBlock.instance() as Print
        });

        then('Print will load with out errors', () => {
            expect(printBlock).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = printBlock.findWhere((node) => node.prop('testID') === 'btnPrint');
            buttonComponent.simulate('press');
            expect(printBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(printBlock).toBeTruthy();
        });
    });


});
