// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config");

export interface Props {
}

interface S {
  startLocation: { lat: number; lng: number };
  endLocation: { lat: number; lng: number };
  routeCoordinates: { lat: number; lng: number }[];
  directionsService: {};
}

interface SS {
}

export default class GeoLocationController extends BlockComponent<
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
      startLocation: { lat: 37.7749, lng: -122.4194 },
      endLocation: { lat: 37.7749, lng: -122.4313 },
      routeCoordinates: [],
      directionsService: {},
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    const direction = window.location.href.split(/=|&/);
    this.handleSetCoordinates(direction);
    this.handleGetDirections();
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived in");

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      /*istanbul ignore next*/
      if (apiRequestCallId === this.getApicallData) {
        this.handleGoBack();
      }
    } else {
      alert("API Failed");
    }

  }

  // web events

  handleSetCoordinates = (direction: string[]) => {
    this.setStartCoordinates(direction);
    this.setEndCoordinates(direction);
  };

  setStartCoordinates = (direction: string[]) => {
    this.setState({
      startLocation: { lat: Number(direction[1]), lng: Number(direction[3]) },
    });
  };

  setEndCoordinates = (direction: string[]) => {
    this.setState({
      endLocation: { lat: Number(direction[5]), lng: Number(direction[7]) },
    });
  };

  handleGetDirections = (googleData?: {
    route(
      request: {},
      callback: (
        result: {
          routes: {
            overview_path: { lat: () => number; lng: () => number }[];
          }[];
        },
        status: string
      ) => void
    ): void;
  }) => {
    const directionsService = googleData || new google.maps.DirectionsService();
    this.setState({ directionsService }, () => {
      this.calculateRoute(directionsService);
    });
  };

  calculateRoute = (
    directionsService:
      | {
          route(
            request: {},
            callback: (
              result: {
                routes: {
                  overview_path: { lat: () => number; lng: () => number }[];
                }[];
              },
              status: string
            ) => void
          ): void;
        }
      | { route: Function }
  ) => {
    const { startLocation, endLocation } = this.state;
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: "DRIVING",
    };
    directionsService.route(
      request,
      (
        result: {
          routes: {
            overview_path: { lat: () => number; lng: () => number }[];
          }[];
        },
        status: string
      ) => {
        /*istanbul ignore next*/
        if (status === "OK") {
          const routeCoordinates = result.routes[0].overview_path.map(
            (location: { lat: () => number; lng: () => number }) => {
              return { lat: location.lat(), lng: location.lng() };
            }
          );
          this.setState({ routeCoordinates });
        }
      }
    );
  };

  handleGoBack = (mockWindowObj?: { location: { replace: Function } }) => {
    const redirectWindow = mockWindowObj || window;
    redirectWindow.location.replace("/FormApproval");
  };

  handleCancel = () => {
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
      configJSON.cancelAPI
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  };

}

// Customizable Area End
