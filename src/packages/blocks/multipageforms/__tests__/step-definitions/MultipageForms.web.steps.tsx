import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";

import MultipageForms from "../../src/MultipageForms.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "MultipageForms",
};

const feature = loadFeature(
  "./__tests__/features/MultipageForms-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(global.Storage.prototype, 'setItem');
    jest.spyOn(global.Storage.prototype, 'getItem');
    global.Storage.prototype.setItem = jest.fn();
    global.Storage.prototype.getItem = jest.fn();
  });

  test("User navigates to MultipageForms", ({ given, when, then }) => {
    let multiPageBlock: any;
    let instance: any;

    function checkFormikInputField(fieldName: any, defaultinputvalue: string, errorMsg: any, dataTestId: any) {
      return multiPageBlock
        .find("Formik")
        .renderProp("children")({
          values: {
            [fieldName]: defaultinputvalue
          }, errors: {
            [fieldName]: errorMsg
          },
          touched: {
            [fieldName]: true
          }, setFieldValue: jest.fn()
        }).children().find(dataTestId);
    }

    given("I am a User loading MultipageForms", () => {
      multiPageBlock = shallow(<MultipageForms {...screenProps} />);
      expect(multiPageBlock).toBeTruthy();
    });

    when("I navigate to the MultipageForms", () => {
      instance = multiPageBlock.instance() as MultipageForms;
      expect(multiPageBlock).toBeTruthy();
    });

    then("MultipageForms will load with out errors", () => {
      expect(multiPageBlock).toBeTruthy();
      multiPageBlock.setState({"token_local":"djhgfdjgdfhgjdfggf"})
    });

    then("Check textfield onChange method", () => {

      const inputFirstName = checkFormikInputField("first_name", "Raj", "First Name is required", "[data-test-id='txtInputfirstname']");
      inputFirstName.simulate("change", { target: { value: "Raj" } });      

      const inputLastName = checkFormikInputField("last_name", "Raj", "Last Name is required", "[data-test-id='txtInputlasttname']");
      inputLastName.simulate("change", { target: { value: "Raj" } });

      const inputemail = checkFormikInputField("email", "Raj@mailinator.com", "Email is required", "[data-test-id='txtInputemail']");
      inputemail.simulate("change", { target: { value: "Raj@mailinator.com" } });

      const inputCountryPhonenumber = checkFormikInputField("selectedPhoneCountry", "+93", "Phone Number is required", "[data-test-id='txtInputCountryPhonenumber']");
      inputCountryPhonenumber.simulate("change", { target: { value: "+93" } });

      const inputphonenumber = checkFormikInputField("phone_number", "9876543456", "Phone Number is required", "[data-test-id='txtInputphonenumber']");
      inputphonenumber.simulate("change", { target: { value: "9876543456" } });
      
      expect(multiPageBlock).toBeTruthy();
    });

    then("Check formik onSubmit method", () => {
      const onSubmitMethod =
        multiPageBlock
          .find("Formik")
      onSubmitMethod.simulate("submit");
      expect(multiPageBlock).toBeTruthy();
    });

    then('I can click back with out errors', () => {

      const backBtnMethod = multiPageBlock
        .find("Formik")
        .renderProp("children")({ values: {}, errors: {}, setFieldValue: jest.fn(), touched: {}, handleSubmit: jest.fn() }).find('[data-test-id="backButton"]');
      multiPageBlock.setState({ formikData: { email: "sda@ads.com" } })
      backBtnMethod.simulate("click");

      const onSubmitMethod =
        multiPageBlock
          .find("Formik")
      onSubmitMethod.simulate("submit", { values: { first_name: "Raj", last_name: "Jack", email: "raj@mailinator.com", selectedPhoneCountry: "+91", phone_number: "9878987656" } });
      expect(multiPageBlock).toBeTruthy();
    });

    then('I can enter text with out errors', () => {
      
      const inputCountry = checkFormikInputField("selectedCountry", "1", "Country is required", "[data-test-id='txtInputCountry']");
      inputCountry.simulate("change", { target: { value: "1" } });

      const inputIndustry = checkFormikInputField("selectedIndustry", "education", "Industry is required", "[data-test-id='txtInputIndustry']");
      inputIndustry.simulate("change", { target: { value: "education" } });

      const inputGender = checkFormikInputField("selectedGender", "1", "Gender is required", "[data-test-id='txtInputGender']");
      inputGender.simulate("change", { target: { value: "1" } });
      
      const inputMessage = checkFormikInputField("message", "Raj is testing", "Message is required", "[data-test-id='txtInputMessage']");
      inputMessage.simulate("change", { target: { value: "Raj is testing" } });
      expect(multiPageBlock).toBeTruthy();
    });

    then("I can click submit button with out errors", () => {
      const onSubmitMethod =
        multiPageBlock
          .find("Formik")
      onSubmitMethod.simulate("submit", {  selectedCountry: "1", selectedIndustry: "education", selectedGender: "1", message: "Raj is testing"  });
     
      const addAddressListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      addAddressListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
           
              "id": "107",
              "type": "user_profile",
              "attributes": {
                  "id": 107,
                  "first_name": "testname1",
                  "last_name": "testlastname1",
                  "phone_number": "+91 9999999999",
                  "email": "test1@gmail.com",
                  "gender": "male",
                  "country": "india",
                  "industry": "marketing",
                  "message": "this is my message"
              }
            }
        
        }
      );
      instance.getOrderApiCallId = addAddressListAPI.messageId;
      runEngine.sendMessage("Unit Test", addAddressListAPI);
      expect(multiPageBlock).toBeTruthy();
    });   
    
    
    
  });
});
