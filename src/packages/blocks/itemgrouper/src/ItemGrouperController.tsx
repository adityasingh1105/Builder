import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

export interface FocusSubInterface {
  remove: () => void;
}
export interface GroupInterfaceData {

  "data":
  {
    "id": string,
    "type": string,
    "isSelected"?: boolean
    "attributes": {
      "id": number,
      "account_id": number,
      "name": string,
      "created_at": string,
      "updated_at": string,
      "products":
      {
        "id": number,
        "category_id": number,
        "sub_category_id": number,
        "brand_id": null,
        "name": string,
        "account_item_grouper_id": number,
        "images":
        {
          "id": number,
          "url": string
        }[]

      }[]

    }
  }[];
  "meta": {
    "message": "Success"
  }


}

export interface GroupInterface {

  "id": string,
  "type": string,
  "isSelected"?: boolean,
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
      "account_item_grouper_id": number,
      "images":
      {
        "id": number,
        "url": string
      }[],

    }[],
  }

}
export interface ProductGroupInterface {

  "id": number,
  "category_id": number,
  "sub_category_id": number,
  "brand_id": null,
  "name": string,
  "account_item_grouper_id": number,
  "images":
  {
    "id": number,
    "url": string
  }[],


}

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
  GroupList: GroupInterface[];
  authToken: string,
  showNames: boolean,
  refresh:boolean,

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ItemGrouperController extends BlockComponent<
  Props,
  S,
  SS
>
{
  // Customizable Area Start
  getDeleteGroupApiId: string = ""
  getGroupListApiId: string = ""
  getGroupingListApicallId: string = ""
  willFocusContainer: FocusSubInterface = { remove: () => { } };

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
      getName(MessageEnum.SessionResponseToken),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      error: false,
      GroupList: [],
      authToken: "",
      showNames: false,
      refresh:false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let authToken = message.getData(getName(MessageEnum.SessionResponseToken));
      this.handleToken(authToken)
    } 
    
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiRequestCallId && responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getGroupListApiId) {
          let result = responseJson.data.map((item: GroupInterface) => {
            item["isSelected"] = false;
            return item;
          });
          this.setState({ GroupList: result })
        }
        else if (apiRequestCallId === this.getDeleteGroupApiId) {
          this.getProductLsit()
          alert(responseJson.message)
         
        }
       
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getGroupListApiId) {
          this.setState({ GroupList: [] })
          
        }
      }
    }

    // Customizable Area End
  }
  // Customizable Area End

  // Customizable Area Start
  async componentDidMount() {
    
    this.willFocusContainer = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.getAuthToken(); 
     }
    );

  }

  handleToken = (authToken: string) => {
    if (authToken) {
       
      this.setState({ authToken: authToken }, () => {
        this.getProductLsit();
      });
    
    } else {
      alert("Please Login First!");
    }
  }

  isTrue = (item: GroupInterface, index: number) => {
    let change = this.state.GroupList;
    let selected = change.findIndex(
      (itemFilter) => itemFilter.id === item.id
    );
    change[selected].isSelected = !change[selected].isSelected;
    change.forEach((element) => {
      if (element.id != item.id) {
        element.isSelected = false;
      }
    });

    this.setState({ GroupList: change });
  };

  getAuthToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  }
  handleAddGroup = () => {
  
    this.props.navigation.navigate("ItemAddtoGroup", this.state.txtInputValue)
  }

  handleGroupDelete = async (DelGroupId: string) => {
    this.getDeleteGroupApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.DeleteApiMethodType,
      endPoint: `${configJSON.deleteGroup}/${DelGroupId}`
    })
  }

  getProductLsit = async () => {
    this.getGroupListApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getItemGroupes}`
    })
  }

  handleGroupTest = (item: GroupInterface) => {

    let result = item.attributes.products.map((itemData) => {
      return String(itemData.id)
    })
    this.props.navigation.navigate("ItemAddtoGroup", { selectproduct: result, isEdit: true, groupName: item.attributes.name, groupId: item.attributes.id })
  }

  apiCall = async (data: { contentType?: string, method?: string, endPoint?: string }) => {
    const { contentType, method, endPoint } = data
    const header = {
      'Content-Type': contentType,
      token: this.state.authToken,
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