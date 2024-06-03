import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface CategoriesInterface {
  id: string;
  type: string;
  isSelected?: boolean;
  attributes: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
export interface CategoriesCheckInterface {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
  }[];

  meta: {
    message: "Success";
  };
}

export interface SubCatTest {
  id: string;
  type: string;
  isSelected?: boolean;
  attributes: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    image: string;
    category: {
      id: number;
      name: string;
    }[];
  };
}


export interface SubCategoriesInterface {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      image: string;
      category: {
        id: number;
        name: string;
      }[];
    };
  }[];
  meta: {
    message: "Success";
  };
}
export interface Test {
  type: string;
  id: string;
  attributes: {
    updated_at: string;
    id: number;
    name: string;
    created_at: string;
    image: string;
    category: {
      id: number;
      name: string;
    }[];
  };
}
export interface ProductTest {
  "type": string,
  "id": string,
  "isSelected"?: boolean,
  "attributes": {
    "id": number,
    "category": {
      "name": string,
      "id": number,
      "created_at": string,
      "updated_at": string,
      "admin_user_id": null,
      "rank": null,
      "light_icon": {
        "url": null
      },
      "light_icon_active": {
        "url": null
      },
      "light_icon_inactive": {
        "url": null
      },
      "dark_icon": {
        "url": null
      },
      "dark_icon_active": {
        "url": null
      },
      "dark_icon_inactive": {
        "url": null
      },
      "identifier": null
    },
    "sub_category": {
      "created_at": string,
      "name": string,
     "id": number,
      "updated_at": string,
      "parent_id": number,
      "rank": null
    },
    "brand": null,
    "tags"?: string[] | null,
    "reviews"?: string[] | null,
    "name": string,
    "sku": string,
    "description": string,
    "manufacture_date": string,
    "length": null,
    "breadth": null,
    "height": null,
    "stock_qty": null,
    "availability": null,
    "weight": null,
    "price": number,
    "recommended": null,
    "on_sale": null,
    "sale_price": null,
    "discount": null,
    "images":
    {
      "id": number,
      "url": string
    }[],
    "average_rating": number,
    "catalogue_variants": string[]
  }
}



export interface ProductListInterface {
  "data": ProductTest[],

  "meta": {
    "message": string
  }
}

export interface GroupInterface {
  "type": string,
  "id": string,
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

export interface BodyNewInterface {

  "group_name"?: string,
  "item_id": string[]
}

export const globals = {
  namesList: [] as string[],
};
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
  categories: CategoriesInterface[];
  loader: boolean;
  searchQuery: CategoriesInterface[];
  subcategories: SubCatTest[];
  collapese: boolean[];
  collapsedIndex: number;
  productList: ProductTest[];
  select: boolean;
  selectedItems: string[];
  SelectedProduct: string[];
  modalVisible: boolean;
  GroupList: GroupInterface[]
  name: string;
  nameList: string[]
  selectedIndex: number,
  txtInputOfGroup: string;
  error: boolean;
  anchorEl: HTMLElement | null,
  expanded: string;
  subExpanded: string;
  authToken: string,
  CheckEdit: string[],
  isEdit: boolean,
  groupName: string,
  groupId: number,
  refresh:boolean,
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ItemAddtoGroupController extends BlockComponent<
  Props,
  S,
  SS
>
{
  // Customizable Area Start
  getCategorylistApiCallId: string = "";
  getSubCategorylistApiCallId: string = "";
  getProductListApiCallId: string = "";
  getPostgroupApiCallId: string = "";
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
      categories: [],
      loader: false,
      searchQuery: [],
      subcategories: [],
      collapese: [],
      collapsedIndex: 0,
      productList: [],
      select: false,
      selectedItems: [],
      SelectedProduct: [],
      modalVisible: false,
      name: '',
      nameList: [],
      authToken: "",
      CheckEdit: this.props.navigation?.state?.params?.selectproduct,
      GroupList: [],
      selectedIndex: 0,
      txtInputOfGroup: "",
      anchorEl: null,
      error: false,
      expanded: "",
      subExpanded: "",
      refresh:false,
      isEdit: this.props.navigation?.state?.params?.isEdit,
      groupName: this.props.navigation?.state?.params?.groupName,
      groupId: this.props.navigation?.state?.params?.groupId
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
    else if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId && responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getCategorylistApiCallId) {
          this.getCategoryListApiSuccessCallback(responseJson);
        } else if (apiRequestCallId === this.getSubCategorylistApiCallId) {
          this.getSubCategoryListApiSuccessCallback(responseJson);

        }
        else if (apiRequestCallId === this.getProductListApiCallId) {
          this.getProductListSuccessCallBack(responseJson)
        }
        else if (apiRequestCallId === this.getPostgroupApiCallId) {
          let errMessage = responseJson.message
          this.handleErrorMessage(errMessage)

        }
      } else if (responseJson && responseJson.errors) {
        this.handleError(apiRequestCallId)
      }
    }

    // Customizable Area End
  }
  // Customizable Area End

  // Customizable Area Start
  async componentDidMount() {
    this.getAuthToken();
   
    if (this.state.isEdit) {
      this.setState({ SelectedProduct: this.state.CheckEdit }, () => {

      })
    }
  }

  handleToken = (authToken: string) => {
    if (authToken) {
      this.setState({ authToken: authToken }, () => {
        this.getCategorylist();
      });
    } else {
      alert("Please Login First!");
    }
  }

  handleErrorMessage = (errMessage: string) => {
    if (
      errMessage === "Items added to group successfully." ||
      errMessage === "Group updated successfully."
    ) {
      alert(errMessage);
      this.props.navigation.navigate?.("ItemGrouper");
    } else {
      alert(errMessage);
    }
  }

  handleError = (apiRequestCallId: string) => {
    if (apiRequestCallId === this.getCategorylistApiCallId) {
      alert("Something Went Wrong");
    }
   
  }

  handleInputTag = (event: string) => {
    this.setState({ txtInputOfGroup: event }, () => {
    })
  }

  getAuthToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  }
 

  getCategorylist = async () => {
    this.setState({ loader: true });
    this.getCategorylistApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getCategoriesApiEndPoint}`,
    });
  };

  getSubCategorylist = async (itemid: number, index: number) => {
    this.setState({ collapsedIndex: index });
    this.getSubCategorylistApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getSubCategoriesApiEndPoint}${itemid}`,
    });
  };

  apiCall = async (data: {
    contentType?: string;
    method?: string;
    endPoint?: string;
    body?: BodyNewInterface,
    type?: string
  }) => {
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      token: this.state.authToken
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body && type != 'formData' ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      : requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  getCategoryListApiSuccessCallback = (response: CategoriesCheckInterface) => {
    if (response.data) {
      this.setState({
        categories: response.data,
        loader: false,
        searchQuery: response.data,
        collapese: new Array(this.state.categories.length).fill(false),
      }, () => {
      });
    }
  };

  modalSample = () => {
    this.setState({ modalVisible: true })

  }

  isTrue = (item: CategoriesInterface, index: number) =>{
    let change = this.state.categories;
    let selected = change.findIndex(
      (itemFilter) => itemFilter.id === item.id
    );
    change[selected].isSelected = !change[selected].isSelected;
    change.forEach((element) => {      
      if (element.id != item.id) {
        element.isSelected = false;
      }
    });

    this.setState({ categories: change,subcategories:[] }, () => {
     
        this.getSubCategorylist(item.attributes.id, index);
      
     });
  };



  handleSelectItem = (itemId: string) => {
    const { SelectedProduct } = this.state;
    const selectedIndex = SelectedProduct.indexOf(itemId);
    let newSelectedItems: string[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...SelectedProduct, itemId];
    } else {
      newSelectedItems = SelectedProduct.filter((identical) => identical !== itemId);
    }

    this.setState({ SelectedProduct: newSelectedItems }, () => {
    });
  };

  isItemSelected = (itemId: string) => {
    return this.state.SelectedProduct.indexOf(itemId) !== -1
  };

  onPressSub = (item: SubCatTest) => {
    let change = this.state.subcategories;
    let selected = change.findIndex(
      (itemFilter) => itemFilter.id === item.id
    );
    change[selected].isSelected = !change[selected].isSelected;
    change.forEach((element) => {
      if (element.id != item.id) {
        element.isSelected = false;
      }
    });

    this.setState({ subcategories: change,productList:[]}, () => {
      this.handleProducts(item?.id)
   });
  };

  getSubCategoryListApiSuccessCallback = (response: SubCategoriesInterface) => {
    const newArray = [...this.state.collapese];
    newArray[this.state.collapsedIndex] = !newArray[this.state.collapsedIndex];
    this.setState({ collapese: newArray });


    this.setState(
      {
        subcategories: response.data,
      },
()=>{
}
    );
  };

  handleSaveGroup = async () => {
    let body = {
      "group_name": this.state.txtInputOfGroup,
      "item_id": this.state.SelectedProduct
    }

    if (this.state.isEdit) {
      this.getPostgroupApiCallId = await this.apiCall({
        contentType: configJSON.validationApiContentType,
        method: configJSON.patchApiEndPoint,
        endPoint: `${configJSON.updateGroupProducts}/${this.state.groupId}`,
        body: {
          "item_id": this.state.SelectedProduct
        }
      })
    }
    else {
      this.getPostgroupApiCallId = await this.apiCall({
        contentType: configJSON.validationApiContentType,
        method: configJSON.exampleAPiMethod,
        endPoint: `${configJSON.postGroups}`,
        body: body
      })
    }

  }

  getProductListSuccessCallBack = (response: ProductListInterface) => {

    let result = response.data.map((item: ProductTest) => {
      item["isSelected"] = false;
      return item;
    });

    this.setState({ productList: result }, () => {
    });
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  handleProducts = async (proId: string) => {
    this.getProductListApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getProductListApiEndPoint}/${proId}`
    })
  }

  handleChangeText = (event: string) => {
    this.setState({ txtInputValue: event }, () => this.onSearch());
  };

  onSearch = () => {
    const searchData = this.state.categories.filter(
      (item: CategoriesInterface) => {
        const itemData = item
          ? item.attributes.name.trim().toLowerCase().replace(/\s/g, "")
          : "".trim().toLowerCase().replace(/\s/g, "");
        const textData = this.state.txtInputValue
          .trim()
          .toLowerCase()
          .replace(/\s/g, "");
        return itemData.indexOf(textData) > -1;
      }
    );
    this.setState({ searchQuery: searchData });
  };

  // Customizable Area End
}