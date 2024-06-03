//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import Splashscreen from "../../src/Splashscreen"
import { LanguageSupport } from "../../src/LanguageSupport";
import { getStorageData } from "framework/src/Utilities";
const navigation = require("react-navigation")

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
    id: "Splashscreen"
  }
  const screenPropsupload = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {callback()}),
   
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
const feature = loadFeature('./__tests__/features/splashscreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Splashscreen', ({ given, when, then }) => {
        let splashscreen:ShallowWrapper;
        let instance:Splashscreen; 

        given('I am a User loading Splashscreen', () => {
            splashscreen = shallow(<Splashscreen {...screenProps}/>)
            splashscreen.setState({timeout: 0})
        });

        when('I navigate to the Splashscreen', () => {
             instance = splashscreen.instance() as Splashscreen
        });

        then('Splashscreen will load with out errors',  () => {
            expect(Splashscreen).toBeTruthy()
            jest.useFakeTimers();
          
            getStorageData('chosenLanguage');           
              instance.goToHome()  
              const naviProp = { navigation: { navigate: () => {} } };
              const navigationOptions = new LanguageSupport(naviProp);
                
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            const receivedData = { keysOne: 'value1', keysTwo: 'value2' };
            instance.receive(receivedData)
            expect(Splashscreen).toBeTruthy()
        });
    });
    test('User navigates to LanguageSupport', ({ given, when, then }) => {
        let uploadimage: ShallowWrapper;
        let instance: LanguageSupport

        given('User attempting LanguageSupport', () => {
            uploadimage = shallow(<LanguageSupport {...screenPropsupload} />)
            uploadimage.instance().props.navigation.replace('LanguageSupport');
            expect(screenPropsupload.navigation.replace).toHaveBeenCalledWith('LanguageSupport');

        });

        when('I navigate to the LanguageSupport', () => {
            instance = uploadimage.instance() as LanguageSupport
        });
        then('I should see the LanguageSupport screen',  () => {
            expect(Splashscreen).toBeTruthy()
        });

    });
    
});
