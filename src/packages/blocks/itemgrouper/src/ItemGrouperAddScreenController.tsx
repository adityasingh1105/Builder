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
  txtInputOfGroup: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  Category: CategoriesTestInterface[];
  subCategory: SubCategoriesTestInterface[]
  productsListing: ProductListingTestInterface[];
  subExpanded: string
  loader: boolean;
  expanded: string
  categoryform: boolean;
  searchCategory: CategoriesTestInterface[];
  SelectedProduct: string[]
  anchorEl: HTMLElement | null,
  error: boolean,
  CheckUpdate: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export interface CategoriesTestInterface {
  "type": string,
  "id": string,
  "attributes": {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string
  }
}
export interface CategoriesResponseInterface {
  "data":
  {
    "type": string,
    "id": string,
    "attributes": {
      "id": number,
      "name": string,
      "created_at": string,
      "updated_at": string
    }
  }[],

  "meta": {
    "message": "Success"
  }
}

export interface ProductListingTestInterface {
  "type": string,
  "id": string,
  "attributes": {
    "id": number,
    "category": {
      "id": number,
      "name": string,
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
      "updated_at": string,
      "parent_id": number,
      "id": number,
      "name": string,
      "rank": null
    },
    "brand": null,
    "tags"?: string[] | null,
    "reviews"?: string[] | null,
    "description": string,
    "manufacture_date": string,
    "length": null,
    "breadth": null,
    "height": null,
    "stock_qty": null,
    "availability": null,
    "name": string,
    "sku": string,
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


export interface SubCategoriesTestInterface {
  "id": string,
  "type": string,
  "attributes": {
    "name": string,
    "created_at": string,
    "updated_at": string,
    "image": string,
     "id": number,
    "category":
    {
      "id": number
      "name": string
    }[],

  }
}


export interface Product {
  "id": number,
  "category_id": number,
  "sub_category_id": number,
  "brand_id": string | null,
  "name": string,
  "account_item_grouper_id": number,
  "images":
  {
    "id": number,
    "url": string
  }[]

}





export interface GroupedProducts {
  "id": string,
  "type": string,
  "attributes": {
    "id": number,
    "account_id": number,
    "name": string,
    "created_at": string,
    "updated_at": string,
    "products": Product[]
  }
}
export interface BodyNewInterface {

  "group_name"?: string,
  "item_id": string[]
}
interface ErrorMessage {
  message: string;
  errors: ErrorDetail[];
}

interface ErrorDetail {
  message: string;
}



export default class ItemGrouperAddScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getCategorylistApiCallId: string = ""
  getSubCategorylistApiCallId: string = ""
  getProductlistApiCallId: string = ""
  getPostgroupApiCallId: string = ""
  getShowofGroupApiCallId: string = ""
  defaultApiCallId: string = ""
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
      Category: [],
      expanded: "",
      subExpanded: "",
      subCategory: [],
      productsListing: [],
      loader: false,
      categoryform: false,
      searchCategory: [],
      SelectedProduct: [],
      anchorEl: null,
      error: false,
      txtInputOfGroup: "",
      CheckUpdate: this.props.navigation?.history?.location?.state

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
        switch (apiRequestCallId) {
          case this.getCategorylistApiCallId:
            this.getCategoryListSuccessCallbackApi(responseJson);
            break;
          case this.getSubCategorylistApiCallId:
            this.setState({ subCategory: responseJson.data });
            break;
          case this.getProductlistApiCallId:
            this.setState({ productsListing: responseJson.data });
            break;
          case this.getPostgroupApiCallId:
            this.handleResponseofPost(responseJson)
            break;
          case this.getShowofGroupApiCallId:
            this.FilterAllIdsofProduct(responseJson?.data[0]);
            break;
          default:

            break;
        }

      } else if (responseJson && responseJson.errors) {

        if (apiRequestCallId === this.getPostgroupApiCallId) {
          alert(responseJson.errors[0].message)
        }

      }
    }

    // Customizable Area End
  }
  // Customizable Area End

  // Customizable Area Start
  async componentDidMount() {
    this.getListOfCategory()
    if (this.state.CheckUpdate) {
      this.getEditedData()
    }
  }

  handleResponseofPost = (responseJson: ErrorMessage) => {

    if (
      responseJson.message === "Items added to group successfully." || "Group updated successfully."
    ) {
      alert(responseJson.message);
      this.props.navigation.history?.push("ItemGrouper");
    }
  }

  handleInputTag = (event: string) => {
    this.setState({ txtInputOfGroup: event })
  }
  handleAddGroup = async () => {
    let body = {
      "group_name": this.state.txtInputOfGroup,
      "item_id": this.state.SelectedProduct
    }
    if (this.state.txtInputOfGroup !== "") {
      this.setState({ error: false })
      if (this.state.CheckUpdate) {
        this.getPostgroupApiCallId = await this.apiCall({
          contentType: configJSON.validationApiContentType,
          method: configJSON.patchApiEndPoint,
          endPoint: `${configJSON.updateGroupProducts}/${this.state.CheckUpdate}`,
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


    } else {
      this.setState({ error: true })

    }
  }
  getEditedData = async () => {
    let groupId = this.props.navigation?.history?.location?.state
    this.getShowofGroupApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.showDataOfEdit}/${groupId}`

    })
  }
  FilterAllIdsofProduct = (products: GroupedProducts) => {
    const productIds = products.attributes.products.map((proId: Product) => {
      return proId.id.toString()
    }
    )
    this.setState({ SelectedProduct: productIds, txtInputOfGroup: products.attributes.name })
  }
  getListOfCategory = async () => {
    this.setState({ loader: true })
    this.getCategorylistApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getCategoriesApiEndPoint}`

    })
  }
  handleSelectionOfCheckBox = (value: string) => {
    const selectedCheckboxes = this.state.SelectedProduct
    const findIdx = selectedCheckboxes.indexOf(value)
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(value);
    }
    this.setState({
      SelectedProduct: selectedCheckboxes
    })
  }

  apiCall = async (data: { contentType?: string, method?: string, endPoint?: string, body?: BodyNewInterface, type?: string }) => {
    const { contentType, method, endPoint, body, type } = data
    const header = {
      'Content-Type': contentType,
      'token': localStorage.getItem('authToken')

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
  }
  getCategoryListSuccessCallbackApi = (response: CategoriesResponseInterface) => {
    this.setState({
      Category: response.data,
      loader: false,
      searchCategory: response.data

    })

  }
  handleAccordian = (itemDataId: string) => {
    if (itemDataId === this.state.expanded) {
      this.setState({ expanded: "" })
    }
    else {
      this.setState({ expanded: itemDataId })
    }

  }
  handleSubAccordian = (subCatId: string) => {
    if (subCatId === this.state.subExpanded) {
      this.setState({ subExpanded: "" })
    }
    else {
      this.setState({ subExpanded: subCatId })
    }

  }
  handleCloseModal = () => {
    this.setState({ anchorEl: null })
  }
  handleOpenModal = (event: HTMLElement) => {
    this.setState({ anchorEl: event })

  }



  handleSubCategory = async (subCatId: string) => {
    this.getSubCategorylistApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getSubCategoriesApiEndPoint}/${subCatId}`
    })
  }
  handleProducts = async (proId: string) => {
    this.getProductlistApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getProductListApiEndPoint}/${proId}`
    })
  }
  handleChangeText = (event: string) => {
    this.setState({ txtInputValue: event }, () => this.searchcategories())
  }

  searchcategories = () => {
    const searchData = this.state.Category?.filter((item: CategoriesTestInterface) => {
      const itemData =
        item
          ?
          item.attributes.name
            .trim()
            .toLowerCase()
            .replace(/\s/g, "")
          : "".trim().toLowerCase().replace(/\s/g, "");
      const textData = this.state.txtInputValue
        .trim()
        .toLowerCase()
        .replace(/\s/g, "");
      return itemData.indexOf(textData) > -1;
    })
    this.setState({ searchCategory: searchData });
  };

  // Customizable Area End
}
