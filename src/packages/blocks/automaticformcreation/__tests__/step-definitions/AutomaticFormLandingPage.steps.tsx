import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AutomaticFormLandingPage from "../../src/AutomaticFormLandingPage"
// import DataContext from "../../../../components/src/DataContext"

const screenProps = {
     navigation: {
      navigate:jest.fn()
    },
    id: "AutomaticFormLandingPage"
  }

const feature = loadFeature('./__tests__/features/AutomaticFormLandingPage-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AutomaticFormLandingPage', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let formInstance:AutomaticFormLandingPage; 

        given('I am a User loading AutomaticFormLandingPage', () => {
            exampleBlockA = shallow(<AutomaticFormLandingPage {...screenProps}/>);
        });

        when('I navigate to the AutomaticFormLandingPage', () => {
             formInstance = exampleBlockA.instance() as AutomaticFormLandingPage
     
      formInstance.getFormData();
        });

        then('AutomaticFormLandingPage will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('Click on flatlist item',()=> {
        //   formInstance.context = DataContext;
        //  formInstance.handleOnPress({id: '',
        //   type: '',
        //   attributes: {
        //           id: 0,
        //           name: '',
        //           description: '',
        //           field_name: []
        //         }})
        });

        then("Network response from get form api", () => {

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
            formInstance.getFormDataId = getFormMessage.messageId;
            
            runEngine.sendMessage(getFormMessage.id, getFormMessage);
      
          })

        then('I can leave the screen with out errors', () => {
            formInstance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
