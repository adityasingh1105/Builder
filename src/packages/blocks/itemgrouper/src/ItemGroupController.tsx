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

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  error: boolean
  GroupList: GroupListinterface[]
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
interface GroupListinterface {
        "id": string,
        "type": string,
        "attributes": {
          "id": number,
          "account_id": number,
          "name": string,
          "created_at": string,
          "updated_at": string,
          "products": {
  
            "id": number,
            "category_id": number,
            "sub_category_id": number,
            "brand_id": null,
            "name": string,
            "account_item_grouper_id":number,
            "images": 
              {
                "id": number,
                "url": string
              }[]
         }[]
    "meta": {
      "message": "Success"
    }
  }
}
 export interface Product{
    "id": number,
    "category_id": number,
    "sub_category_id": number,
    "brand_id": null,
    "name": string,
    "account_item_grouper_id":number,
    "images": 
      {
        "id": number,
        "url": string
      }[]
 }


export default class ItemGroupController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDeleteGroupApiId: string = ""
  getGroupListApiId: string = ""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      error: false,
      GroupList: []
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));
      this.showAlert("Change Value", "From: " + this.state.txtSavedValue + " To: " + value);
      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiRequestCallId && responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getGroupListApiId) {
          this.setState({ GroupList: responseJson.data })
        }
        else if (apiRequestCallId === this.getDeleteGroupApiId) {
          alert(responseJson.message)
          this.getProductLsit()
        }
      } else if (responseJson && responseJson.errors) {
          if (apiRequestCallId === this.getGroupListApiId) {
            alert("Something Went Wrong")
        }

      }
    }

    // Customizable Area End
  }
  // Customizable Area End

  // Customizable Area Start
  async componentDidMount() {
    this.getProductLsit()
  }
  handleAddGroup = () => {
    this.props.navigation.history?.push("ItemGrouperAddScreen")
  }

  handleInputTag = (event: string) => {
    this.setState({ txtInputValue: event })
  }


  handleGroupDelete = async (DelGroupId: string) => {
    this.getDeleteGroupApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.DeleteApiMethodType,
      endPoint: `${configJSON.deleteGroup}/${DelGroupId}`
    })
  }
  handleGroupItem = async (DelItemId: number) => {
    this.getDeleteGroupApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.DeleteApiMethodType,
      endPoint: `${configJSON.deleteItem}/${DelItemId}`
    })
  }
  getProductLsit = async () => {
    this.getGroupListApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getItemGroupes}`
    })
  }

  handleGroupUpdate = (ListId: string) => {
    this.props.navigation?.history?.push("ItemGrouperAddScreen", ListId)
  }

  apiCall = async (data: { contentType?: string, method?: string, endPoint?: string }) => {
    const { contentType, method, endPoint } = data
    const header = {
      'Content-Type': contentType,
      "token": localStorage.getItem("authToken")
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }






  // Customizable Area End
}
