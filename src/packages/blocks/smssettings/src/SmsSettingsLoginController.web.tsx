// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export interface Props {
  credentials: {
    isAuthenticated: boolean;
    isAdmin: boolean;
    setAuth: Function;
  };
}

interface S {
  loginUser: boolean;
  isRegistering: boolean;
  userEmail: string;
  userPassword: string;
  registerData: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;
  };
}

interface SS {
}

export default class SmsSettingsLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  loginMessageId: string = "";
  registerMessageId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      loginUser: false,
      userEmail: "",
      userPassword: "",
      isRegistering: false,
      registerData: {
        email: "",
        password: "",
        passwordConfirm: "",
        role: "",
        username: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJsonSuccess = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (this.loginMessageId === apiRequestCallId && responseJsonSuccess) {
      if (responseJsonSuccess.meta) {
        const role = responseJsonSuccess.meta.role === "user" ? false : true;
        this.props.credentials.setAuth(
          role,
          responseJsonSuccess.meta.user_name,
          responseJsonSuccess.meta.token[0],
          responseJsonSuccess.meta.id
        );
      }
    }

    if (this.registerMessageId === apiRequestCallId && responseJsonSuccess) {
      if (responseJsonSuccess.meta.token) {
        this.setState({
          isRegistering: false,
        });
      }
    }
  }

  // web events
  setUserEmail = (value: string) => {
    this.setState({
      userEmail: value,
    });
  };

  setUserPassword = (value: string) => {
    this.setState({
      userPassword: value,
    });
  };

  loginAsUser = () => {
    this.setState({
      loginUser: true,
    });
  };

  toRegister = () => {
    this.setState({
      isRegistering: true,
    });
  };

  handleRegisterChange(
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | {
          name?: string;
          value: unknown;
        }
    >
  ) {
    let { name, value } = event.target;
    if (!name) name = "role";
    this.setState({
      registerData: {
        ...this.state.registerData,
        [name]: value,
      },
    });
  }

  loginUser = () => {
    const headers = {
      "Content-Type": "application/json",
      token: "token",
    };
    const endpoint = `/bx_block_smssettings/logins`;
    const method = "POST";
    const body = {
      data: {
        type: "email_user",
        attributes: {
          email: this.state.userEmail,
          password: this.state.userPassword,
        },
      },
    };

    const apiLoginMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.loginMessageId = apiLoginMessage.messageId;

    apiLoginMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiLoginMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiLoginMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiLoginMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    runEngine.sendMessage(apiLoginMessage.id, apiLoginMessage);
  };

  registerUser = () => {
    const headers = {
      "Content-Type": "application/json",
      token: "token",
    };
    const endpoint = `/bx_block_smssettings/users`;
    const method = "POST";
    const body = {
      data: {
        type: "email_user",
        attributes: {
          user_name: this.state.registerData.username,
          email: this.state.registerData.email,
          password: this.state.registerData.password,
          password_confirmation: this.state.registerData.passwordConfirm,
          role: this.state.registerData.role,
        },
      },
    };

    const apiRegisterMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.registerMessageId = apiRegisterMessage.messageId;

    apiRegisterMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    apiRegisterMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    apiRegisterMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    apiRegisterMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    runEngine.sendMessage(apiRegisterMessage.id, apiRegisterMessage);
  };

  goBack = () => {
    this.setState({
      loginUser: false,
      isRegistering: false,
    });
  };
}

// Customizable Area End
