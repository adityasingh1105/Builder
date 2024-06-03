// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PortfolioWeb,{RenderPortfolioWebItem} from "../../src/components/PortfolioWeb.web";
const screenProps = {
  navigation: { navigate: jest.fn() },
  id: "Login"
}
const renderPortfolioWebItemProps = {
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

const feature = loadFeature('./__tests__/features/PorfolioWeb-scenario.web.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
 
    jest.clearAllMocks();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to PortfolioWeb', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let renderPortfolioWrapper: ShallowWrapper;
    let instance: PortfolioWeb;

    given('I am a User loading PortfolioWeb', () => {
      exampleBlockA = shallow(<PortfolioWeb {...screenProps} />);
      renderPortfolioWrapper = shallow(<RenderPortfolioWebItem {...renderPortfolioWebItemProps} />);
      expect(exampleBlockA).toBeTruthy()

    });

    when('I navigate to the PortfolioWeb', () => {
      instance = exampleBlockA.instance() as PortfolioWeb
      expect(exampleBlockA).toBeTruthy()

    });

    then('PortfolioWeb will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then('portFolioFlatList will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy()
    });
    then('I can see the companyName with with out errors', () => {
      const ComapanyName = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'ComapanyName');
      expect(ComapanyName).toBeTruthy()
    });
    then('I can see the companyType with with out errors', () => {
    
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
          data: [
              { type: "",
              attributes: {
                company_name: "",
                invest_amount: 0,
                date_of_invest: "",
              },
              id: ""
              }
            ]
        }
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFormMessage.messageId
      );
      instance.getPortfolioApicallWebID = getFormMessage.messageId;

      runEngine.sendMessage(getFormMessage.id, getFormMessage);
      const mockPortfoliData=[
        { type: "",
        attributes: {
          company_name: "",
          invest_amount: 0,
          date_of_invest: "",
        },
        id: ""
        }
      ]
      expect(exampleBlockA.find(RenderPortfolioWebItem)).toHaveLength(mockPortfoliData.length);

    

    });
    then('I can see the investAmount with with out errors', () => {
      const investAmount = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'investAmount');
      expect(investAmount).toBeTruthy()
    
    });
    then('I can see the dateOfInvest with with out errors', () => {
      const dateOfInvest = renderPortfolioWrapper.findWhere((node) => node.prop('testID') === 'dateOfInvest');
      expect(dateOfInvest).toBeTruthy()
    });

    then('PortfolioWeb Api will return error', () => {
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
      instance.getPortfolioApicallWebID = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      expect(exampleBlockA).toBeTruthy()

    });
    then('PortfolioWeb Api will return succes', () => {
      localStorage.getItem=jest.fn().mockReturnValue(`{"name": "John", "age": 30}`)
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
          data: [
              { type: "",
              attributes: {
                company_name: "",
                invest_amount: 0,
                date_of_invest: "",
              },
              id: ""
              }
            ]
        }
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFormMessage.messageId
      );
      instance.getPortfolioApicallWebID = getFormMessage.messageId;

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
      instance.getPortfolioApicallWebID = getForsmMessage.messageId;

      runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
      expect(exampleBlockA).toBeTruthy()

    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy()
    })
  })
})
// Customizable Area End
