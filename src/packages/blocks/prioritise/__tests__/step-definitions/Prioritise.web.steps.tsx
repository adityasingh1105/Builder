import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {expect,jest, beforeEach} from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Prioritise from "../../src/Prioritise.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Prioritise",
};


const responseErrror = {
  "errors": [
    "Record not found"
  ]
}

const postResponse = {

  "data": [
    {
      "id": "2",
      "type": "task",
      "attributes": {
        "name": "Planning",
        "priority": 1,
        "account_id": 321,
        "due_date": "2022-12-11T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "message": "All tasks are updated successfully."
  }

}

const taskData = [{ "id": "2", "name": "Planning", "priority": 0, "priority_type": "High", "is_open": false, "image_uri": "https://i.imgur.com/UYiroysl.jpg", "other_priorities": [{ "priority": 1, "priorityType": "Medium" }, { "priority": 2, "priorityType": "Low" }] }, { "id": "1", "name": "Designing", "priority": 1, "priority_type": "Medium", "is_open": false, "image_uri": "https://i.imgur.com/UYiroysl.jpg", "other_priorities": [{ "priority": 0, "priorityType": "High" }, { "priority": 2, "priorityType": "Low" }] }, { "id": "3", "name": "UI Creation", "priority": 2, "priority_type": "Low", "is_open": false, "image_uri": "https://i.imgur.com/UYiroysl.jpg", "other_priorities": [{ "priority": 0, "priorityType": "High" }, { "priority": 1, "priorityType": "Medium" }] }];


const feature = loadFeature("./__tests__/features/Prioritise-scenario.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Prioritise", ({ given, when, then }) => {
    let PrioritiseBlock: ShallowWrapper;
    let instance: Prioritise;

    given("I am a User loading Prioritise", () => {
      PrioritiseBlock = shallow(<Prioritise {...screenProps} />);
    });

    when("I navigate to the Prioritise", () => {
      instance = PrioritiseBlock.instance() as Prioritise;

    });

    then("Prioritise will load with out errors", () => {
       instance.componentDidMount();
      expect(PrioritiseBlock).toBeTruthy();

      const msgDeviceTokenAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDeviceTokenAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDeviceTokenAPI.messageId
      );
      msgDeviceTokenAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: taskData,
        }
      );
      instance.apiGetTaskData = msgDeviceTokenAPI.messageId;
      runEngine.sendMessage("Unit Test Assessment data", msgDeviceTokenAPI);
      instance.receive("", msgDeviceTokenAPI);

    });

    then("It should render the Loader", () => {
      PrioritiseBlock = shallow(instance.renderLoader());
    });

    then("It should render the EmptyView", () => {
      PrioritiseBlock = shallow(instance.renderEmptyView());
    });

    then("It should render the renderRaw", () => {
      PrioritiseBlock = shallow(instance.renderRaw());
    });

    then("It should handle priority press", async() => {
      instance.setState({taskList:taskData});
      let btnPressPriority = PrioritiseBlock.findWhere(
        (node) => node.prop('id') === 'product_grid'
      );
      expect(btnPressPriority).toBeTruthy()
      let SelectPriority = PrioritiseBlock.findWhere(
        (node) => node.prop('id') === 'select_priority'
      );
      expect(SelectPriority).toBeTruthy()
      instance.onChangeSelect(1,"other");
      instance.onChangeSelect(1,"High");
      instance.onChangeSelect(1,"Medium");
      instance.onChangeSelect(1,"Low");

    });

    then("It should render the Footer", () => {
      PrioritiseBlock = shallow(instance.ListFooter());
    });

    then('user will submit data', () => {
      let submitReview = PrioritiseBlock.findWhere(
        (node) => node.prop('id') === 'btnSaveTestId'
      );

      submitReview.simulate('press');

      const submitReviewApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitReviewApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitReviewApi
      );
      submitReviewApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        postResponse
      );
      submitReviewApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitReviewApi.messageId
      );
      instance.apiUpdateTaskCallId = submitReviewApi.messageId;
      runEngine.sendMessage('Unit Test', submitReviewApi);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(PrioritiseBlock).toBeTruthy();
    });


  });

});
