import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import FileAttachmentList from "../../src/FileAttachmentList.web";
import FileListCard from "../../src/FileListCard.web";
import PreviewModal from "../../src/Preview";

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
  attachedFileList: {
    date: {
      data: [
        {
          id: "82",
          type: "file_attachment",
          attributes: {
            name: "Screenshot 2023-02-23 at 8.32.27 PM.png",
            description: "hhh",
            embeded_code: "43555241",
            tag: "work on file attachment",
            content_type: "jpg",
            thumnail: "current",
            is_active: true,
            created_at: "2023-03-02T09:56:10.841Z",
            updated_at: "2023-03-02T11:14:39.888Z",
            created_by: 21,
            url: "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/dzvyqfdto3zmzbijhwxv8c7ip8g3?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202023-02-23%20at%208.32.27%20PM.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202023-02-23%2520at%25208.32.27%2520PM.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230306%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230306T064038Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=87bbc183ec61198d91c21a25d840ca24231ff67be6d2028f8ee21b3c1fdcaf2d",
          },
        },
        {
          id: "85",
          type: "file_attachment",
          attributes: {
            name: "file_example_MOV_1920_2_2MB.mov",
            description: "vr",
            embeded_code: "66190506",
            tag: "grg",
            content_type: "mp4",
            thumnail: "current",
            is_active: true,
            created_at: "2023-03-03T10:04:47.256Z",
            updated_at: "2023-03-03T10:04:47.274Z",
            created_by: 21,
            url: "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/ym6fh5zrn75g0bev071boacnc0z0?response-content-disposition=attachment%3B%20filename%3D%22file_example_MOV_1920_2_2MB.mov%22%3B%20filename%2A%3DUTF-8%27%27file_example_MOV_1920_2_2MB.mov&response-content-type=video%2Fquicktime&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230306%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230306T064038Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b79929620097b61184c4c79db021f9197d80e834c7ec92ff1d7490d7117b9efa",
          },
        },
      ],
    },
  },
};

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "FileAttachmentList",
  route: {
    params: {},
  },
};

const cardProps = {
  data: {
    id: "",
    type: "",
    attributes: {
      name: "",
      description: "",
      embeded_code: "",
      tag: "",
      content_type: "",
      thumnail: "",
      is_active: false,
      created_at: "",
      updated_at: "",
      created_by: 0,
      url: "",
    },
  },
  navigation: {},
  token: "",
  refresh: () => 0,
};

const feature = loadFeature(
  "./__tests__/features/FileAttachmentList-scenario.web.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to FileAttachmentList", ({ given, when, then }) => {
    let component: ShallowWrapper;
    let cardComponent: ShallowWrapper;
    let instance: FileAttachmentList;
    let cardInstance: FileListCard;

    given("I am a User loading FileAttachmentList", () => {
      component = shallow(<FileAttachmentList {...screenProps} />);
    });

    when("I navigate to the FileAttachmentList", () => {
      instance = component.instance() as FileAttachmentList;
      instance.setState({
        token: "",
        uploadedFileList: [],
      });
      jest.spyOn(instance, "login");
    });

    then("FileAttachmentList will load with out errors", () => {
      let container = component.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container).toBeTruthy();

      instance.componentDidMount();
      expect(instance.login).toHaveBeenCalled();

      let requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId,
      );
      instance.listApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: ["error message"] },
      );
      runEngine.sendMessage("Unit Test", requestMessage);
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mock.loginData,
      );
      runEngine.sendMessage("Unit Test", requestMessage);
      component
        .findWhere((node) => node.prop("data-test-id") === "navTo")
        .simulate("click");

      expect(instance.props.navigation.navigate).toBeCalledWith(
        "FileAttachmentUpload",
      );

      cardComponent = shallow(
        <FileListCard
          {...cardProps}
          onClick={() => instance.handlePreviewModalOpen(cardProps.data)}
        />,
      );
      cardInstance = cardComponent.instance() as FileListCard;
      cardInstance.onViewClick();

      let requestMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage2.messageId,
      );
      instance.attachedFileList = requestMessage2.messageId;
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: ["error message"] },
      );
      runEngine.sendMessage("Unit Test", requestMessage2);
      requestMessage2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mock.attachedFileList,
      );
      runEngine.sendMessage("Unit Test", requestMessage2);
    });

    then("I can click close modal", () => {
      component.find(PreviewModal).invoke("onClose")();
      expect(component).toBeTruthy();
    });

    then("I can click onClick of component", () => {
      const fileListCardComponent = component.find(FileListCard).first();
      if (fileListCardComponent) {
        fileListCardComponent?.invoke?.("onClick")?.();
      }
      expect(component).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
