//@ts-nocheck
/**
 * @jest-environment jsdom
 */

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { beforeEach, expect, jest } from '@jest/globals'
import PhoneVerification from "../../src/PhoneVerification.web";
import React from "react"
const navigation = require("react-navigation");
const featureNav = loadFeature(
  "./__tests__/features/PhoneVerification-scenario.web.feature"
);

const NavigscreenProps = {
  navigation: navigation,
  id: "PhoneVerification",
};


defineFeature(featureNav, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PhoneVerification", ({ given, when, then }) => {

    let exampleBlockA: ShallowWrapper;
  
    let instance: PhoneVerification;

    given("I am a User loading PhoneVerification", () => {

      exampleBlockA = shallow(<PhoneVerification  onComplete={function (validateOTP: string): void {
        throw new Error("Function not implemented.");
      }} {...NavigscreenProps} />);

    });

    when("I navigate to the PhoneVerification", () => {
      instance = exampleBlockA.instance() as PhoneVerification;
      instance.handleChange({target:{value:1212121212}});
      instance.setRememberMe(true)
    });

    then("I can enter a Phone Number with out errors", () => {
  const phoneData =   exampleBlockA.find('Formik').dive().findWhere((node)=>node.prop("data-test-id")==='phnumber');
  phoneData.simulate('change', { target: { value: '1234567891' } });
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select checkbox with out errors", () => {
      instance.setRememberMe(true)
      instance.setState({agree:true})
    });
  
    
    then("I can select the Submit button with out errors",() => {
      instance = exampleBlockA.instance() as PhoneVerification;
   const submitBtn =  exampleBlockA.find('Formik').dive().findWhere(
        (node) => node.prop("data-test-id") ==="btnSubmit"       
      );
      submitBtn.simulate('click')
    
    })
    
  });
  

  test("User tries to change language", ({ given, when, then }) => {

    let exampleBlockA: ShallowWrapper;
  
    let instance: PhoneVerification;

    given("Language change dialog is loading", () => {

      exampleBlockA = shallow(<PhoneVerification  onComplete={function (validateOTP: string): void {
        throw new Error("Function not implemented.");
      }} {...NavigscreenProps} />);

    });

    when("I click on language change button", () => {
      instance = exampleBlockA.instance() as PhoneVerification;
      instance.handleStart();
      instance.handleClose();

    });

    then("I can open language dialog",() => {
        instance.handleStart();
        instance.setState({ languageScreen: true })
       })

       then("I can close language dialog",() => {
        instance.handleClose();
        instance.setState({ languageScreen: false })
       })

  })
});