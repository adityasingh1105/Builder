/**
 * @jest-environment jsdom
 */

import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
const NavUserFeature = loadFeature(
    "./__tests__/features/WelcomeScreen-scenario.web.feature"
);
import { WelcomeScreen } from "../../src/WelcomeScreen.web";
import * as helpers from "../../../../framework/src/Helpers";
const StepscreenProps = {
navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {

        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn()
    },
    identifiable: "WelcomeScreen",
};
defineFeature(NavUserFeature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    });
test("User navigates to WelcomeScreen", ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;

        //@ts-ignore 
let instance: WelcomeScreen;

        given("I am a User loading WelcomeScreen", () => {
            //@ts-ignore 

            exampleBlockA = shallow(<WelcomeScreen tReady={false} {...StepscreenProps} />);

        });
        when("I navigate to the WelcomeScreen", () => {
            //@ts-ignore 
            instance = exampleBlockA.instance() as WelcomeScreen;

        });
then('I can select the Submit button with out errors', () => {
            exampleBlockA.findWhere(
                (node) => node.prop("data-test-id") === "btnstart"
            );
        });

        then("I can click the language button with with out the errors", () => {
            exampleBlockA.findWhere(
                (node) => node.prop("data-test-id") === "btnCheck"
        
          );     
          instance.handleChangeLanguage("En")
        });

        then("I can click the French language button with with out the errors", () => {
            exampleBlockA.findWhere(
                (node) => node.prop("data-test-id") === "btnFrench"
);     
          instance.handleChangeLanguage("Fr")
        });
then("I can leave the screen with out errors", () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });
});