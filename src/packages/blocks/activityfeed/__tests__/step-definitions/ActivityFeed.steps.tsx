import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";
import ActivityFeed from "../../src/ActivityFeed";
import { Platform } from "react-native";

const mockDataObj = require("../../assets/mockData.js").default;
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockDataObj),
  })
) as jest.Mock;

const navigation = require("react-navigation");

const screenProps = {
  navigation,
  id: "activity-feed",
};

const feature = loadFeature(
  "./__tests__/features/activity-feed-scenario.feature"
);

jest.mock("react-navigation", () => ({}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to ActivityFeed", ({ given, when, then }) => {
    let activityFeed: ShallowWrapper;
    let instance: ActivityFeed;

    given("I am a User loading ActivityFeed", () => {
      activityFeed = shallow(<ActivityFeed {...screenProps} />);
    });

    when("I navigate to the ActivityFeed", () => {
      instance = activityFeed.instance() as ActivityFeed;

      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData), JSON.stringify({ meta: { id: 1 } }));
      runEngine.sendMessage("Unit Test", msgToken);


      const getActivitiesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getActivitiesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getActivitiesAPI.messageId
      );

      getActivitiesAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockDataObj,
      );

      instance.getActivityApiCallId = getActivitiesAPI.messageId;
      runEngine.sendMessage("Unit Test", getActivitiesAPI);
    });

    then("ActivityFeed will load without errors", () => {
      expect(activityFeed).toBeTruthy();
    });

    then("activity feed list is rendered", () => {
      const activityList = activityFeed.findWhere(
        (node) => node.prop("testID") === "activityList"
      );
      activityList.simulate("endReached");
      activityList.props().renderItem({item: mockDataObj.activities[0]});
      activityList.props().keyExtractor(mockDataObj.activities[0]);
    });

    then("I can select dropdown without errors", () => {
      const picker = activityFeed.findWhere(
        (node) => node.prop("testID") === "picker"
      );
      picker.simulate('valueChange', 'test');
      Platform.OS = 'android';
      instance.render();
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(activityFeed).toBeTruthy();
    });
  });
});
