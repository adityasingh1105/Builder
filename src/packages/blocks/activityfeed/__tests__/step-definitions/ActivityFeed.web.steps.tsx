import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ActivityFeed from "../../src/ActivityFeed.web";

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
  "./__tests__/features/activity-feed-scenario.web.feature"
);

jest.mock("react-navigation", () => ({}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
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
      msgToken.addData(getName(MessageEnum.SessionResponseData), JSON.stringify({meta:{id:1}}));
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

    then("I can press load more button without errors", () => {
      const loadMoreButton = activityFeed.findWhere(
        (node) => node.prop("id") === "loadMoreButton"
      );
      loadMoreButton.simulate('click');
    })

    then("I can select dropdown without errors", () => {
      const selectInput = activityFeed.find("select");
      selectInput.simulate("change", { target: { value: "Hello" } });
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(activityFeed).toBeTruthy();
    });
  });
});
