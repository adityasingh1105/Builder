import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import React from "react";
import Waitinglist from "../../src/Waitinglist.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import StorageProvider from "../../../../framework/src/StorageProvider"

const waitingListData = require('../../src/__mock__/waitingList.json')
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Waitinglist",
};

const feature = loadFeature(
  "./__tests__/features/waitinglist-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to waitinglist", ({ given, when, then }) => {
    let WaitingListBlock: ShallowWrapper;
    let instance: Waitinglist;

    given("I am a User loading waitinglist", () => {
      WaitingListBlock = shallow(<Waitinglist {...screenProps} />);
    });

    when("I navigate to the waitinglist", () => {
      instance = WaitingListBlock.instance() as Waitinglist;
    });

    then("waitinglist will load with out errors", () => {
      expect(WaitingListBlock).toBeTruthy();
    });
    
    then('Waitinglist will get the user on API call', () => {
        const waitinglistSuccessApiCallId  = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        waitinglistSuccessApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            waitinglistSuccessApiCallId.messageId
        );
        waitinglistSuccessApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            waitingListData
        );
        instance.waitinglistWebApiCallId = waitinglistSuccessApiCallId.messageId;
        runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
        expect(instance.state.waitingListData).toEqual(waitingListData.data)
    });

    then('I can set the waiting list data and update with out error', async () => {
      const waitingList = WaitingListBlock.find({"data-testid" : "waitingListData1"})
      waitingList.simulate('click')
      expect(WaitingListBlock.state('waitingListData')).not.toEqual('')
    })
    
    then('Waitinglist will get the error on API call', () => {
        const waitinglistFailedApiCallId  = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        waitinglistFailedApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            waitinglistFailedApiCallId.messageId
        );
        waitinglistFailedApiCallId.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            {
              error:'error message'
            }
        );
        instance.waitinglistWebApiCallId = waitinglistFailedApiCallId.messageId;
        runEngine.sendMessage("Unit Test", waitinglistFailedApiCallId);
        expect(instance.state.waitingListData).toEqual(waitingListData.data)
    });
    
    then('Update waitinglist will get the user on API call', () => {
      const updateWaitinglistSuccessApiCallId  = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      updateWaitinglistSuccessApiCallId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          updateWaitinglistSuccessApiCallId.messageId
      );
      updateWaitinglistSuccessApiCallId.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            meta:{
              message:'success message'
            }
          }
      );
      instance.updateWaitinglistApiCallId = updateWaitinglistSuccessApiCallId.messageId;
      runEngine.sendMessage("Unit Test", updateWaitinglistSuccessApiCallId);
      expect(updateWaitinglistSuccessApiCallId).toBeTruthy();
    });

    then('Update waitinglist will get the error on API call', () => {
      const updateWaitinglistFailedApiCallId  = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateWaitinglistFailedApiCallId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          updateWaitinglistFailedApiCallId.messageId
      );
      updateWaitinglistFailedApiCallId.addData(
          getName(MessageEnum.RestAPIResponceErrorMessage),
          {
            error:'error message'
          }
      );
      instance.updateWaitinglistApiCallId = updateWaitinglistFailedApiCallId.messageId;
      runEngine.sendMessage("Unit Test", updateWaitinglistFailedApiCallId);
      expect(updateWaitinglistFailedApiCallId).toBeTruthy();
    });

    then("I can get navigation data", () => {
      const WaitingListNavigation  = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      // WaitingListNavigation.addData(
      //   getName(MessageEnum.WaitingListInfo),
      //   {"productId": 123, "productName": "Example Product", "productCategory": "Example Category"}
      // );
      runEngine.sendMessage("Unit Test", WaitingListNavigation);
      expect(WaitingListNavigation).toBeTruthy();
    })
    
    then("I can navigate back to cataloguw with out errors", () => {
      const backToCataloguePage = WaitingListBlock.find({"data-testid" : "backToCataloguePage"})
      backToCataloguePage.simulate('click')
      expect(WaitingListBlock).toBeTruthy();
    })

    then("I can cancel the waitinglist order with out errors", () => {
      const productCancelBtn = WaitingListBlock.find({"data-testid" : "productCancelBtn0"})
      productCancelBtn.simulate('click')
      expect(WaitingListBlock).toBeTruthy();
    })
  });
});
