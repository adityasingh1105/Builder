import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";

import React from "react";
import Preview from "../../src/Preview";

const feature = loadFeature("./__tests__/features/Preview-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User opens Preview", ({ given, when, then }) => {
    let component: ShallowWrapper;
    let instance: Preview;

    then("I am a User opening Image", () => {
      component = shallow(
        <Preview mimeType="jpg" onClose={() => 0} visible={true} src={"asd"} />,
      );

      expect(component).toBeTruthy();
    });

    then("I am a User opening pdf", () => {
      component = shallow(
        <Preview mimeType="pdf" onClose={() => 0} visible={true} src={"asd"} />,
      );

      expect(component).toBeTruthy();
    });

    then("I am a User opening Video", () => {
      component = shallow(
        <Preview mimeType="mp4" onClose={() => 0} visible={true} src={"asd"} />,
      );

      expect(component).toBeTruthy();
    });

    then("I am a User opening Audio", () => {
      component = shallow(
        <Preview mimeType="mp3" onClose={() => 0} visible={true} src={"asd"} />,
      );

      expect(component).toBeTruthy();
    });

    then("I am a User Change Visible", () => {
      component = shallow(
        <Preview mimeType="mp3" onClose={() => 0} visible={true} src={"asd"} />,
      );
      component.setProps({ visible: false });

      component
        .findWhere((node) => node.prop("data-test-id") === "contentContainer")
        .simulate("click", {
          preventDefault: () => false,
          stopPropagation: () => false,
        });

      let file = new File(["(⌐□_□)"], "chucknorris.png", {
        type: "image/png",
      });

      component.setProps({ src: file });

      expect(component).toBeTruthy();
    });
  });
});
