// Customizable Area Start
//@ts-nocheck
import { IBlock } from "../../framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
export const configJSON = require("./config");
import Geolocation from "@react-native-community/geolocation";

import { Keyboard, TextInput, Platform, PermissionsAndroid, ToastAndroid, Dimensions, Linking, Alert } from "react-native";


import Geocoder from "react-native-geocoding";


export interface Props {
  navigation: any;
  id: string;
}

interface S {
  latitude: number;
  longitude: number;
  longitudeDelta: number;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  sourceAddress: string;
  islocationselected: boolean;
  destinationaddress: string;
  currentLocation: {
    label: string;
    value: string;
    current_latitude: string;
    current_longitude: string;
  };
  destination: {
    destination_latitude: string;
    destination_longitude: string;
  } | null;
  cutomerData: { [keyVal: string]: string | number };
  customerID: string;
}

interface SS {
  id: any;
}

export default class FormApprovalWorkflowController extends BlockComponent<
  Props,
  S,
  SS
> {
  getApicallData: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.state = {
      latitude: "",
      longitude: "",
      region: {
        latitude: 12.840575,
        longitude: 77.651787,
      },
      sourceAddress: {},
      destinationaddress: "",
      islocationselected: false,
      currentLocation: {
        label: "",
        value: "",
        current_latitude: "",
        current_longitude: "",
      },
      destination: { destination_latitude: "", destination_longitude: "" },
      cutomerData: {},
      customerID: "",
    };

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.hasLocationPermission("ios");

  }

  async receive(from: string, message: Message) {
  }
 
  async componentDidMount() {
  }
  onMapRegionChange(region) {
    this.setState({
      region,
    });
  }
  getCoordsFromName(data) {
    this.setState({
      islocationselected: true,
      region: {
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      destinationaddress: data.formatted_address,
    });
    let sourceCoordinate={
      latitude: 22.5,
      longitude: 82.6,
      latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    }
    this.props.navigation.navigate("GeoLocation", {
      destinationCoordinate: this.state.region,
      destinationaddress: this.state.destinationaddress,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      sourceAddressinword: this.state.sourceAddress,
      sourceCoordinate:sourceCoordinate
    });
  }

  componentDidMount(): void {
    this.getLocation()
    
  }
  getLocation = () => {
    const result = this.requestLocationPermission();
    result.then(res => {
       console.log( 'res is:',res);
       if (res) {
        Geolocation.getCurrentPosition(
          position  => {
           console.log(position);
           this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          Geocoder.init("AIzaSyD24Z2ObJBO-bVH33RyS2Dlj5Ht6SsfqIo", {
            language: "en",
          });
          Geocoder.from(position.coords.latitude, position.coords.longitude).then(
            (json) => {
              this.setState({
                sourceAddress: json?.results[3]?.formatted_address,
              });
            }
          );
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},  
        );  
       }
    });
  }

   requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Location Permission',
          message:
            'App needs access to your Location ' +
            '.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
        //hasLocationPermission = true
        return true;
      } else {
        //hasLocationPermission = false
        return false;
      }
       }
  };

 async hasLocationPermission(platformios) {
    if (Platform.OS === platformios) {
      return true;
    }
    return false
  }

  // web functions
}

// Customizable Area End
