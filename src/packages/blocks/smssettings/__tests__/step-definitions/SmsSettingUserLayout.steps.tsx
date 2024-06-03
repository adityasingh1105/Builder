// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SmsSettingUserLayout from "../../src/SmsSettingUserLayout"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn()
    },
    id: "SmsSettingUserLayout"
}

const feature = loadFeature('./__tests__/features/SmsSettingUserLayout-scenario.feature');


const Data = [
    {
        "id": "63",
        "type": "setting",
        "attributes": {
            "id": 63,
            "title": "player ",
            "togle": false,
            "parent_id": null,
            "subsetting": [
                {
                    "id": 64,
                    "title": "mute",
                    "parent_id": 63,
                    "togle": false,
                    "created_at": "2023-04-27T12:51:29.133Z",
                    "updated_at": "2023-04-27T12:51:29.133Z"
                },
                {
                    "id": 65,
                    "title": "vibration",
                    "parent_id": 63,
                    "togle": true,
                    "created_at": "2023-04-27T12:51:47.814Z",
                    "updated_at": "2023-04-27T12:54:12.127Z"
                }
            ]
        }
    },
    {
        "id": "66",
        "type": "setting",
        "attributes": {
            "id": 66,
            "title": "multimedia settings",
            "togle": false,
            "parent_id": null,
            "subsetting": [
                {
                    "id": 67,
                    "title": "vibration",
                    "parent_id": 66,
                    "togle": false,
                    "created_at": "2023-04-28T05:21:50.994Z",
                    "updated_at": "2023-04-28T05:21:50.994Z"
                }
            ]
        }
    },
    {
        "id": "59",
        "type": "setting",
        "attributes": {
            "id": 59,
            "title": "notification setting",
            "togle": true,
            "parent_id": null,
            "subsetting": [
                {
                    "id": 61,
                    "title": "subssettings2 for 59",
                    "parent_id": 59,
                    "togle": false,
                    "created_at": "2023-04-27T12:25:52.259Z",
                    "updated_at": "2023-04-27T12:25:52.259Z"
                },
                {
                    "id": 60,
                    "title": "subssettings for 59",
                    "parent_id": 59,
                    "togle": true,
                    "created_at": "2023-04-27T12:25:46.121Z",
                    "updated_at": "2023-04-28T05:22:12.773Z"
                },
                {
                    "id": 62,
                    "title": "testing setting ",
                    "parent_id": 59,
                    "togle": true,
                    "created_at": "2023-04-27T12:28:05.413Z",
                    "updated_at": "2023-04-28T05:22:16.541Z"
                }
            ]
        }
    }
]

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SmsSettingUserLayout', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let ChildWapper: ShallowWrapper
        let instance: SmsSettingUserLayout;

        given('I am a User loading SmsSettingUserLayout', () => {
            exampleBlockA = shallow(<SmsSettingUserLayout {...screenProps} />);
            
        });

        when('SmsSettingUserLayout screen should load the data', () => {
            instance = exampleBlockA.instance() as SmsSettingUserLayout

            const RequestMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            RequestMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                RequestMessage.messageId
            )
            RequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    data:
                        Data

                }))
            );
            instance.SettingList_CallID = RequestMessage.messageId;
            runEngine.sendMessage("Unit Test", RequestMessage);
        });


        then('SmsSettingUserLayout Data get store in the list', () => {
            expect(instance.state.Data).toStrictEqual(Data)
        });


        when('SmsSettingsuserLayout screen get updated', () => {
            const List = exampleBlockA.findWhere((node) => node.prop('testID') === 'List_ID')
            ChildWapper = shallow(List.props().renderItem({ item: undefined, index: 0 }))
            ChildWapper = shallow(List.props().renderItem({ item: Data[0], index: 1 }))
        })


        then('List get update on the SmsSettingsuserLayout screen', () => {
            expect(instance.state.Data).toStrictEqual(Data)

        })

        when('I click turn on the main switch to turn on or off', () => {

            const SwitchBTN = ChildWapper.findWhere((node) => node.prop('testID') === 'Switch_ID')
            SwitchBTN.props().onValueChange()

            const requestMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                requestMessage.messageId
            );
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    data: {
                        attributes: {}
                    }
                }))
            );
            instance.UpdateToggle_ID = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);
        });

        then("Main switch get update in main userlist", () => {
            expect(instance.state.Data).toStrictEqual(Data)
        })

        when("I turn off the subSettings", () => {
            const subsetting = ChildWapper.findWhere(node => node.prop('testID') === 'SubSwitch_ID-64')   
            subsetting.simulate('valueChange')
        })

    });


});

// Customizable Area End
