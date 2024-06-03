import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import React from "react";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FileAttachmentUpload from "../../src/FileAttachmentUpload";

const navigation = require("react-navigation");
global.FormData = require("react-native/Libraries/Network/FormData");

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
  uploadData: {
    data: {
      data: {
        id: "9",
        type: "file_attachment",
        attributes: {
          name: "Screenshot",
          description: "E-services and services ",
          embeded_code: "789789",
          tag: "work on File Attachment",
          content_type: "jpg",
          thumnail: "status ",
          is_active: true,
          created_at: "2023-03-20T08:34:59.872Z",
          updated_at: "2023-03-20T08:34:59.878Z",
          created_by: 6,
          url: "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/0sfjpfec1o4ks8gasb3wg3zj2uvp?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202023-03-18%20at%203.03.58%20PM.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202023-03-18%2520at%25203.03.58%2520PM.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230320%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230320T083501Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9ccf65a4bae473423e8be5d9f088a05390684c0fa68d17d9193eb3569a7b8c88",
        },
      },
    },
  },
};

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        token: "dd",
      },
    },
  },
  id: "FileAttachment",
};

const screenProps1 = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        isEdit: true,
        description: "des",
        tag: "tag",
        token: "dd",
      },
    },
  },
  id: "FileAttachment",
};
const response = {
  fileCopyUri:
    "file:/data/user/0/com.b21KSharedServicesINR/files/aeb43790-6875-422b-8713-247baf95be07/download_Screenshot%202023-03-18%20at%203.02.06%20PM.png",
  name: "download_Screenshot 2023-03-18 at 3.02.06 PM.png",
  size: 99321,
  type: "image/png",
  uri: "content://com.android.providers.downloads.documents/document/msf%3A1000000107",
};

const feature = loadFeature(
  "./__tests__/features/FileAttachmentUpload-scenario.feature",
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

    let instance: FileAttachmentUpload;
    let instance1: FileAttachmentUpload;

    given("I am a User loading FileAttachment", () => {
      component = shallow(<FileAttachmentUpload {...screenProps} />);
      component1 = shallow(<FileAttachmentUpload {...screenProps1} />);
    });

    when("I navigate to the FileAttachment", () => {
      instance = component.instance() as FileAttachmentUpload;
      instance1 = component1.instance() as FileAttachmentUpload;

      instance.setState({
        descInputValue: "",
        tagInputValue: "",
        selectedDocumentType: "doc",
        isUploading: false,
        token: "dd",
      });

      instance1.setState({
        descInputValue: "des",
        tagInputValue: "tag",
        selectedDocumentType: "doc",
        isUploading: false,
        token: "dd",
      });
    });

    then("FileAttachment will load with out errors", () => {
      let container = component.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container).toBeTruthy();
      expect(instance.state.descInputValue).toBe("");
      expect(instance.state.tagInputValue).toBe("");
      expect(instance.state.token).toBe("dd");

      let container1 = component1.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container1).toBeTruthy();
      expect(instance1.state.descInputValue).toBe("des");
      expect(instance1.state.tagInputValue).toBe("tag");
      expect(instance1.state.token).toBe("dd");

      let FileAttachView = component.findWhere(
        (node) => node.prop("testID") === "FileAttachView",
      );
      expect(FileAttachView).toBeTruthy();

      let FileUploadView = component1.findWhere(
        (node) => node.prop("testID") === "FileUploadView",
      );
      expect(FileUploadView).toBeTruthy();

      jest.spyOn(instance, "fileUploadUpdate");

      instance.setState({ descInputValue: "d", tagInputValue: "dd" });

      component
        .findWhere((node) => node.prop("testID") === "fileAttach")
        .simulate("press");
      expect(instance.fileUploadUpdate).toHaveBeenCalled();

      instance.setState({ isUploading: true });
      component
        .findWhere((node) => node.prop("testID") === "fileAttach")
        .simulate("press");
      expect(instance.fileUploadUpdate).toHaveBeenCalled();

      component1
        .findWhere((node) => node.prop("testID") === "fileUpdate")
        .simulate("press");
      expect(instance.fileUploadUpdate).toHaveBeenCalled();

      instance.setState({ isUploading: true });
      component1
        .findWhere((node) => node.prop("testID") === "fileUpdate")
        .simulate("press");
      instance.doButtonPressed()
      expect(instance.fileUploadUpdate).toHaveBeenCalled();

      component
        .findWhere((node) => node.prop("testID") === "descInput")
        .simulate("changeText", "abc");
      expect(instance.state.descInputValue).toBe("abc");

      component
        .findWhere((node) => node.prop("testID") === "tagInput")
        .simulate("changeText", "123");
      expect(instance.state.tagInputValue).toBe("123");

      instance.onConvertFormData(response);
      instance.fileUploadUpdate(["doc"], false);

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
        mock.uploadData,
      );
      runEngine.sendMessage("Unit Test", requestMessage1);

      instance.onConvertFormData(response);
      instance.fileUploadUpdate(["doc"], true);

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
        .findWhere((node) => node.prop("testID") === "fileTypePicker")
        .simulate("valueChange", "mp4");
      expect(instance.state.selectedDocumentType).toBe("mp4");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
