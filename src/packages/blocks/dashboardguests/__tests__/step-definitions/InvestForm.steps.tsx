// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
jest.useFakeTimers()
import { shallow, ShallowWrapper } from 'enzyme'
jest.useFakeTimers()
import * as helpers from '../../../../framework/src/Helpers'
jest.useFakeTimers()
import {runEngine} from '../../../../framework/src/RunEngine'
jest.useFakeTimers()
import {Message} from "../../../../framework/src/Message"
jest.useFakeTimers()

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
jest.useFakeTimers()
import React from "react";
import InvestForm from "../../src/components/InvestForm"
jest.useFakeTimers()
const screenProps = {
    navigation: {navigate:jest.fn(),
      state:{params:{company:{}}}},
    id: "Login"
  }


  const feature = loadFeature('./__tests__/features/InvestForm-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to InvestForm', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:InvestForm; 

        given('I am a User loading InvestForm', () => {
            exampleBlockA = shallow(<InvestForm {...screenProps}/>);

        });

        when('I navigate to the InvestForm', () => {
             instance = exampleBlockA.instance() as InvestForm

        });


        then('I can enter invest amount with out errors', () => {
            const txtInputAmount = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputAmount');
            txtInputAmount.simulate('changeText',"1000")
            expect(exampleBlockA).toBeTruthy()

        });
        then('date will render with out errors', () => {
            const date = exampleBlockA.findWhere((node) => node.prop('testID') === 'date');

            expect(date).toBeTruthy();
        });
        then('I can click invest button with out errors', () => {
            const inestBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'inestBtn');
            inestBtn.simulate('press')
            expect(exampleBlockA).toBeTruthy()

        });
        then('InvestForm Api will return error', () => {
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
              instance.investApiCallID = putFormDataMessage.messageId;
              runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
            expect(exampleBlockA).toBeTruthy()

        });
        then('InvestForm Api will return succes', () => {
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
              instance.investApiCallID = getFormMessage.messageId;
              
              runEngine.sendMessage(getFormMessage.id, getFormMessage);
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
                  errro: "someting went wrong!",
                }
              );
              getForsmMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getForsmMessage.messageId
              );
              instance.investApiCallID = getForsmMessage.messageId;
        
              runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
            expect(exampleBlockA).toBeTruthy()
        });
    })
})
// Customizable Area End
