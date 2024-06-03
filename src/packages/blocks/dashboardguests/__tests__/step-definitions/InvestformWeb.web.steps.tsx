// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import InvestFormWeb from "../../src/components/InvestFormWeb.web"
const screenProps = {
    navigation: {navigate:jest.fn(),
      state:{params:{company:{}}}},
    id: "Login"
  }


  const feature = loadFeature('./__tests__/features/InvestFormWeb-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to InvestFormWeb', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:InvestFormWeb; 

        given('I am a User loading InvestFormWeb', () => {
            exampleBlockA = shallow(<InvestFormWeb {...screenProps}/>);

        });

        when('I navigate to the InvestFormWeb', () => {
             instance = exampleBlockA.instance() as InvestFormWeb

        });

        then('InvestFormWeb will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter invest amount with out errors', () => {
            const txtInputAmount = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInputAmount');
            let event={target:{value:"1000"}}
            txtInputAmount.simulate('change',event)
            let even={target:null}
            txtInputAmount.simulate('change',even)

            expect(exampleBlockA).toBeTruthy()

        });
        then('date will render with out errors', () => {
            const date = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'date');

            expect(date).toBeTruthy();
        });
        then('I can click invest button with out errors', () => {
            const inestBtn = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'inestBtn');
            inestBtn.simulate('click')
            expect(exampleBlockA).toBeTruthy()

        });
        then('InvestFormWeb Api will return error', () => {
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
              instance.investApiWebCallID = putFormDataMessage.messageId;
              runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
            expect(exampleBlockA).toBeTruthy()

        });
        then('InvestFormWeb Api will return succes', () => {
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
              instance.investApiWebCallID = getFormMessage.messageId;
              
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
                  errro: "someting went wrong",
                }
              );
              getForsmMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getForsmMessage.messageId
              );
              instance.investApiWebCallID = getForsmMessage.messageId;
        
              runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
            expect(exampleBlockA).toBeTruthy()

        });
     
        then ("I can leave the screen with out errors",()=>{
            expect(exampleBlockA).toBeTruthy()
        })
    })
})
// Customizable Area End
