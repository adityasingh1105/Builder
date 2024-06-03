import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AddAddress from "../../src/AddAddress";
import Addresses from "../../src/Addresses";

const screenProps = {
  //@ts-ignore
  navigation: navigation,
  id: "AddressManagement",
};

const feature = loadFeature(
  "./__tests__/features/AddressManagement-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AddAddress", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: AddAddress;

    given("I am a User loading AddAddress", () => {
      addressManagementBlock = shallow(<AddAddress {...screenProps} />);
    });

    when("I navigate to the AddAddress", () => {
      instance = addressManagementBlock.instance() as AddAddress;
    });

    then("AddAddress will load with out errors", () => {
      instance.componentDidMount();
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtLat"
      );
      textInputComponent.simulate("changeText", "23.45");

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtLng"
      );
      textInputComponent.simulate("changeText", "12.34");

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtAddress"
      );
      textInputComponent.simulate("changeText", "My home address");

    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "Background"
      );
      buttonComponent.simulate("press");
      expect(addressManagementBlock).toBeTruthy();
      buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnSubmit"
      );
      buttonComponent.simulate("press");
    });

    then("Call RestAPIs without errors", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const addAddressListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      addAddressListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {},
        }
      );
      instance.apiAddAddressCallId = addAddressListAPI.messageId;
      runEngine.sendMessage("Unit Test", addAddressListAPI);
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(addressManagementBlock).toBeTruthy();
    });
  });

  test("User navigates to Addresses", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: Addresses;

    given("I am a User loading Addresses", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
    });

    when("I navigate to the Addresses", () => {
      instance = addressManagementBlock.instance() as Addresses;
    });

    then("Addresses will load with out errors", () => {
      instance.componentDidMount();
      expect(addressManagementBlock).toBeTruthy();
    });

    then("Call RestAPIs without errors", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
      instance = addressManagementBlock.instance() as Addresses;
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getAddressListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getAddressListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "1",
              type: "address",
              attributes: {
                latitude: 1.5,
                longitude: 3.4,
                address: "StreetName house 3",
                address_type: "Home",
              },
            },
          ],
        }
      );
      instance.apiGetAllAddressCallId = getAddressListAPI.messageId;
      runEngine.sendMessage("Unit Test", getAddressListAPI);
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(addressManagementBlock).toBeTruthy();
    });
  });
});
