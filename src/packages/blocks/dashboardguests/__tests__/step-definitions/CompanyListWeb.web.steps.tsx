// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
jest.useFakeTimers()
import { shallow, ShallowWrapper } from 'enzyme'
jest.useFakeTimers()

import * as helpers from '../../../../framework/src/Helpers'
jest.useFakeTimers()
import { runEngine } from '../../../../framework/src/RunEngine'
jest.useFakeTimers()
import { Message } from "../../../../framework/src/Message"
jest.useFakeTimers()

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
jest.useFakeTimers()
import React from "react";
import CompanyListWeb, { RenderItem } from "../../src/components/CompanyListWeb.web"
jest.useFakeTimers()
const screenProps = {
  navigation: { navigate: jest.fn() },
  id: "Login"
}
const RenderItemProps = {
  item: {
    type: "",
    attributes: {
      company_holder: "",
      doc: "",
      company_name: "string"
    },
    id: "string"
  },
  investNow: jest.fn()
}

const feature = loadFeature('./__tests__/features/CompanyListWeb-sceario.web.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to CompanyListWeb', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let renderITemWrapper: ShallowWrapper;
    let instance: CompanyListWeb;

    given('I am a User loading CompanyListWeb', () => {
      exampleBlockA = shallow(<CompanyListWeb {...screenProps} />);
      renderITemWrapper = shallow(<RenderItem {...RenderItemProps} />);

    });

    when('I navigate to the CompanyListWeb', () => {
      instance = exampleBlockA.instance() as CompanyListWeb

    });

    then('CompanyListWeb will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then('CompanyMap will load with out errors', () => {
      const companyFlatList = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'companyFlatList');
      expect(companyFlatList).toBeTruthy()
    });
    then('I can see the companyName with with out errors', () => {
      const companyName = renderITemWrapper.findWhere((node) => node.prop('data-test-id') === 'companyName');
      expect(companyName).toBeTruthy()
    });
    then('I can see the companyType with with out errors', () => {
      const companyType = renderITemWrapper.findWhere((node) => node.prop('data-test-id') === 'companyType');
      expect(companyType).toBeTruthy()
    });
    then('I can click the investBtn button with out errors', () => {
      const investBtn = renderITemWrapper.findWhere((node) => node.prop('data-test-id') === 'investBtn');
      investBtn.simulate('click')
      expect(exampleBlockA).toBeTruthy()

    });
    then('CompanyListWeb Api will return error', () => {
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
      instance.getCompaniesWebApiCallID = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);
      expect(exampleBlockA).toBeTruthy()

    });
    then('CompanyListWeb Api will return succes', () => {
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
          data: [{"id":"1","type":"company","attributes":{"company_name":"ABC","company_holder":" ","doc":"df"}},{"id":"2","type":"company","attributes":{"company_name":"ABC","company_holder":" ","doc":"df"}}]
        }
      );
      getFormMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFormMessage.messageId
      );
      instance.getCompaniesWebApiCallID = getFormMessage.messageId;

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
      instance.getCompaniesWebApiCallID = getForsmMessage.messageId;

      runEngine.sendMessage(getForsmMessage.id, getForsmMessage);
      expect(exampleBlockA).toBeTruthy()

    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy()
    })
  })
})
// Customizable Area End
