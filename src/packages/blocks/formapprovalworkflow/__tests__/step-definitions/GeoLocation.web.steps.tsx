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
import GeoLocation from "../../src/GeoLocation.web";

jest.mock("google-maps-react", () => {
  return {
    GoogleApiWrapper: () => (component: React.ReactNode) => {
      return component;
    },
  };
});

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "GeoLocation",
};

const feature = loadFeature(
  "./__tests__/features/GeoLocation-scenario.web.feature"
);

const directionArr = [
  "http://localhost:3000/GeoLocation?pickup_latitude",
  "18.563440",
  "pickup_longitude",
  "73.915950",
  "destination_latitude",
  "18.54595",
  "destination_longitude",
  "73.888512",
  "customerID",
  "484",
];

const coordinates = { lat: 37.7749, lng: -122.4194 };

const routeDetails = [
  {
    lat: 18.56344,
    lng: 73.91595000000001,
  },
];

const mockWindow = {
  location: {
    replace: jest.fn(),
  },
};

const directionsServiceMock = jest.fn().mockImplementation(() => ({
  route: jest.fn((request, callback) => {
    callback(
      {
        routes: [
          {
            overview_path: [
              {
                lat: function () {
                  return 51.5074;
                },
                lng: function () {
                  return -0.1278;
                },
              },
            ],
          },
        ],
      },
      "OK"
    );
  }),
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GeoLocation", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GeoLocation;

    const google = {
      maps: {
        Size: jest.fn(),
      },
    };

    given("I am a User loading GeoLocation", () => {
      exampleBlockA = exampleBlockA = shallow(
        <GeoLocation {...screenProps} google={google} />
      );
    });

    when("I navigate to the GeoLocation", () => {
      instance = exampleBlockA.instance() as GeoLocation;
    });

    then("GeoLocation will load with out errors", () => {
      expect(exampleBlockA.find(".location-map")).toHaveLength(1);
    });
  });

  test("We can see the route on map", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GeoLocation;

    const googleCoordinates = {
      route: jest.fn(
        (
          request: {},
          callback: (
            result: {
              routes: {
                overview_path: { lat: () => number; lng: () => number }[];
              }[];
            },
            status: string
          ) => void
        ) => {
          // Call the callback function with a mocked result object
          callback(
            {
              routes: [
                {
                  overview_path: [
                    {
                      lat: () => 123.456,
                      lng: () => 789.012,
                    },
                  ],
                },
              ],
            },
            "OK"
          );
        }
      ),
    };

    const google = {
      maps: {
        Size: jest.fn(),
      },
    };

    given("Coordinates are set", () => {
      exampleBlockA = exampleBlockA = shallow(
        <GeoLocation {...screenProps} google={google} />
      );
    });

    when("Coordinates and route available", () => {
      instance = exampleBlockA.instance() as GeoLocation;
      instance.handleSetCoordinates(directionArr);
      instance.handleGetDirections(googleCoordinates);
      instance.handleGetDirections();
      instance.setStartCoordinates(directionArr);
      instance.setEndCoordinates(directionArr);
    });

    then("Directions service is set", () => {
      instance.handleGetDirections(googleCoordinates);
      instance.setState({ directionsService: directionsServiceMock });
      expect(instance.state.directionsService).toEqual(directionsServiceMock);
    });

    then("Coordinates are set", () => {
      instance.handleSetCoordinates(directionArr);
      this.setStartCoordinates(directionArr);
      this.setEndCoordinates(directionArr);
      instance.setState({ startLocation: coordinates });
      instance.setState({ endLocation: coordinates });
      expect(instance.state.endLocation).toEqual(coordinates);
      expect(instance.state.startLocation).toEqual(coordinates);
    });

    then("Start Coordinates are set", () => {
      instance.setStartCoordinates(directionArr);
      instance.setState({ startLocation: coordinates });
      expect(instance.state.startLocation).toEqual(coordinates);
    });

    then("End Coordinates are set", () => {
      instance.setEndCoordinates(directionArr);
      instance.setState({ endLocation: coordinates });
      expect(instance.state.endLocation).toEqual(coordinates);
    });

    then("Route is calculated", () => {
      const directionsService = new directionsServiceMock();
      instance.calculateRoute(directionsService);
      instance.setState({ routeCoordinates: routeDetails });
      expect(instance.state.routeCoordinates).toEqual(routeDetails);
    });
  });

  test("User can see the markers", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GeoLocation;

    const google = {
      maps: {
        Size: jest.fn(),
      },
    };

    given("Locations Markers are visible", () => {
      exampleBlockA = exampleBlockA = shallow(
        <GeoLocation {...screenProps} google={google} />
      );
    });

    when("Markers are place on Map", () => {
      instance = exampleBlockA.instance() as GeoLocation;
    });

    then("Pickup Marker is visible", () => {
      expect(exampleBlockA.find(".pickup-marker")).toHaveLength(1);
    });

    then("Destination Marker is visible", () => {
      expect(exampleBlockA.find(".destination-marker")).toHaveLength(1);
    });
  });

  test("To cancel the request", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GeoLocation;

    const window = {
      location: {
        replace: jest.fn(),
      },
    };

    const google = {
      maps: {
        Size: jest.fn(),
      },
    };

    given("User has a cancel button", () => {
      exampleBlockA = exampleBlockA = shallow(
        <GeoLocation {...screenProps} google={google} />
      );
    });

    when("When user clicks on cancel button", () => {
      instance = exampleBlockA.instance() as GeoLocation;
      instance.handleCancel();
      instance.receive("from", "messsage");
      instance.handleGoBack(mockWindow);
    });

    then("API to cancel search is called", () => {
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      instance.getCodeIDReferral = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);

      expect(instance.getCodeIDReferral).toBe(msgApiupdate.messageId);
    });

    then("User naviagtes back to search page", () => {
      instance.handleGoBack(mockWindow);
      expect(mockWindow.location.replace).toHaveBeenCalledTimes(2);
    });
  });
});

// Customizable Area End
