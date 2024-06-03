// Customizable Area Start
// @ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { expect, jest, beforeEach } from "@jest/globals";
import { Blob } from 'buffer';

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ReceiptCustomisation from "../../src/ReceiptCustomisation.web";
const navigation = require("react-navigation");
global.FormData = require('react-native/Libraries/Network/FormData');

const screenProps = {
  navigation: navigation,
  id: "ReceiptCustomisation",
};

const mockResponseData = {
  "data": {
    "id": "186",
    "type": "receipt",
    "attributes": {
      "first_name": "Test",
      "last_name": "User",
      "email": "test@yopmail.com",
      "address": "rohtak",
      "phone": "9898989898",
      "country": "india",
      "state": "haryana",
      "city": "rohtak",
      "postal": "131001",
      "images": null,
      "logo": null,
      "documents": null
    }
  }
}

const feature = loadFeature(
  "./__tests__/features/ReceiptCustomisation-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ReceiptCustomisation", ({ given, when, then }) => {
    let ReceiptCustomisationBlock: ShallowWrapper;
    let instance: ReceiptCustomisation;

    given("I am a User loading ReceiptCustomisation", () => {
      ReceiptCustomisationBlock = shallow(
        <ReceiptCustomisation {...screenProps} />
      );
    });

    when("I navigate to the ReceiptCustomisation", () => {
      instance = ReceiptCustomisationBlock.instance() as ReceiptCustomisation;
    });

    then("ReceiptCustomisation will load with out errors", () => {
      expect(ReceiptCustomisationBlock).toBeTruthy();
    });

    then("I can enter firstName text with out errors", () => {
      let textInputComponent = ReceiptCustomisationBlock.findWhere(
        (node) => node.prop("data-test-id") === "txtInputFirstName"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can enter lastName text with out errors", () => {
      let textInputComponent = ReceiptCustomisationBlock.findWhere(
        (node) => node.prop("data-test-id") === "txtInputLastName"
      );
      const event = {
        preventDefault() {},
        target: { value: "test" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can select the button with out errors", () => {
      let buttonComponent = ReceiptCustomisationBlock.findWhere(
        (node) => node.prop("data-test-id") === "submitButton"
      );
      buttonComponent.simulate("click");
      expect(ReceiptCustomisationBlock).toBeTruthy();
    });

    then("I can select logo with out errors", () => {
      instance.handleSelectLogo({
        target: { files: [] }
      });
    });
    
    then("I can delete logo with out errors", () => {
      instance.setState({
        logo: null,
        isLogoSelected: false
      });
      instance.handleDeleteLogo();
    });

    then("I can delete logo", () => {
      const blob = new Blob(["testing"], { type: "application/pdf" });
      instance.setState({
        logo: blob
      });
    });

    then("I can select documents with out errors", () => {
      instance.handleSelectDocument({
        target: { files: [] }
      });
    });

    then("I can delete documents with out errors", () => {
      const blob = new Blob(["testing"], { type: "application/pdf" });
      instance.setState({
        documents: [
          blob
        ]
      });
      let document = ReceiptCustomisationBlock.findWhere(
        (node) => node.prop("data-test-id") === "deleteDocument"
      );
      document.simulate("click");
    });

    then("I can select image with out errors", () => {
      instance.handleSelectImage({
        target: { files: [] }
      });
    });

    then("I can delete image with out errors", () => {
      const blob = new Blob(["testing"], { type: "application/pdf" });
      instance.setState({
        images: [
          blob
        ]
      });
      let image = ReceiptCustomisationBlock.findWhere(
        (node) => node.prop("data-test-id") === "deleteImage"
      );
      image.simulate("click");
    });

    then("If got success response from server", () => {
      const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.receive("", msgValidationAPI);
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        mockResponseData
      });
      instance.receive("", msgValidationAPI);
      instance.receiptCustomisationApiCallId = msgValidationAPI.messageId
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.receiptCustomisation();
    });

    then("If got error response from server", () => {
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(getName(MessageEnum.RestAPIResponceDataMessage), message);
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {

        }
      });

      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );

      instance.receiptCustomisationApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
    });

    then("Receive function response and error testing", () => {
      const error = new Message(getName(MessageEnum.RestAPIResponceMessage))
      error.addData(getName(MessageEnum.RestAPIResponceDataMessage), error.messageId);
      error.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "errors": [{
          "Invalid": "Data not found"
        }]
      });
      instance.receiptCustomisationApiCallId = error.messageId;
      runEngine.sendMessage("Unit Test", error);
    });
    
    then("If there is no errors this will execute", () => {
      instance.validateFormData({
        first_name: "Hello",
        last_name: "Hello",
        email: "Hello@gmail.com",
        phone: "123",
        country: "Hello",
        state: "Hello",
        city: "Hello",
        postal: "433",
        address: "Hello",
      });
      instance.receiptCustomisation();
    });

    then("If got errors this will execute", () => {
      instance.validateFormData({
        first_name: "123",
        last_name: "123",
        email: "hello",
        phone: "hello",
        country: "123",
        state: "123",
        city: "123",
        postal: "hello",
        address: "123",
      });
    });
  });
});

// Customizable Area End
