import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  dataLoading: boolean;
  isStartGame: boolean;
  gameTime: number;
  gameMessage: string;
  alertType: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

type ErrorObject = {
  token: string;
};

type ErrorType = ErrorObject[];

export default class TimeclockController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  startOrFinishGameAPICallID: string = "";
  finishGameAPICallID: string = "";
  userStatusAPICallID: string = "";
  timerIntervalID: ReturnType<typeof setInterval> = setInterval(() => { }, 99999);
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "ABCDEF",
      enableField: false,
      // Customizable Area Start
      dataLoading: false,
      isStartGame: false,
      gameTime: 0,
      gameMessage: "",
      alertType: true,
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        switch (apiRequestCallId) {
          case this.startOrFinishGameAPICallID:
            this.startOrFinishGameApiSuccessCallBack(responseJson);
            break;
          case this.finishGameAPICallID:
            this.finishGameApiSuccessCallBack(responseJson);
            break;
          case this.userStatusAPICallID:
            this.userStatusApiSuccessCallback(responseJson);
            break;
        }
      } else if (responseJson.errors) {
        switch (apiRequestCallId) {
          case this.startOrFinishGameAPICallID:
            this.startOrFinishGameApiFailureCallBack(responseJson);
            break;
          case this.finishGameAPICallID:
            this.finishGameApiFailureCallBack(responseJson);
            break;
          case this.userStatusAPICallID:
            this.userStatusFailureCallback(responseJson);
            break;
        }
      } else if (errorReponse) {
        // Error handling
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setState({ dataLoading: true });
    let token: string = "";

    if (this.isPlatformWeb()) {
      token = localStorage.getItem("authToken") || "";
    } else {
      token = await getStorageData("authToken");
    }

    this.setState({ token }, () => {
      this.checkUserStatusApi();
    });
  }

  checkUserStatusApi = () => {
    this.setState({ dataLoading: true });
    const header = {
      "Content-Type": configJSON.startGameApiContentType,
      "token": this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userStatusAPICallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.whatMyStatusAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.whatMyStatusAPIMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  userStatusApiSuccessCallback = (responseJson: {
    message: string;
    time_left: number;
    status: number;
  }) => {
    this.setState({ dataLoading: false });
    this.setState({ gameTime: responseJson.time_left });
    if (responseJson.status === 0) {
      // When game has not started
    } else if (responseJson.status === 1) {
      this.setState({
        gameTime: responseJson.time_left,
        isStartGame: true,
        gameMessage: responseJson.message,
      });
      this.startTimerOfGame();
      if (!this.isPlatformWeb()) {
        this.clearGameMessage();
      }
    } else if (responseJson.status === 2) {
      this.setState({ gameMessage: responseJson.message });
      if (!this.isPlatformWeb()) {
        this.clearGameMessage();
      }
    }
  };

  userStatusFailureCallback = (responseJson: { errors: ErrorType }) => {
    this.setState({
      dataLoading: false,
      gameMessage: responseJson.errors[0].token,
    });
    if (!this.isPlatformWeb()) {
      this.clearGameMessage();
    }
  };

  clearGameMessage = () => {
    setTimeout(() => {
      this.setState({ gameMessage: "" });
    }, 3000);
  };

  startTimerOfGame = () => {
    this.timerIntervalID = setInterval(() => {
      if (this.state.gameTime > 0) {
        this.setState({ gameTime: this.state.gameTime - 1 });
      } else {
        this.onStartOrFinishGameApi();
      }
    }, 1000);
  };

  onStartGame = () => {
    this.onStartOrFinishGameApi();
  };

  onFinishGame = () => {
    this.finishGameApi();
  };

  onStartOrFinishGameApi = () => {
    this.setState({ dataLoading: true });
    const header = {
      "Content-Type": configJSON.startGameApiContentType,
      "token": this.state.token,
    };

    const httpBody = {
      game: {
        level_id: 1,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.startOrFinishGameAPICallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.startGameAPiEndPoint
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
      configJSON.startGameAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  startOrFinishGameApiSuccessCallBack = (responseJson: {
    message: string;
    status: number;
    time_left: number;
  }) => {
    this.setState({ dataLoading: false });
    if (responseJson && responseJson.status === 0) {
      this.setState({
        isStartGame: false,
        gameTime: responseJson.time_left,
        gameMessage: responseJson.message,
      });
      clearInterval(this.timerIntervalID);
    } else if (responseJson && responseJson.status === 1) {
      this.startTimerOfGame();
      this.setState({ isStartGame: true, gameMessage: responseJson.message });
    }
    if (!this.isPlatformWeb()) {
      this.clearGameMessage();
    }
  };

  startOrFinishGameApiFailureCallBack = (responseJson: {
    errors: ErrorType;
  }) => {
    this.setState({
      dataLoading: false,
      gameMessage: responseJson.errors[0].token,
    });
    if (!this.isPlatformWeb()) {
      this.clearGameMessage();
    }
  };

  finishGameApi = () => {
    this.setState({ dataLoading: true });
    const header = {
      "Content-Type": configJSON.startGameApiContentType,
      "token": this.state.token,
    };

    const httpBody = {
      game: {
        level_id: 1,
      },
      finish: "true",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.finishGameAPICallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.finishGameAPiEndPoint
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
      configJSON.finishGameAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  finishGameApiSuccessCallBack = (responseJson: {
    message: string;
    status: number;
    time_left: number;
  }) => {
    this.setState({ dataLoading: false });
    if (responseJson && responseJson.status === 200) {
      this.setState({ isStartGame: false, gameTime: responseJson.time_left });
      clearInterval(this.timerIntervalID);
    }
    this.setState({ gameMessage: responseJson.message });
    if (!this.isPlatformWeb()) {
      this.clearGameMessage();
    }
  };

  finishGameApiFailureCallBack = (responseJson: { errors: ErrorType }) => {
    this.setState({
      dataLoading: false,
      gameMessage: responseJson.errors[0].token,
    });
    if (!this.isPlatformWeb()) {
      this.clearGameMessage();
    }
  };

  onCloseMessage = () => {
    this.setState({ alertType: true, gameMessage: "" });
  };

  convertHHMMSS = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  };
  // Customizable Area End
}
