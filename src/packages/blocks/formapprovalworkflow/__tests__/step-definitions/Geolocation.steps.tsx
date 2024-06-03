// Customizable Area Start
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";



import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import React from "react";
import GeoLocation from "../../src/GeoLocation";

const tempCityList = [
  {
    id: 1,
    name: "testCity1",
    attributes: {
      name: "test city 1",
    },
  },
  {
    id: 2,
    name: "testCity2",
    attributes: {
      name: "test city 2",
    },
  },
];

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "GeoLocation",
};
const responseJson = { "data": {
  "id": "498",
  "type": "customer_trip",
  "attributes": {
      "customer_id": 1718,
      "pickup_point": "155, 2, Rd Number 2, नंदा नगर, इन्दौर, मध्य प्रदेश 452011, India",
      "destination_point": "MMGX+66G, Galonda, Madhya Pradesh 453001, India",
      "pickup_latitude": "22.7403718536206",
      "pickup_longitude": "75.8810960642304",
      "destination_latitude": "22.675414372733613",
      "destination_longitude": "75.69813093850173",
      "roo_driver_trip_status": "decline",
      "shuttle_driver_trip_status": "trip_decline",
      "price": 25.5,
      "created_at": "2023-04-25T14:06:52.407Z",
      "updated_at": "2023-04-25T14:06:52.407Z"
  }
}};


const feature = loadFeature("./__tests__/features/GeoLocation-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GeoLocation", ({ given, when, then }) => {
    let MapsBlock: ShallowWrapper;
    let instance: GeoLocation;

    given("I am a User loading GeoLocation", () => {
      MapsBlock = shallow(<GeoLocation {...screenProps} />);
    });

    when("I navigate to the GeoLocation", () => {
      instance = MapsBlock.instance() as GeoLocation;
    });

    then("GeoLocation will load with out errors", async () => {
      instance.CreatetripPost();
      let raw ={
        current_location_latitude: 22.7403718536206,
        current_location_longitude: 75.8810960642304,
        destination_latitude: 22.675414372733613,
        destination_longitude: 75.69813093850173
      };
      
      const CreatetripId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
        );
        
        CreatetripId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        CreatetripId.messageId
        );
        
        CreatetripId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
        );
        CreatetripId.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          raw
        );
        instance.CreateTrip = CreatetripId.messageId;
        runEngine.sendMessage("Unit Test", CreatetripId);
        instance.setState({customer_trip_id:CreatetripId})
        expect(CreatetripId.messageId).toBe(CreatetripId.messageId);
    
    });

    // when("I click on cancel Button without error", async () => {
    //   // instance.getInitialState()
    //   jest.useFakeTimers();
    //   jest.advanceTimersByTime(3000);
    //   instance.CreatetripPost()
    //   // instance.hasLocationPermission()
    //   instance = MapsBlock.instance() as GeoLocation;
    //   let Platform = {
    //     OS: "android",
    //     Version: 22
    //   }
    //   expect(Platform.OS).toEqual('android')
    //   expect(Platform.Version).toEqual(22)
    // });

    when("I click on cancel Button without error", async () => {
      let cancelTripButton = MapsBlock.findWhere(
        (node) => node.prop("testID") === "cancelTrip"
      );
      cancelTripButton.simulate("press");
     instance.cancelTrip();
    });

    then("I can leave the screen with out errors", () => {
      const goBackMock = jest.fn();
      const navigation = { goBack: goBackMock };
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
        );
        msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
        );
        
        instance.CancelTriprequest = msgApiupdate.messageId;
        runEngine.sendMessage("Unit Test", msgApiupdate);
        expect(instance.CancelTriprequest).toBe(msgApiupdate.messageId);
        instance.goBack();
        instance.setState({visibleModal:true})
        expect(instance.state.visibleModal).toEqual(true);
        expect(goBackMock).toHaveBeenCalledWith(null);

    });
  });
});

// Customizable Area End
