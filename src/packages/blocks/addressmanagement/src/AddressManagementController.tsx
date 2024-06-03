import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
export interface AddressDataType {
  latitude: number;
  longitude: number;
  address: string;
  address_type: string;
}

export interface AddressType {
  id: string;
  type: string;
  attributes: AddressDataType;
}

export interface AddressValueType {
  value: string;
}

export const AdressTypeData = [
  {
    value: "Home", label: 'Home'
  },
  {
    value: "Work", label: 'Work'
  },
  {
    value: "Other", label: 'Other'
  },
];
// Customizable Area End

interface S {
  // Customizable Area Start
  txtInputAddressValue: string;
  txtInputLatValue: string;
  txtInputLngValue: string;
  token: string;
  addressTypeValue: string;
  addressList: Array<AddressType> | null;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AddressManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiAddAddressCallId: string = "";
  apiGetAllAddressCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputAddressValue: "",
      txtInputLatValue: "",
      txtInputLngValue: "",
      addressTypeValue: AdressTypeData[0].value,
      addressList: null,
      token: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.apiGetAllAddressCallId) {
          this.setState({ addressList: responseJson.data });
        }
        if (apiRequestCallId === this.apiAddAddressCallId) {
          this.showAlert("Add Address", "Added address successfully!");
          this.props.navigation.goBack();
        }
      } else if (responseJson && responseJson.errors) {
        if (responseJson.errors) {
          if (apiRequestCallId === this.apiGetAllAddressCallId) {
            responseJson.errors.forEach((error: any) => {
              if (error["address"]) {
                this.showAlert(
                  configJSON.errorTitle,
                  error["address"].join(".")
                );
              }
            });
          }
        }
      }
    } else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
       this.setState({ token: token });
      // load addresses
      this.loadAddresses(token);
    }
    // Customizable Area End
  }

   // Customizable Area Start
  loadAddresses = (token: string) => {
    const header = {
      "Content-Type": configJSON.getAddressApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetAllAddressCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAddressApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAddressApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  // Customizable Area Start
  txtInputLatWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputLatValue: text });
    },
    secureTextEntry: false,
  };

  txtInputLatMobileProps = {
    ...this.txtInputLatWebProps,
  };

  txtInputLatProps = this.isPlatformWeb()
    ? this.txtInputLatWebProps
    : this.txtInputLatMobileProps;

  txtInputLngWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputLngValue: text });
    },
    secureTextEntry: false,
  };

  txtInputLngMobileProps = {
    ...this.txtInputLngWebProps,
  };

  txtInputLngProps = this.isPlatformWeb()
    ? this.txtInputLngWebProps
    : this.txtInputLngMobileProps;

  txtInputAddressWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputAddressValue: text });
    },
    secureTextEntry: false,
  };

  txtInputAddressMobileProps = {
    ...this.txtInputAddressWebProps,
  };

  txtInputAddressProps = this.isPlatformWeb()
    ? this.txtInputAddressWebProps
    : this.txtInputAddressMobileProps;

  dropdownAddressTypeWebProps = {
    onChangeText: (value: string) => {
      console.log("--------addresstype value------=", value);
      this.setState({ addressTypeValue: value });
    },
  };

  dropdownAddressTypeMobileProps = {
    ...this.dropdownAddressTypeWebProps,
  };

  dropdownAddressTypeProps = this.isPlatformWeb()
    ? this.dropdownAddressTypeWebProps
    : this.dropdownAddressTypeMobileProps;

  handlePressAdd = () => {
    this.props.navigation.navigate("AddAddress");
  };

  handleSavePressed() {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };

    const attrs = {
      latitude: this.state.txtInputLatValue,
      longitude: this.state.txtInputLngValue,
      address: this.state.txtInputAddressValue,
      address_type: this.state.addressTypeValue,
    };

    const httpBody = {
      address: attrs,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiAddAddressCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAddressAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addAddressApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
