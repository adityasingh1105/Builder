import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TextComparison from "../../src/TextComparison.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TextComparison",
};

const feature = loadFeature(
  "./__tests__/features/TextComparison-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TextComparison", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: TextComparison;

    given("I am a User loading TextComparison", () => {
      exampleBlockA = shallow(<TextComparison {...screenProps} />);
    });

    when("I navigate to the TextComparison", () => {
      instance = exampleBlockA.instance() as TextComparison;
    });

    then("TextComparison will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtLeft"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com\nA" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtRight"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com\nA" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
