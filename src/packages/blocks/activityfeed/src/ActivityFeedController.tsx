import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { ActivityInterface } from "./dataInterface";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  activities: Array<ActivityInterface>;
  fetchedPages: number;
  activityFilter: string;
  token: string;
  accountId: number;
  pickerModalVisibility: boolean
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ActivityFeedController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getActivityApiCallId: string = "";
  activityTypes: string[] = [
    "BxBlockComments::Comment",
    "BxBlockChat::Chat",
    "BxBlockOrderManagement::Order",
    "BxBlockPosts::Post"
  ]
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.state = {
      // Customizable Area Start
      activities: [],
      fetchedPages: 1,
      activityFilter: "",
      token: "",
      accountId: -1,
      pickerModalVisibility: false
      // Customizable Area End
    };
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getToken();
  }

  setFilter(value: string) {
    this.setState({ activityFilter: value, fetchedPages: 1, activities: [] }, () => {
      this.getAcitivityData();
    });
  }

  setModalVisibility(value: boolean) {
    this.setState({ pickerModalVisibility: value })
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  getAcitivityData = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getActivityApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPoint + `?_page=${this.state.fetchedPages}&_limit=10${this.state.activityFilter ? '&trackable_type=' + this.state.activityFilter : ''}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token }, () => {
          this.getAcitivityData();
        });
      }
      else {
        this.props.navigation.goBack();
        return alert("Please Login");
      }
      const messageData = JSON.parse(
        message.getData(getName(MessageEnum.SessionResponseData))
      );
      if (messageData.meta.id) {
        const accountId: number = messageData.meta.id;
        this.setState({ accountId });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getActivityApiCallId.length > 0 &&
      this.getActivityApiCallId === apiRequestCallId &&
      responseJson && responseJson.activities?.length > 0
    ) {
      this.setState({
        activities: [
          ...this.state.activities,
          ...responseJson.activities.filter((activity: ActivityInterface) => activity.owner)
        ],
        fetchedPages: this.state.fetchedPages + 1
      });
    }
  }
  // Customizable Area End
}
