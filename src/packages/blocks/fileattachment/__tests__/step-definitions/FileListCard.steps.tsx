import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import React from "react";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FileListCard from "../../src/FileListCard";
import { Platform } from "react-native";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "FileAttachment",
  data: {
    id: "82",
    type: "file_attachment",
    attributes: {
      name: "Screenshot 2023-02-23 at 8.32.27 PM.png",
      description: "hhh",
      embedded_code: "43555241",
      tag: "work on file attachment",
      content_type: "jpg",
      thumbnail: "current",
      is_active: true,
      created_at: "2023-03-02T09:56:10.841Z",
      updated_at: "2023-03-02T11:14:39.888Z",
      created_by: 21,
      url: "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/dzvyqfdto3zmzbijhwxv8c7ip8g3?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202023-02-23%20at%208.32.27%20PM.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202023-02-23%2520at%25208.32.27%2520PM.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230306%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230306T064038Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=87bbc183ec61198d91c21a25d840ca24231ff67be6d2028f8ee21b3c1fdcaf2d",
    },
  },
  token: "sting",
  refresh: jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/FileListCard-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to FileAttachment", ({ given, when, then }) => {
    let component: ShallowWrapper;

    let instance: FileListCard;

    given("I am a User loading FileAttachment", () => {
      component = shallow(<FileListCard {...screenProps} />);
    });

    when("I navigate to the FileAttachment", () => {
      instance = component.instance() as FileListCard;
      Platform.OS = "android";
      instance.setState({
        isDownloaded: false,
        isDownloading: false,
        downloadedFilePath: "",
      });
    });

    then("FileAttachment will load with out errors", () => {
      let container = component.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container).toBeTruthy();

      jest.spyOn(instance, "deleteFile");
      jest.spyOn(instance, "downloadFile");
      jest.spyOn(instance, "editFile");
      jest.spyOn(instance, "checkPermission");
      jest.spyOn(instance, "viewClick");

      let requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId,
      );
      instance.deleteAttachedFile = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: ["error message"] },
      );
      runEngine.sendMessage("Unit Test", requestMessage);
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "File Attachment deleted." },
      );
      runEngine.sendMessage("Unit Test", requestMessage);
      expect(instance.props.refresh).toHaveBeenCalled();

      component
        .findWhere((node) => node.prop("testID") === "deleteButton")
        .simulate("press");
      instance.downloadFile();
      expect(instance.deleteFile).toHaveBeenCalled();

      component
        .findWhere((node) => node.prop("testID") === "downloadViewButton")
        .simulate("press");
      expect(instance.checkPermission).toHaveBeenCalled();
      instance.setState({ isDownloaded: true });

      component
        .findWhere((node) => node.prop("testID") === "downloadViewButton")
        .simulate("press");
      expect(instance.viewClick).toHaveBeenCalled();

      component
        .findWhere((node) => node.prop("testID") === "editButton")
        .simulate("press");
      expect(instance.editFile).toHaveBeenCalled();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
