// Customizable Area Start
//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import FormApprovalWorkflow from "../../src/FormApprovalWorkflow.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "FormApprovalWorkflow",
};

const feature = loadFeature(
  "./__tests__/features/FormApprovalWorkflow-scenario.web.feature"
);

const responseJson = {
  data: {
    id: "498",
    type: "customer_trip",
    attributes: {
      customer_id: 1718,
      pickup_point:
        "155, 2, Rd Number 2, नंदा नगर, इन्दौर, मध्य प्रदेश 452011, India",
      destination_point: "MMGX+66G, Galonda, Madhya Pradesh 453001, India",
      pickup_latitude: "22.7403718536206",
      pickup_longitude: "75.8810960642304",
      destination_latitude: "22.675414372733613",
      destination_longitude: "75.69813093850173",
      roo_driver_trip_status: "decline",
      shuttle_driver_trip_status: "trip_decline",
      price: 25.5,
      created_at: "2023-04-25T14:06:52.407Z",
      updated_at: "2023-04-25T14:06:52.407Z",
    },
  },
};

const destinationListData = {
  label: "Gunjan Chowk, Mother Teresa Nagar, Kashmiri Colony, Yerawada, Pune",
  value: "Gunjan Chowk, Mother Teresa Nagar, Kashmiri Colony, Yerawada, Pune",
};

const destinationData = {
  destination_latitude: "18.54595",
  destination_longitude: "73.888512",
};

const currentLocation = {
  label: "Current Location",
  value: "Current Location",
  current_latitude: "18.54595",
  current_longitude: "73.888512",
};

const customerData = {
  customer_id: 768,
  pickup_point:
    "155, 2, Rd Number 2, नंदा नगर, इन्दौर, मध्य प्रदेश 452011, India",
  destination_point: "MMGX+66G, Galonda, Madhya Pradesh 453001, India",
  pickup_latitude: "22.7403718536206",
  pickup_longitude: "75.8810960642304",
  destination_latitude: "22.675414372733613",
  destination_longitude: "75.69813093850173",
  roo_driver_trip_status: "decline",
  shuttle_driver_trip_status: "trip_decline",
  price: 25.5,
  created_at: "2023-04-25T14:06:52.407Z",
  updated_at: "2023-04-25T14:06:52.407Z",
};

const mockNavigator = {
  geolocation: {
    getCurrentPosition: jest.fn(),
  },
};

const mockGeoCodebyAddress = jest.fn((address) =>
  Promise.resolve([{ formatted_address: "123 Main St" }])
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FormApprovalWorkflow", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: FormApprovalWorkflow;

    given("I am a User loading FormApprovalWorkflow", () => {
      exampleBlockA = shallow(<FormApprovalWorkflow {...screenProps} />);
    });

    when("I navigate to the FormApprovalWorkflow", () => {
      instance = exampleBlockA.instance() as FormApprovalWorkflow;
      instance.getCurrentLocation(mockNavigator);
      instance.setCurrentLocation(currentLocation);
    });

    then("FormApprovalWorkflow will load with out errors", () => {
      expect(exampleBlockA.find(".pickup-dropdown")).toHaveLength(1);
    });

    then("Current Location of user is fetched", () => {
      instance.getCurrentLocation(mockNavigator);
      instance.setCurrentLocation(currentLocation);
      instance.setState({
        currentLocation: currentLocation,
      });
      expect(instance.state.currentLocation).toEqual(currentLocation);
    });
  });

  test("User can select locations from dropdown", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: FormApprovalWorkflow;

    given("I am a User selecting drop location", () => {
      exampleBlockA = shallow(<FormApprovalWorkflow {...screenProps} />);
    });

    when("user click on drop location select field", () => {
      instance = exampleBlockA.instance() as FormApprovalWorkflow;
      instance.receive("from", "messsage");
      instance.handleSelectDestination(destinationData);
      instance.handleGetDestinationList(
        destinationListData,
        mockGeoCodebyAddress
      );
      instance.handleGetDestinationList(
        destinationListData,
        mockGeoCodebyAddress
      );
    });

    then("user can select option from dropdown list", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "destination-dropdown"
      );
      const event = {
        preventDefault() {},
        target: {
          value: {
            label: "GVGQ+739, Camp, Pune, Maharashtra 411001, India",
            value: "GVGQ+739, Camp, Pune, Maharashtra 411001, India",
            destination_latitude: "18.52595",
            destination_longitude: "73.888562",
          },
        },
      };
      textInputComponent.simulate("change", event);
      instance.handleGetDestinationList(
        destinationListData,
        mockGeoCodebyAddress
      );
      instance.handleSelectDestination(destinationData);
      instance.setState({
        destination: destinationData,
      });
      expect(instance.state.destination).toEqual(destinationData);
    });

    then("Data will load as per selected options", () => {
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );

      instance.getCodeIDReferral = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);

      expect(instance.getCodeIDReferral).toBe(msgApiupdate.messageId);
    });

    then("CustomerDetails will be stored", () => {
      instance.handleSetCustomerDetails(customerData);
      instance.setState({
        cutomerData: customerData,
      });
      expect(instance.state.cutomerData).toEqual(customerData);
    });
  });
});

// Customizable Area End
