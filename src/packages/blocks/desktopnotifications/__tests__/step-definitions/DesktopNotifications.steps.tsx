import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import DesktopNotifications from "../../src/DesktopNotifications"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "DesktopNotifications"
  }

const feature = loadFeature('./__tests__/features/DesktopNotifications-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to DesktopNotifications', ({ given, when, then }) => {
        let desktopNotificationsBlock:ShallowWrapper;
        let instance:DesktopNotifications; 

        given('I am a User loading DesktopNotifications', () => {
            desktopNotificationsBlock = shallow(<DesktopNotifications {...screenProps}/>);
        });

        when('I navigate to the DesktopNotifications', () => {
             instance = desktopNotificationsBlock.instance() as DesktopNotifications
        });

        then('DesktopNotifications will load with out errors', () => {
            expect(desktopNotificationsBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(desktopNotificationsBlock).toBeTruthy();
        });
    });


});
