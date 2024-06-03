// Customizable Area Start
//@ts-nocheck
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import MessageEnum, {
  getName
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
}

interface S {
  visibleModal: boolean;
  loading: boolean; 
  loading2: boolean;
  latitude: number,
  longitude: number,
  destinationMArker:{},
  sourceMarker:{},
}

interface SS {
}
export default class GeoLocationController extends BlockComponent<Props, S, SS> {
  CreateTrip: string = "";
  CancelTriprequest: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [];
    this.state = {
      latitude: '',
      longitude: '',
      destinationMArker:{},
      sourceMarker:{},
      visibleModal: false,
      loading: true,
      loading2: true,
    }
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.RestAPIResponceSuccessMessage),];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.CreatetripPost();
   
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      
        if (apiRequestCallId === this.CancelTriprequest) {
          this.goBack();
        if (apiRequestCallId && responseJson) {
          this.goBack();
        }
      }
    }
  }
  async componentDidMount() {
    
    super.componentDidMount()
    this.handleSetCoordinates();
  }
  handleSetCoordinates = () => {
     this.setState({
      latitude:this.props.navigation.state.params.latitude,
      longitude:this.props.navigation.state.params.longitude,
      destinationMArker:this.props.navigation?.state?.params?.destinationCoordinate,
      sourceMarker:this.props.navigation?.state?.params?.sourceCoordinate,
    })
  };

cancelTrip(){
  const headers = {
    "Content-Type": configJSON.validationApiContentType,
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNjY5NzA5MjQxfQ.dm7tRVarLyKXWSYnltJdKyBW8y5WrhiEDOPUixDVib7JIKyjjvhvVrkECRjSVvFgTTdZr6Fd2gkdNXQyDkM-1w",
  };

  const getValidationsMsg = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  this.CancelTriprequest = getValidationsMsg.messageId;

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
return true;
}

goBack = () => {
  this.props.navigation.goBack(null);
};

async CreatetripPost() {
  let raws = {
    current_location_latitude: this.state.latitude,
    current_location_longitude: this.state.longitude,
    destination_latitude: this.state.destinationMArker.latitude,
    destination_longitude: this.state.destinationMArker.longitude
  };
  header = {
    "Content-Type": configJSON.validationApiContentType,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNjY5NzA5MjQxfQ.dm7tRVarLyKXWSYnltJdKyBW8y5WrhiEDOPUixDVib7JIKyjjvhvVrkECRjSVvFgTTdZr6Fd2gkdNXQyDkM-1w'
  }


  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  this.CreateTrip = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    'bx_block_formapprovalworkflow/formapprovalworkflows/create_customer_trip'
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestBodyMessage),
    raws
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    'POST'
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  return true;
}


}

// Customizable Area End
