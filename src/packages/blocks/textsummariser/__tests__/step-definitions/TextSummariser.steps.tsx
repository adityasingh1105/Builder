// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import TextSummariser from "../../src/TextSummariser"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "TextSummariser"
  }

const feature = loadFeature('./__tests__/features/TextSummariser-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to TextSummariser', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:TextSummariser; 

        given('I am a User loading TextSummariser', () => {
            exampleBlockA = shallow(<TextSummariser {...screenProps}/>)
        });

        when('I navigate to the TextSummariser', () => {
             instance = exampleBlockA.instance() as TextSummariser
        });

        then('TextSummariser will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            let buttonCompon = exampleBlockA.findWhere((node) => node.prop('testID') === 'dockPicker');
            buttonCompon.simulate('press')
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'summarize');
            buttonComponent.simulate('press')
        });

        then('I can enter text with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'summarize');
            buttonComponent.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

       
        then('I can click on Sub button with with out errors', () => {
            expect(exampleBlockA).toBeTruthy()

            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'subLine');
            buttonComponent.simulate('press',false)
        });
        then('I can click on ADD button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'addLine');
            buttonComponent.simulate('press',true)
            let button = exampleBlockA.findWhere((node) => node.prop('testID') === 'subLine');
            button.simulate('press',false)
            expect(exampleBlockA).toBeTruthy()

        });
        then('I can click on summarize button with with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            let button = exampleBlockA.findWhere((node) => node.prop('testID') === 'addLine');
            button.simulate('press',true)
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'summarize');
            buttonComponent.simulate('press')
            expect(exampleBlockA).toBeTruthy()

        });

        then('api will return succes', () => {
            let buttonCompon = exampleBlockA.findWhere((node) => node.prop('testID') === 'dockPicker');
            buttonCompon.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', '');
            let button = exampleBlockA.findWhere((node) => node.prop('testID') === 'addLine');
            button.simulate('press',true)
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'summarize');
            buttonComponent.simulate('press')
            const getFormMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessage
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: "successfull"
                }
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessage.messageId
              );
              instance.summarizeApiCallId = getFormMessage.messageId;

              runEngine.sendMessage(getFormMessage.id, getFormMessage);
            expect(exampleBlockA).toBeTruthy()
        });
        then('api will return error', () => {
            const getFormMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessage
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  error: "successfull"
                }
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessage.messageId
              );
              instance.summarizeApiCallId = getFormMessage.messageId;

              runEngine.sendMessage(getFormMessage.id, getFormMessage);
            expect(exampleBlockA).toBeTruthy()
        });
    });


});

// Customizable Area End
