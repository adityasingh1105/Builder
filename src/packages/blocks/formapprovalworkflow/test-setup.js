// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SwipeButton from 'rn-swipe-button';

configure({ adapter: new Adapter() });

jest.mock("react-native-geolocation-service", () => ({
  getCurrentPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 123,
        longitude: 45,
      },
    });
  }),
  requestAuthorization: () => "granted",
}));
jest.mock('react-native-android-location-enabler',()=>({
  RNAndroidLocationEnabler:jest.fn(),
  promptForEnableLocationIfNeeded:jest.fn()
}))
jest.mock('react-native-google-places-autocomplete',()=>({
    GooglePlacesAutocomplete:jest.fn(),
  }))
  jest.mock('rn-swipe-button',()=>({
    SwipeButton:jest.fn(),
  }))


jest.mock("@react-native-community/geolocation", () => ({
    getCurrentPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 123,
        longitude: 45,
      },
    });
  }),
  requestAuthorization: () => "granted",
}));

