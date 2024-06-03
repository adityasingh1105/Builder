import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AutomaticFormCreation from "../../src/AutomaticFormCreation"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AutomaticFormCreation"
  }

const feature = loadFeature('./__tests__/features/AutomaticFormCreation-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AutomaticFormCreation', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let formInstance:AutomaticFormCreation; 

        given('I am a User loading AutomaticFormCreation', () => {
            exampleBlockA = shallow(<AutomaticFormCreation {...screenProps}/>);
        });

        when('I navigate to the AutomaticFormCreation', () => {
             formInstance = exampleBlockA.instance() as AutomaticFormCreation
             formInstance.renderInputType("time","hellllllllooo");             
             formInstance.renderInputType("boolean","hello");
      formInstance.renderInputType("text","nice");
      formInstance.renderInputType("integer","what");
      formInstance.renderInputType("date","nice name");
      // formInstance.setState({automaticFormData:
      //   {
      //       "id": "3",
      //       "type": "form_creation",
      //       "attributes": {
      //           "id": 3,
      //           "name": "New test field",
      //           "description": "test test test",
      //           "field_name": [
      //               {
      //                   "id": 5,
      //                   "field_name": "Integer Field",
      //                   "field_type": "integer",
      //                   "form_creation_id": 3,
      //                   "created_at": "2023-03-23T13:32:18.564Z",
      //                   "updated_at": "2023-03-23T13:32:18.564Z"
      //               },
      //           ]
      //       }
      //   }
    // })
      formInstance.setState({formValues:{["Integer Field"]:"123"}})
      const event = {name:'Integer_Field',value:'123'}
      // formInstance.onChangeValues(event);
      formInstance.putFormData();
      formInstance.onButtonPressed();
        });

        then('AutomaticFormCreation will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

          then("Network response from put form api", () => {

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
                data: "successfull"
              }
            );
            putFormDataMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              putFormDataMessage.messageId
            );
            formInstance.putFormDataId = putFormDataMessage.messageId;
            runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      
          })
      
          then("Network response from api is error", () => {
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
            formInstance.putFormDataId = putFormDataMessage.messageId;
            runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      
          })

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
           
        });

        then('I can leave the screen with out errors', () => {
            formInstance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
