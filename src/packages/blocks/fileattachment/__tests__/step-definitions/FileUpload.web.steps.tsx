import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import FileUpload from "../../src/FileUpload.web";
import PreviewModal from "../../src/Preview";
const navigation = require("react-navigation");

const mock = {
  loginData: {
    meta: {
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NSwiZXhwIjoxNjcyOTg1Njg5LCJ0b2tlbl90eXBlIjoibG9naW4ifQ.LmeUOMT22oKcEogY_yDS9G0WFyM-LrTrNgEiwrIShhTZPuoA_D3rJ_7EQDnuqbUgPHt84XddQdc91dJY4USrvw",
      refresh_token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NSwiZXhwIjoxNzA0NDM1Mjg5LCJ0b2tlbl90eXBlIjoicmVmcmVzaCJ9.mvkCWDPW332l2o8wpUPZLIgkz67bzw0-0bBSqzSjF0nbx33LmpNQRNfqNst5AcNGCHL7sdsQXG3X1gld_hvs_w",
      id: 5,
    },
  },
};

const screenProps = {
  navigation: navigation,
  id: "FileAttachment",
};

const screenProps1 = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        isEdit: true,
      },
    },
  },
  id: "FileAttachment",
};

const feature = loadFeature(
  "./__tests__/features/FileAttachmentUpload-scenario.web.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to FileAttachment", ({ given, when, then }) => {
    let component: ShallowWrapper;
    let component1: ShallowWrapper;
    global.URL.createObjectURL = jest.fn();

    let instance: FileUpload;
    let instance1: FileUpload;

    given("I am a User loading FileAttachment", () => {
      component = shallow(<FileUpload {...screenProps} />);
      component1 = shallow(<FileUpload {...screenProps1} />);
    });

    when("I navigate to the FileAttachment", () => {
      instance = component.instance() as FileUpload;
      instance1 = component1.instance() as FileUpload;

      instance.setState({
        descInputValue: "desc",
        tagInputValue: "tag",
        selectedDocumentType: "doc",
        isUploading: false,
        file: "",
      });
      instance1.setState({
        descInputValue: "desc",
        tagInputValue: "tag",
        selectedDocumentType: "doc",
        isUploading: false,
        file: "",
      });
    });

    then("FileAttachment will load with out errors", () => {
      let container = component.findWhere(
        (node) => node.prop(" data-test-id") === "scrollView",
      );
      expect(container).toBeTruthy();

      jest.spyOn(instance, "fileUploadUpdate");

      let file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });
      component
        .findWhere((node) => node.prop("data-test-id") === "fileAttach")
        .simulate("change", { target: { files: [file] } });

      component1
        .findWhere((node) => node.prop("data-test-id") === "viewUploadBtn")
        .simulate("click");

      instance.setState({ selectedDocumentType: "pdf" });
      component
        .findWhere((node) => node.prop("data-test-id") === "viewUploadBtn")
        .simulate("click");

      component1
        .findWhere((node) => node.prop("data-test-id") === "sendButton")
        .simulate("click");

      component
        .findWhere((node) => node.prop("data-test-id") === "sendButton")
        .simulate("click");

      component
        .findWhere((node) => node.prop("data-test-id") === "chooseFileBtn")
        .simulate("click");

      window.localStorage.setItem("isEdit", "true");

      component
        .findWhere((node) => node.prop("data-test-id") === "sendButton")
        .simulate("click");

      instance.setState({ file: "filename" });

      component
        .findWhere((node) => node.prop("data-test-id") === "sendButton")
        .simulate("click");

      component
        .findWhere((node) => node.prop("data-test-id") === "descInput")
        .simulate("change", { target: { value: "abc" } });
      expect(instance.state.descInputValue).toBe("abc");

      component
        .findWhere((node) => node.prop("data-test-id") === "tagInput")
        .simulate("change", { target: { value: "abc" } });
      expect(instance.state.tagInputValue).toBe("abc");

      let requestMessage1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      requestMessage1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage1.messageId,
      );
      instance.fileUploadCallId = requestMessage1.messageId;
      requestMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: ["error message"] },
      );
      runEngine.sendMessage("Unit Test", requestMessage1);
      requestMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mock.loginData,
      );
      runEngine.sendMessage("Unit Test", requestMessage1);

      let requestMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage2.messageId,
      );
      instance1.fileUpdateCallId = requestMessage2.messageId;
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: ["error message"] },
      );
      runEngine.sendMessage("Unit Test", requestMessage2);
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mock.loginData,
      );
      runEngine.sendMessage("Unit Test", requestMessage2);

      component
        .findWhere((node) => node.prop("data-test-id") === "fileTypePicker")
        .simulate("change", { target: { value: "mp4" } });
      expect(instance.state.selectedDocumentType).toBe("mp4");
    });

    then("I can click close modal", () => {
      component.find(PreviewModal).invoke("onClose")();
      expect(component).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
