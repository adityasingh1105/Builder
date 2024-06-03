// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config");

export interface Props {
}

interface S {
  isUserAuthenticated: boolean;
  isAdmin: boolean;
  currentToken: string;
  currentUser: string;
  currentId: number | undefined;
}

interface SS {
  id: any;
}

export default class SmsSettingsController extends BlockComponent<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
    ];

    this.state = {
      isUserAuthenticated: false,
      isAdmin: false,
      currentUser: "",
      currentToken: "",
      currentId: undefined,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }
  // web events

  setAuthLogin(
    isAdmin: boolean,
    user: string,
    token: string,
    userId?: number | undefined 
  ) {
    this.setState({
      isUserAuthenticated: true,
      isAdmin: isAdmin,
      currentToken: token,
      currentUser: user,
      currentId: userId,
    });
  }
}

// Customizable Area End
