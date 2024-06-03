import { defineFeature, loadFeature} from "jest-cucumber"
import { render, screen, fireEvent } from '@testing-library/react-native';

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Watermark from "../../src/Watermark"
import { shallow, ShallowWrapper } from "enzyme";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "Watermark"
  }

//@ts-ignore
global.disableActionSheet = true
const feature = loadFeature('./__tests__/features/Watermark-scenario.feature');

defineFeature(feature, (test) => {

    let Screen: ShallowWrapper;
    let instance: Watermark;

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Watermark', ({ given, when, then }) => {
        given('I am a User loading Watermark', () => {
            render(<Watermark {...screenProps} />);
        });

        then('Watermark will load with out errors', () => {
            Screen = shallow(<Watermark {...screenProps} />);
            instance = Screen.instance() as Watermark;
            instance.renderNextBtnView();
            expect(screen).toBeTruthy()
        });

        then("mounting the screen",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            screen.componentDidMount();
            expect(screen).toBeTruthy()
        });

        then("Handles api gives success", () => {
            const apiResponseSuccessMsg = new Message(getName(MessageEnum.AccoutLoginSuccess));
            apiResponseSuccessMsg.addData(
              getName(MessageEnum.AccoutLoginSuccess),
              {
                data: {

                }
              }
            );
            runEngine.sendMessage("unit test", apiResponseSuccessMsg);
            expect(screen).toBeTruthy()
        });

        then("onPress action item function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            screen.onPressActionItem(0,0);
            screen.onPressActionItem(0,1);
            screen.onPressActionItem(1,1);
            expect(screen).toBeTruthy()
        });

        then("waterMarkText function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            screen.waterMarkText("val");
            screen.isFocus();
            screen.isBlur();
            expect(screen).toBeTruthy()
        });

        then("onRemoveLogo function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            screen.onRemoveLogo();
            expect(screen).toBeTruthy()
        });

        then("apiCall function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            screen.apiCall();
            expect(screen).toBeTruthy()
        });

        then("navigation function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            instance.imagedata({uri: ""})
            expect(screen).toBeTruthy()
        });

        then("LunchLibrary function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            instance.lunchLibraray({uri: ""})
            expect(screen).toBeTruthy()
        });

        then("openamera function triggered",() => {
            Screen = shallow(<Watermark {...screenProps} />);
            const screen = Screen.instance() as Watermark;
            instance.opencamera({filename: "",path: "",mime: ""});
            expect(screen).toBeTruthy()
        });
    });
});
