import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Download from "../../src/Download";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        token:
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzMsInR5cGUiOiJlbXBsb3llZSIsImV4cCI6MTY4NTc4OTYzNSwidG9rZW5fdHlwZSI6ImxvZ2luIn0.xWsyTE3uVjflClsXoGLOl2_L3I9AObPGyp-BLToxXy9ET4BdI3E7YRt58HTnPctN3XznnQrTlpzoxh9DhAP3ww",
        reference_id: 2,
        reference_type: "account",
      },
    },
  },
  id: "Download",
};

const feature = loadFeature("./__tests__/features/Download-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Download", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let controller: Download;

    given("I am a User loading Download", () => {
      exampleBlockA = shallow(<Download {...screenProps} />);
      controller = exampleBlockA.instance() as Download;
      expect(exampleBlockA).toBeTruthy(); // This is the assertion for this given step
    });

    when("I navigate to the Download", () => {
      controller = exampleBlockA.instance() as Download;
      expect(exampleBlockA).toBeTruthy();
    });

    then("Download will load with out errors", () => {
      let container = exampleBlockA.findWhere((node) => node.prop("testID") === "downloadListView");
      expect(container).toBeTruthy();

      let requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
      controller.downloadListApiID = requestMessage.messageId;
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
              ],
            },
          },
        },
      });
      runEngine.sendMessage("Unit Test", requestMessage);

      let requestMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage));
      requestMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage1.messageId);
      controller.downloadListApiID = requestMessage1.messageId;
      requestMessage1.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        error: "eed",
      });
      runEngine.sendMessage("Unit Test", requestMessage1);
    });

    then("Download FlatList Component will render without errors", () => {
      let flatList = exampleBlockA.findWhere((node) => node.prop("testID") === "filesFlatList");

      flatList.renderProp("renderItem")({
        item: { id: 123, name: "dsff", downloaded_at: "defe" },
      });

      const item = flatList.renderProp("renderItem")({
        item: { id: 123, name: "dsff", downloaded_at: "defe" },
      });

      item.findWhere((node) => node.prop("testID") === "downloadFileId-123").simulate("press");
      const keyFlatListDownloadList = exampleBlockA
        .findWhere((node) => node.prop("testID") === "filesFlatList")
        .props()
        .keyExtractor({ id: 3 });

      expect(keyFlatListDownloadList).toEqual("3");
    });

  });
});
