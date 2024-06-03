import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
//@ts-ignore
import unidiff from "unidiff";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  firstString: string;
  secondString: string;
  result: any;
  added: number;
  removed: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TextComparisonController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      firstString: "",
      secondString: "",
      result: [],
      added: 0,
      removed: 0,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidUpdate = (_: any, prevState: any) => {
    if (
      prevState.firstString !== this.state.firstString ||
      prevState.secondString !== this.state.secondString
    ) {
      const result = unidiff.diffLines(
        this.state.firstString,
        this.state.secondString
      );
      console.log(unidiff.formatLines(result));
      this.setState({ result });
    }

    if (prevState.result !== this.state.result) {
      let added = 0;
      let removed = 0;
      this.state.result.map((i: any) => {
        if (i?.added === true) {
          added = added + 1;
        }
        if (i?.removed === true) {
          removed = removed + 1;
        }
      });
      console.log(added, removed);
      this.setState({ added, removed });
    }
  };
  // Customizable Area End
}
