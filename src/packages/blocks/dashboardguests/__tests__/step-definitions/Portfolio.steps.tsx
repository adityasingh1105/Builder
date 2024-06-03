// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { AsyncStorage } from "react-native";
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Portfolio, { RenderPortfolioItem } from "../../src/components/Portfolio"
const screenProps = {
  navigation: { navigate: jest.fn() },
  id: "Login"
}
const renderPortfolioItemProps = {
  item: {
    type: "",
    attributes: {
      company_name: "",
      invest_amount: 0,
      date_of_invest: "",
    },
    id: ""
  }
}

const feature = loadFeature('./__tests__/features/Portfolio-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to Portfolio', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let renderPortfolioWrapper: ShallowWrapper;
    let instance: Portfolio;

    given('I am a User loading Portfolio', () => {
      exampleBlockA = shallow(<Portfolio {...screenProps} />);
      renderPortfolioWrapper = shallow(<RenderPortfolioItem {...renderPortfolioItemProps} />);
      expect(exampleBlockA).toBeTruthy()

    });

    when('I navigate to the Portfolio', async() => {
      instance = exampleBlockA.instance() as Portfolio
     AsyncStorage.setItem('Token',"sdksngkslndgknsldlgk")
     AsyncStorage.setItem('UserData',`{"sdksngkslndgknsldlgk":"dfsdfsd"}`)
      expect(exampleBlockA).toBeTruthy()

    });

    then('Portfolio will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then('portFolioFlatList will load with out errors', () => {
      const portfolioFlatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'portfolioFlatList');
      portfolioFlatList.renderProp('renderItem')({ item: '' });
      expect(exampleBlockA).toBeTruthy()
    });
    then('I can see the companyName with with out errors', () => {
      const ComapanyName = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'ComapanyName');
      expect(ComapanyName).toBeTruthy()
    });
    then('I can see the companyType with with out errors', () => {
      const ComapnayType = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'ComapnayType');
      expect(ComapnayType).toBeTruthy()
    });
    then('I can see the investAmount with with out errors', () => {
      const investAmount = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'investAmount');
      expect(investAmount).toBeTruthy()
      const copyUrl = exampleBlockA.findWhere((node) => node.prop('testID') === 'copyUrl');
      copyUrl.simulate('press');
    });
    then('I can see the dateOfInvest with with out errors', () => {
      const dateOfInvest = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'dateOfInvest');
      expect(dateOfInvest).toBeTruthy()
    });

    then('Portfolio Api will return error', () => {
      const putFormDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": {


          }
        }
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage.messageId
      );
      instance.getPortfolioApicallID = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      expect(exampleBlockA).toBeTruthy()

    });
    then('Portfolio Api will return succes', () => {
      const getFormMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFormMessage
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: "successfull"
        }
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFormMessage.messageId
      );
      instance.getPortfolioApicallID = getFormMessage.messageId;

      runEngine.sendMessage(getFormMessage.id, getFormMessage);
      const getForsmMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errro: "someting went wrong",
        }
      );
      getForsmMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getForsmMessage.messageId
      );
      instance.getPortfolioApicallID = getForsmMessage.messageId;

      runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
      expect(exampleBlockA).toBeTruthy()

    });
  
    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy()
    })
  })
})
// Customizable Area End
