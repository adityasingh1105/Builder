//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { SignUpScreenOne } from "../../src/SignUpScreenOne"
import CustomInput from "../../../../components/src/CustomInput"
import StorageProvider from '../../../../framework/src/StorageProvider';
import { Alert, Platform } from "react-native"
import { configJSON } from "../../src/SignUpScreenOneController"
import CheckBox from "@react-native-community/checkbox"



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
        pop:jest.fn()
      },
    id: "LanguageSupport"
  }

const feature = loadFeature('./__tests__/features/SignUpScreenOne-scenario.feature');
const responseJson = {
    "data": {
        "values": 1
    }
}

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()       
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(Alert, 'alert');


    });
  

    test('User navigates to SignUpScreenOne In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let customComponent: ShallowWrapper;
        let instance: SignUpScreenOne;

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<SignUpScreenOne {...screenProps} />)
            customComponent = shallow(<CustomInput {...screenProps} />)
            expect(mobileAccountLogInWrapper).toBeTruthy()

        });

        when('I navigate to the Log In Screen', () => {
            instance = mobileAccountLogInWrapper.instance() as SignUpScreenOne

            const callGetValidationApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
            callGetValidationApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), callGetValidationApi);
            callGetValidationApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            callGetValidationApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), callGetValidationApi.messageId);
            instance.apiAccountCallId = callGetValidationApi.messageId
            runEngine.sendMessage("Unit Test", callGetValidationApi);
        });
        then('I can Enter the Mobile Number', () => {
            let textinputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'CustomInputID');
            textinputComponent.simulate('onChangeText', '0123456789');
            instance.onChangeText
            let newText = '';

            expect(mobileAccountLogInWrapper).toBeTruthy();
        });
        
        then('I can Agree to receive SMS messages fronm the roo', () => {
            const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
                buttons[0].onPress();
                buttons[1].onPress();
                buttons[2].onPress();
              });

              const wrapper = shallow(<SignUpScreenOne />);
                wrapper.instance().setState({ isSelected: false });
                wrapper.update();
              const checkBox = wrapper.find('[testID="check1"]')
              checkBox.props().onChange(); 
             
              expect(wrapper.state('isSelected')).toBe(true);
            });

        then('I can select the Log In button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'touch1');
            buttonComponent.simulate('press');
        });
        
        then('I can select the Log In button1 with out errors', async () => {
            const mockChangeLang = jest.fn();
            const language = { alternateLanguage: jest.fn()};
            const mockNavigation = { replace: jest.fn() };

            instance = mobileAccountLogInWrapper.instance() as SignUpScreenOne
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'touch2');
                buttonComponent.simulate('press');
            const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
                buttons[0].onPress();
                buttons[1].onPress();
                buttons[2].onPress();
              });

              const wrapper = shallow(<SignUpScreenOne changeLang={mockChangeLang}  lan={language} />);


              wrapper.instance().selectlng();
              expect(mockAlert).toHaveBeenCalled();
              wrapper.instance().props.lan.alternateLanguage('fr');        
      
              wrapper.instance().props.lan.alternateLanguage('es');
      
      
              wrapper.instance().props.lan.alternateLanguage('en');
      
      
              instance.receive()
              mockAlert.mockRestore();
            


        });
        then('I can select button with out errors', async () => {
            const wrapper = shallow(<SignUpScreenOne  />);
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'nextbtn');
            buttonComponent.simulate('press');
            
            let mobile='7000489422'
            instance.callGetValidationApi(mobile)
            instance.callGetValidationApi('')
            const errorData = { // example error response data
                error: 'Something went wrong'
              };

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)          

            let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), errorData);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {"token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"}
            });
            
            instance.apiAccountCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            const message = new Message();
            await wrapper.instance().receive('sender', message);
            wrapper.update();
        });
        then('If button find some thing wrong they give errors', async () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'nextbtn');
            buttonComponent.simulate('press');
            
            let mobile='7000489422'
            instance.callGetValidationApi(mobile)
            instance.callGetValidationApi('')
            

        });

        then('I can leave the screen with out errors', () => {
            var newText = '12abc3'
            instance.onChangeText(newText)
            instance.setState({ phoneNumber: '1234567891' })
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });
    });


});
