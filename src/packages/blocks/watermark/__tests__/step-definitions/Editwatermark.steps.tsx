//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { fireEvent, render } from '@testing-library/react-native'
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Editwatermark from "../../src/Editwatermark";
import {shallow, shallowWrapper} from 'enzyme'
import { Platform } from "react-native"

let  data ={ contentType:'', method:'', endPoint:'', body:'' } 

let screenProps = {
    navigation: {
        state: { params: { text: '' } },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
    },
    id: "Editwatermark",
    actionRef: "Editwatermark",
    actionLogoRef: "Editwatermark"
}

global.hideRenderer = true;

let getWaterMarkData = {
    
    message: "all watermark_makers", "watermark_makers":
    {
        data: [
            {
                id: "10",
                type: "watermark_makers",
                attributes: {
                    id: 10,
                    category: "obtuse",
                    image: "https://minio.b119704.dev.eastus.az.svc.builder.cafe/sbucket/hh3igjb4oztw040ns7tw7tfvasx1"
                }
            }
        ]
    }
}

let feature = loadFeature('./__tests__/features/Editwatermark-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Editwatermark', ({ given, when, then }) => {
        let exampleBlockA = render(<Editwatermark {...screenProps} />)
        let instance: Editwatermark;
        let screen: shallowWrapper;
        let Screen;

        given('I am a User loading Editwatermark', () => {
         exampleBlockA = render(<Editwatermark {...screenProps} />);
        });

        when('I navigate to the Editwatermark', () => {
            screen = shallow(<Editwatermark {...screenProps} />);
            Screen = screen.instance() as Editwatermark
            Screen.getDataStorage();
            Screen.onPressSubscribe();
            expect(screen).toBeTruthy()
        });

        then('Editwatermark will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can hit the getWatermarkApiCallId with out errors', () => {
            screen = shallow(<Editwatermark {...screenProps} />);
            Screen = screen.instance() as Editwatermark
            Screen.onDownload();
            expect(screen).toBeTruthy()
        });
        
        then("I can hit the getWatermarkApiCallId with out errors",() => {
            const apiResponseFailureMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
            apiResponseFailureMessage.addData(
              getName(MessageEnum.SessionResponseToken),
              {
                data: {
             
                }
              }
            );
            Screen.editTemplateDownloadSuccessCallBack();
            runEngine.sendMessage("unit test", apiResponseFailureMessage);
            Screen.editTemplateDownloadFailureCallBack();
            expect(exampleBlockA).toBeTruthy()
        })

        then('I can hit the getWatermarkApiCallId with errors', () => {
            Screen.getWatermarkFailureCallBack();
            Screen.editTemplateDownloadApi();
            expect(exampleBlockA).toBeTruthy()
        });

        then('Android permission checked', () => {
            Screen.hasAndroidPermission();
            Screen.onSelectWatermark({},0);
            Screen.onOpen();
            Screen.onClose();
            expect(exampleBlockA).toBeTruthy()
        });

        then('captch function is rendering',() => {
            Screen.captch("");
            Screen.getToken();
            expect(exampleBlockA).toBeTruthy()
        });

        then('change color function is rendering',() => {
            Screen.changeColor("");
            expect(exampleBlockA).toBeTruthy()
        })

        then('I can hit the getWatermarkApiCallId with api errors', () => {
            let tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
            Screen.transfrom();
            let msgValidationAPIErrorTwo = new Message(getName(MessageEnum.RestAPIResponceMessage))
            Screen.visible();
            msgValidationAPIErrorTwo.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPIErrorTwo.messageId);
            msgValidationAPIErrorTwo.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                { "errors": "" });
            // instance.getWatermarkApiCallId = msgValidationAPIErrorTwo.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPIErrorTwo);
            Screen.color();
            expect(exampleBlockA)
        });


        then('I can hit the editWaterMarkTemplateDownloadId with out errors', () => {
            let tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            let msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { "status": "unprocessable_entity", "message": "template not found" });
            // instance.editWaterMarkTemplateDownloadId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI);
            Screen.textColor();
            Screen.renderImageUploadView();
            expect(exampleBlockA);
        });

        then('I can hit the editWaterMarkTemplateDownloadId with errors', () => {
            let tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            let msgValidationAPIError = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPIError.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPIError.messageId);
            msgValidationAPIError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { "errors": "" });
            // instance.editWaterMarkTemplateDownloadId = msgValidationAPIError.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPIError);
            Screen.renderTextColorView();
            Screen.renderSubscribeModal();
            expect(exampleBlockA).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('when move image function triggered',() => {
            Screen.moveImage("filename","url");
            Screen.renderWaterMarkListView();
            Screen.renderAngleSliderView();
            Screen.renderDownloadBtnView();
            expect(exampleBlockA).toBeTruthy()
        })
    });
});
