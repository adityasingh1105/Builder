// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";


export const configJSON = require("./config");

export interface Props {
}

interface S {
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
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    ];

    this.state = {
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
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getCurrentLocation();
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived in");

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      /*istanbul ignore next*/
      if (apiRequestCallId === this.getApicallData) {
        this.handleSetCustomerDetails(responseJson.data.attributes);
      }
    }

  }

  // web events

  getCurrentLocation = (getNavigator?: {
    geolocation: { getCurrentPosition: Function };
  }) => {
    const locationNavigator = getNavigator || navigator;
    locationNavigator.geolocation.getCurrentPosition(
      (position: { coords: {} }) => {
        this.setCurrentLocation(position.coords);
      }
    );
  };

  handleGetDestinationList = (
    data: { [k: string]: string },
    mockGeocodeByAddress?: Function
  ) => {
    const getAddress = mockGeocodeByAddress || geocodeByAddress;
    getAddress(data.label)
      .then((results: google.maps.GeocoderResult[]) => getLatLng(results[0]))
      .then(({ lat, lng }: { lat: number; lng: number }) =>
        this.handleSelectDestination({
          destination_latitude: String(lat),
          destination_longitude: String(lng),
        })
      );
  };

  setCurrentLocation = (data: { [keyVal: string]: string | number }) => {
    this.setState({
      currentLocation: {
        label: "Current Location",
        value: "Curren Location",
        current_latitude: String(data.latitude),
        current_longitude: String(data.longitude),
      },
    });
  };

  handleSelectDestination = (
    element: {
      destination_latitude: string;
      destination_longitude: string;
    } | null
  ) => {
    this.setState(
      {
        destination: element,
      },
      () => {
        this.handleGetData(element);
      }
    );
  };

  handleGetData = (
    data: { destination_latitude: string; destination_longitude: string } | null
  ) => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTcxOCwiZXhwIjoxNjgyMTY0NzgyLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.N0vknQq98iNbzOWN5RhEr0cBOEVIedCvBorY5ui0BLdjIFf6tTYNecWRuxyN7xypY6a2c0mm9prwNPbzIKen9g",
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getApicallData = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.searchAPI}?current_location_latitude=${this.state.currentLocation.current_latitude}&current_location_longitude=${this.state.currentLocation.current_longitude}&destination_latitude=${data?.destination_latitude}&destination_longitude=${data?.destination_longitude}`
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  };

  handleSetCustomerDetails = (data: { [keyVal: string]: string | number }) => {
    this.setState({
      cutomerData: data,
    });
    window.location.replace(
      `/GeoLocation?pickup_latitude=${data.pickup_latitude}&pickup_longitude=${data.pickup_longitude}&destination_latitude=${data.destination_latitude}&destination_longitude=${data.destination_longitude}`
    );
  };
}

// Customizable Area End
