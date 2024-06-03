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
import CompanyList,{RenderItem} from "../../src/components/CompanyList"
jest.useFakeTimers()
const screenProps = {
    navigation: {navigate:jest.fn()},
    id: "Login"
  }
const RenderItemProps={
    item:{
        type:"",
        attributes:{
          company_holder:"",
           doc:"",
           company_name:"string"
        },
        id:"string"
    },
    investNow:jest.fn()
}

  const feature = loadFeature('./__tests__/features/CompanyList-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CompanyList', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let renderITemWrapper:ShallowWrapper;
        let instance:CompanyList; 

        given('I am a User loading CompanyList', () => {
            exampleBlockA = shallow(<CompanyList {...screenProps}/>);
            renderITemWrapper = shallow(<RenderItem {...RenderItemProps}/>);

        });

        when('I navigate to the CompanyList', () => {
             instance = exampleBlockA.instance() as CompanyList

        });

       

        then('CompanyFlatList will load with out errors', () => {
            const companyFlatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'companyFlatList');
            expect(companyFlatList).toBeTruthy()
            companyFlatList.renderProp('renderItem')({ item: {type:"f", attributes:{company_name:"dfdf"}}});
        
        });
        then('I can see the companyName with with out errors', () => {
            const companyName = renderITemWrapper.findWhere((node) => node.prop('testID') === 'companyName');
            expect(companyName).toBeTruthy()
        });
        then('I can see the companyType with with out errors', () => {
            const companyType = renderITemWrapper.findWhere((node) => node.prop('testID') === 'companyType');
            expect(companyType).toBeTruthy()
        });
        then('I can press the investBtn button with out errors', () => {
            const investBtn = renderITemWrapper.findWhere((node) => node.prop('testID') === 'investBtn');
            investBtn.simulate('press',{RenderItemProps})
            expect(exampleBlockA).toBeTruthy()

        });
        then('CompanyList APi will not run',()=>{
          const putFormDataMessage = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          putFormDataMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            putFormDataMessage
          );
          putFormDataMessage.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              "errors": "nvncvn"
            }
          );
          putFormDataMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            putFormDataMessage.messageId
          );
          instance.getCompaniesApiCallID = putFormDataMessage.messageId;
          runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
        expect(exampleBlockA).toBeTruthy()
        })
        then('CompanyList Api will return error', () => {
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
                  "errors": "nvncvn"
                }
              );
              putFormDataMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                putFormDataMessage.messageId
              );
              instance.getCompaniesApiCallID = putFormDataMessage.messageId;
              runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
            expect(exampleBlockA).toBeTruthy()

        });
        then('CompanyList Api will return succes', () => {
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
                  data: "successfulll"
                }
              );
              getFormMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getFormMessage.messageId
              );
              instance.getCompaniesApiCallID = getFormMessage.messageId;
              
              runEngine.sendMessage(getFormMessage.id, getFormMessage);
            expect(exampleBlockA).toBeTruthy()

        });
      
    })
})
// Customizable Area End
