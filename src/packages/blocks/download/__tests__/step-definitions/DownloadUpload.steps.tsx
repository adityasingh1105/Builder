import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DownloadUpload from "../../src/DownloadUpload";

global.FormData = require("react-native/Libraries/Network/FormData");

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
  id: "DownloadUpload",
};

const feature = loadFeature("./__tests__/features/DownloadUpload-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DownloadUpload", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let controller: DownloadUpload;

    given("I am a User loading DownloadUpload", () => {
      exampleBlockA = shallow(<DownloadUpload {...screenProps} />);
      controller = exampleBlockA.instance() as DownloadUpload;
      expect(exampleBlockA).toBeTruthy();
    });

    when("I navigate to the DownloadUpload", () => {
      controller = exampleBlockA.instance() as DownloadUpload;
      expect(exampleBlockA).toBeTruthy();
    });

    then("DownloadUpload will load with out errors", () => {

      let requestMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage));
      requestMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage1.messageId);
      controller.firstTokenApiCallID = requestMessage1.messageId;
      requestMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: ["error message"] });
      requestMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: {
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzMsInR5cGUiOiJlbXBsb3llZSIsImV4cCI6MTY4NTc4OTYzNSwidG9rZW5fdHlwZSI6ImxvZ2luIn0.xWsyTE3uVjflClsXoGLOl2_L3I9AObPGyp-BLToxXy9ET4BdI3E7YRt58HTnPctN3XznnQrTlpzoxh9DhAP3ww",
          refresh_token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzMsInR5cGUiOiJlbXBsb3llZSIsImV4cCI6MTcxNzMyNTYzNSwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.0f2a9S4chOxH0ShHTp0chRZIcZ0zK602MQ9-Koui5Iz-RkIcEhSzoYo5clpCc0FOCjhkmIUEizpVy5-NOL2t5g",
          id: 73,
        },
      });
      runEngine.sendMessage("Unit Test", requestMessage1);

      let requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
      controller.fileUploadApiID = requestMessage.messageId;
      requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        downloadable: {
          data: {
            id: "5",
            type: "downloadables",
            attributes: {
              id: 5,
              reference_id: 2,
              reference_type: "account",
              last_download_at: "2023-06-02T09:26:41.923Z",
              files: [
                {
                  id: 1583,
                  name: "6Tpo6G8TE.jpg",
                  downloaded_at: "2023-04-28T10:04:34.475Z",
                },
                {
                  id: 1584,
                  name: "abcd.jpg",
                  downloaded_at: "2023-04-21T07:52:53.477Z",
                },
              ],
            },
          },
        },
        message: "File/s uploaded successfully.",
      });
      runEngine.sendMessage("Unit Test", requestMessage);

      exampleBlockA.findWhere((node) => node.prop("testID") === "btnUploadFile").simulate("press");
     

      exampleBlockA.findWhere((node) => node.prop("testID") === "btnNavigatetoList").simulate("press");
      expect(controller.state.loader).toBe(true);
    });

    then("I can change Refrence ID text input value without errors", () => {
      exampleBlockA.findWhere((node) => node.prop("testID") === "refrenceIDtxtInput").simulate("changeText", "123");
      expect(controller.state.reference_id).toBe(123);
    });
    then("I can change Refrence Type text input value without errors", () => {
      exampleBlockA.findWhere((node) => node.prop("testID") === "refrenceTypetxtInput").simulate("changeText", "abc");
      expect(controller.state.reference_type).toBe("abc");
    });

  });
});
