import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Timeclock from "../../src/Timeclock.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Timeclock",
};

const feature = loadFeature(
  "./__tests__/features/Timeclock-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Timeclock", ({ given, when, then }) => {
    let timeClockBlock: ShallowWrapper;
    let instance: Timeclock;

    given("I am a User loading Timeclock", () => {
      timeClockBlock = shallow(<Timeclock {...screenProps} />);
    });

    when("I navigate to the Timeclock", () => {
      instance = timeClockBlock.instance() as Timeclock;
      const accountLoginSuccess = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );
      accountLoginSuccess.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        instance.state.txtInputValue
      );
      runEngine.sendMessage("Unit Test", accountLoginSuccess);
    });

    then("Timeclock will load with out errors", () => {
      expect(timeClockBlock).toBeTruthy();
    });

    then("If user has not started game yet", () => {
      const userStatusApiSuccessCallback = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.userStatusAPICallID = userStatusApiSuccessCallback.messageId;
      userStatusApiSuccessCallback.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatusApiSuccessCallback.messageId
      );
      userStatusApiSuccessCallback.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "The game has not started yet",
          time_left: 300,
          status: 0,
        }
      );
      runEngine.sendMessage("Unit Test", userStatusApiSuccessCallback);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("I can press start game button with out errors", () => {
      const button = timeClockBlock
        .find({
          "data-test-id": "startGameButton",
        })
        .at(0);
      button.simulate("click");

      const startGameAPICallSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID = startGameAPICallSuccess.messageId;
      startGameAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        startGameAPICallSuccess.messageId
      );
      startGameAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Game Started",
          status: 1,
        }
      );
      runEngine.sendMessage("Unit Test", startGameAPICallSuccess);
      jest.advanceTimersByTime(301000);
      const gameOverAPICallSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID = gameOverAPICallSuccess.messageId;
      gameOverAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        gameOverAPICallSuccess.messageId
      );
      gameOverAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Your game is over",
          status: 0,
          time_left: 300,
        }
      );
      runEngine.sendMessage("Unit Test", gameOverAPICallSuccess);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("Finish api with error", () => {
      const gameOverAPICallFailure = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.finishGameAPICallID = gameOverAPICallFailure.messageId;
      gameOverAPICallFailure.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        gameOverAPICallFailure.messageId
      );
      gameOverAPICallFailure.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: "Game is not started",
        }
      );
      runEngine.sendMessage("Unit Test", gameOverAPICallFailure);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("I can press start game button with out timeout errors", () => {
      const button = timeClockBlock
        .find({
          "data-test-id": "startGameButton",
        })
        .at(0);
      button.simulate("click");

      const startGameAPICall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID = startGameAPICall.messageId;
      startGameAPICall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        startGameAPICall.messageId
      );
      startGameAPICall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Game Started",
          status: 1,
        }
      );
      runEngine.sendMessage("Unit Test", startGameAPICall);
      expect(instance.state.isStartGame).toEqual(true);
    });

    then("I can press finish game button with out errors", () => {
      const button = timeClockBlock
        .find({
          "data-test-id": "finishGameButton",
        })
        .at(0);
      button.simulate("click");

      const finishGameAPICallSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.finishGameAPICallID = finishGameAPICallSuccess.messageId;
      finishGameAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        finishGameAPICallSuccess.messageId
      );
      finishGameAPICallSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Game is finished",
          status: 200,
          time_left: 300,
        }
      );
      runEngine.sendMessage("Unit Test", finishGameAPICallSuccess);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("If user game is in progress", () => {
      const checkUserStatusApiCallData = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.userStatusAPICallID = checkUserStatusApiCallData.messageId;
      checkUserStatusApiCallData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        checkUserStatusApiCallData.messageId
      );
      checkUserStatusApiCallData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "The game is in progress",
          time_left: 200,
          status: 1,
        }
      );
      runEngine.sendMessage("Unit Test", checkUserStatusApiCallData);
      jest.advanceTimersByTime(201000);
      const gameOverAPICallSuccessData = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID =
        gameOverAPICallSuccessData.messageId;
      gameOverAPICallSuccessData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        gameOverAPICallSuccessData.messageId
      );
      gameOverAPICallSuccessData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Your game is over",
          status: 0,
          time_left: 300,
        }
      );
      runEngine.sendMessage("Unit Test", gameOverAPICallSuccessData);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("I can press start game button with errors", () => {
      const button = timeClockBlock
        .find({
          "data-test-id": "startGameButton",
        })
        .at(0);
      button.simulate("click");
      const startGameAPICallFailure = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID = startGameAPICallFailure.messageId;
      startGameAPICallFailure.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        startGameAPICallFailure.messageId
      );
      startGameAPICallFailure.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: "Already Started",
        }
      );
      runEngine.sendMessage("Unit Test", startGameAPICallFailure);
      expect(instance.state.dataLoading).toEqual(false);
    });

    then("I can press start game button with 502 errors", () => {
      const button = timeClockBlock
        .find({
          "data-test-id": "startGameButton",
        })
        .at(0);
      button.simulate("click");
      const startGameAPICall502Failure = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.startOrFinishGameAPICallID =
        startGameAPICall502Failure.messageId;
      startGameAPICall502Failure.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        startGameAPICall502Failure.messageId
      );
      startGameAPICall502Failure.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: "502 Internal Server Error",
        }
      );
      runEngine.sendMessage("Unit Test", startGameAPICall502Failure);
      expect(instance.state.dataLoading).toEqual(true);
    });

    then("If user game has ended", () => {
      const checkUserStatusApiCallData = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.userStatusAPICallID = checkUserStatusApiCallData.messageId;
      checkUserStatusApiCallData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        checkUserStatusApiCallData.messageId
      );
      checkUserStatusApiCallData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "The game has ended",
          time_left: 0,
          status: 2,
        }
      );
      runEngine.sendMessage("Unit Test", checkUserStatusApiCallData);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("User status api failed", () => {
      const checkUserStatusApiFailure = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.userStatusAPICallID = checkUserStatusApiFailure.messageId;
      checkUserStatusApiFailure.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        checkUserStatusApiFailure.messageId
      );
      checkUserStatusApiFailure.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: "The game has ended",
        }
      );
      runEngine.sendMessage("Unit Test", checkUserStatusApiFailure);
      expect(instance.state.isStartGame).toEqual(false);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(timeClockBlock).toBeTruthy();
    });
  });
});
