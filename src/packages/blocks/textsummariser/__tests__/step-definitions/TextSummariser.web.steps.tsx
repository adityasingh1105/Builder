// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import TextSummariser from "../../src/TextSummariser.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "TextSummariser"
  }

const feature = loadFeature('./__tests__/features/TextSummariser-scerario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to TextSummariserWeb', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:TextSummariser; 

        given('I am a User loading TextSummariserWeb', () => {
            exampleBlockA = shallow(<TextSummariser {...screenProps}/>)
        });

        when('I navigate to the TextSummariserWeb', () => {
             instance = exampleBlockA.instance() as TextSummariser
        });

        then('TextSummariserWeb will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            let buttonCompon = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'dockPicker');
            let event={target:{files:[{"name":"ssnsn"}]}}
            buttonCompon.simulate('change',event)
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'summarize');
            buttonComponent.simulate('click')
        });

        then('I can enter text with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'summarize');
            buttonComponent.simulate('click')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            let event={target:{value:"dlndjngjdngjdfn"}}
            textInputComponent.simulate('change', event);
        });

       
        then('I can click on Sub button with with out errors', () => {
            expect(exampleBlockA).toBeTruthy()

            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'subLine');
            buttonComponent.simulate('click',false)
        });
        then('I can click on ADD button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'addLine');
            buttonComponent.simulate('click',true)
            let button = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'subLine');
            button.simulate('click',false)
            expect(exampleBlockA).toBeTruthy()

        });
        then('I can click on summarize button with with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            let event={target:{value:"dlndjngjdngjdfn"}}

            textInputComponent.simulate('change', event);
            let button = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'addLine');
            button.simulate('click',true)
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'summarize');
            buttonComponent.simulate('click')
            expect(exampleBlockA).toBeTruthy()

        });

        then('api will return succes', () => {

            let buttonCompon = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'dockPicker');
            let event={target:{files:[{"name":"dfkgdgngf"}]}}
            
            buttonCompon.simulate('change',event)
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            let even={target:{value:"dlndjngjdngjdfn"}}

            textInputComponent.simulate('change', even);
            let buttonCompont = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'dockPicker');
            buttonCompont.simulate('change',event)
            let button = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'addLine');
            button.simulate('click',true)
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'summarize');
            buttonComponent.simulate('click')
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
              instance.summarizeApiCallIdWeb = getFormMessage.messageId;

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
              instance.summarizeApiCallIdWeb = getFormMessage.messageId;

              runEngine.sendMessage(getFormMessage.id, getFormMessage);
              getName(MessageEnum.RestAPIResponceMessage)
              
              const getFormMessag = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getFormMessag.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessag
              );
              getFormMessag.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                  error:false
                }
              );
              getFormMessag.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessag.messageId
              );
              instance.summarizeApiCallIdWeb = getFormMessag.messageId;

              runEngine.sendMessage(getFormMessag.id, getFormMessag);
            expect(exampleBlockA).toBeTruthy()
        });
    });


});

// Customizable Area End
