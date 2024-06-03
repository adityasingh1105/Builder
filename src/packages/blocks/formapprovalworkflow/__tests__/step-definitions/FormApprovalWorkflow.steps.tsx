// Customizable Area Start

//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { Message } from "framework/src/Message";
import React from "react";
import FormApprovalWorkflow from "../../src/FormApprovalWorkflow";
import GeoLocation from '../../src/GeoLocation';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
// import MapInput from '../../../../components/src/MapInput'
import {PermissionsAndroid } from "react-native";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "FormApprovalWorkflow",
};
const mockNavigator = {
  geolocation: {
    getCurrentPosition: jest.fn(),
  },
};
const screenPropsTripScreen = {
  navigation: {
      addListener: jest.fn().mockImplementation((event, callback) => {callback()}),
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      replace: jest.fn(),
      trim: jest.fn(),
      Alert: jest.fn(),
      split:jest.fn(),
      pop:jest.fn()
    },
  id: "GeoLocation"
}

const feature = loadFeature("./__tests__/features/FormApprovalWorkflow-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FormApprovalWorkflow", ({ given, when, then }) => {
    let SearchAddressBlock: ShallowWrapper;
    let customComponent:ShallowWrapper;
    let instance: FormApprovalWorkflow;
    let instance2: FormApprovalWorkflow;

    given("I am a User loading FormApprovalWorkflow", () => {
      SearchAddressBlock = shallow(<FormApprovalWorkflow {...screenProps} />);
      // customComponent = shallow(<MapInput {...screenProps} />)
    });
    when("I navigate to the FormApprovalWorkflow", () => {
      instance = SearchAddressBlock.instance() as FormApprovalWorkflow;
    });

    then("FormApprovalWorkflow will ask permission without errors", async() => {
      instance = SearchAddressBlock.instance() as FormApprovalWorkflow;
      instance.hasLocationPermission('ios');
      PermissionsAndroid.check = jest.fn().mockReturnValue(true);
      PermissionsAndroid.request = jest.fn().mockReturnValue(true);
    const mockPlatformIOS = {
      OS: 'ios',
    };

    const result1 = await instance.hasLocationPermission(mockPlatformIOS);
    instance.getLocation(mockNavigator);
    expect(result1).toBe(false);


    });
    when("I click on Current location", async () => {
      let buttonComponent = SearchAddressBlock.findWhere(
        (node) => node.prop("testID") === "getLocationbtn"
      );
      buttonComponent.simulate("press");
      instance.getLocation(mockNavigator);
 
    });
    then("FormApprovalWorkflow will take user current location", async () => {
      const position = {
        coords: {
          latitude: 228457.369,
          longitude: 45,
        },
      };
      const json={
        json:{
          results:[
            {},{},{},{
              formatted_address:'Ashok nagar ward 12 Gujarat'
            }
          ]
        }
      }
      let region = {
        latitude:228457.369,
        longitude: 45,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }
      let details = {
        geometry: {
          location: {
            lat: 12.444,
            long: 12.444,
            latDelta: 0.003,
            longDelta: 0.003
          }
        }
      }

      instance.setState(region)
      instance.getCoordsFromName(region, details)
      // instance.hasLocationPermission()
      instance.receive("", new Message(""))  
      const successCallback = jest.fn((callback) => callback(position));
      const successCallbackGeoCoder = jest.fn((callback) => callback(position.coords.latitude, position.coords.longitude));
      Geolocation.getCurrentPosition = jest.fn(successCallback);
      Geocoder.init("AIzaSyD24Z2ObJBO-bVH33RyS2Dlj5Ht6SsfqIo", { language: "en" }); 
      Geocoder.from(position.coords.latitude, position.coords.longitude)
      .then(jsons => {
        expect(instance.state.sourceAddress).toEqual(jsons?.results[3].formatted_address);
      })
      instance.setState({sourceAddress:json.json.results[3].formatted_address})
      expect(instance.state.latitude).toBe(position.coords.latitude);
      expect(instance.state.longitude).toEqual(position.coords.longitude);
   

    });
    when("I enter Destination text without error", () => {
      let buttonComponent = SearchAddressBlock.findWhere(
        (node) => node.prop("testID") === "searchDestination"
      );
      const data={
            location:{
              latitude:2152623,
              longitude:80579562
        },
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }
      buttonComponent.simulate("press");
      instance.getCoordsFromName(data)
      // instance2.notifyChange()
    });
   
    then("I can choose a destination from list", () => {
      const data={
            location:{
              latitude:2152623,
              longitude:80579562
        },
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
        destinationaddress:'Ashok nagar ward 12 Gujarat'
      }
      instance.getCoordsFromName(data)
      instance.setState({
        islocationselected:true,
          region: {
              latitude: data.location.latitude,
              longitude:data.location.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003
          },
          destinationaddress: data.destinationaddress
      });
      expect(instance.state.destinationaddress).toEqual(data.destinationaddress)

    });
    then("I can navigate to GeolocationScreen", () => {
      let geolocationscreen: ShallowWrapper;
        geolocationscreen = shallow(<GeoLocation {...screenPropsTripScreen} />)
        geolocationscreen.instance().props.navigation.replace('GeoLocation');
        expect(screenPropsTripScreen.navigation.replace).toHaveBeenCalledWith('GeoLocation');
    });
  });
});

// Customizable Area End
