import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

import StorageProvider from "../../../framework/src/StorageProvider";
// import ToastMessage from "../../../components/src/ToastMessage";
import moment from 'moment';

import { Alert } from "react-native";
interface WaitingList {
  'errors': null,
  'data': [
    {
      "id": string,
      "type": string,
      "attributes": {
        "id": number,
        "order_number": string,
        "account_id": number,
        "coupon_code_id": null,
        "delivery_address_id": null,
        "sub_total": string,
        "total": string,
        "status": string,
        "applied_discount": string,
        "cancellation_reason": null,
        "order_date": string,
        "is_gift": boolean,
        "placed_at": null,
        "confirmed_at": null,
        "in_transit_at": null,
        "delivered_at": null,
        "cancelled_at": null,
        "refunded_at": null,
        "source": null,
        "shipment_id": null,
        "delivery_charges": null,
        "tracking_url": null,
        "schedule_time": null,
        "payment_failed_at": null,
        "payment_pending_at": null,
        "returned_at": null,
        "tax_charges": string,
        "deliver_by": null,
        "tracking_number": null,
        "is_error": boolean,
        "delivery_error_message": null,
        "order_status_id": number,
        "is_group": boolean,
        "is_availability_checked": boolean,
        "shipping_charge": null,
        "shipping_discount": null,
        "shipping_net_amt": null,
        "shipping_total": null,
        "total_tax": null,
        "created_at": string,
        "updated_at": string,
        "delivery_addresses": [],
        "razorpay_order_id": null,
        "order_items": [
          {
            "id": string,
            "type": string,
            "attributes": {
              "id": number,
              "order_id": number,
              "quantity": number,
              "unit_price": string,
              "total_price": string,
              "old_unit_price": null,
              "status": string,
              "catalogue_id": number,
              "catalogue_variant_id": null,
              "order_status_id": number,
              "placed_at": null,
              "confirmed_at": null,
              "in_transit_at": null,
              "delivered_at": null,
              "cancelled_at": null,
              "refunded_at": null,
              "manage_placed_status": boolean,
              "manage_cancelled_status": boolean,
              "created_at": string,
              "updated_at": string,
              "waiting_qty": number,
              "order_statuses": null,
              "delivery_addresses": null,
              "product_name":string
            }
          }
        ],
        "order_transaction": null
      }
    }
  ],
  "message": string
}
export interface Waiting {
  id: string,
  type: string,
  attributes:
  {
    id: number,
    order_number: string,
    account_id: number,
    coupon_code_id: null,
    delivery_address_id: null,
    sub_total: string,
    total: string,
    status: string,
    applied_discount: string,
    cancellation_reason: null,
    order_date: string,
    is_gift: boolean,
    placed_at: null,
    confirmed_at: null,
    in_transit_at: null,
    delivered_at: null,
    cancelled_at: null,
    refunded_at: null,
    source: null,
    shipment_id: null,
    delivery_charges: null,
    tracking_url: null,
    schedule_time: null,
    payment_failed_at: null,
    payment_pending_at: null,
    returned_at: null,
    tax_charges: string,
    deliver_by: null,
    tracking_number: null,
    is_error: boolean,
    delivery_error_message: null,
    order_status_id: number,
    is_group: boolean,
    is_availability_checked: boolean,
    shipping_charge: null,
    shipping_discount: null,
    shipping_net_amt: null,
    shipping_total: null,
    total_tax: null,
    created_at: string,
    updated_at: string,
    delivery_addresses: [],
    razorpay_order_id: null,
    order_items:
    [{
      id: string,
      type: string,
      attributes:
      {
        id: number,
        order_id: number,
        quantity: number,
        unit_price: string,
        total_price: string,
        old_unit_price: null,
        status: string,
        catalogue_id: number,
        catalogue_variant_id: null,
        order_status_id: number,
        placed_at: null,
        confirmed_at: null,
        in_transit_at: null,
        delivered_at: null,
        cancelled_at: null,
        refunded_at: null,
        manage_placed_status: boolean,
        manage_cancelled_status: boolean,
        created_at: string,
        updated_at: string,
        waiting_qty: number,
        order_statuses: null,
        delivery_addresses: null,
        product_name:string
      }
    }],
    order_transaction: null
  }
}
interface UpdateWaitingListInterface{
  "meta": {
      "message": string
  },
  "message": string,
  "errors" : Array<string>
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
  productId: string;
  productName:string;
  productStock:number;
  status: boolean;
  waitingListData: Array<Waiting>;
  selectedProductId:string;
  selectedProductName:string;
  selectedProductCategory:string;
  noWaitingListOrderMessage:string;
  selectedProductQuantity:string;
  selectedState:string;
  updateProductModal:boolean;
  stockName:string,
  stockOrderId:string,
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class WaitinglistController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  waitinglistWebApiCallId: string = "";
  updateWaitinglistApiCallId: string = "";

  getCatelogueListApiCallId: string = "";
  updateProductStockApiCallId: string = "";
  getAllOrdersApiCallId: string = "";
  markCompleteOrderApiCallId: string = "";
  waitinglistApiCallId: string = "";
  updateStockApiCallId:string=" "
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.NavigationPropsMessage),
      getName(MessageEnum.NavigationTargetMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // getName(MessageEnum.WaitingListMessage),
    ]
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      waitingListData: [],
      status: true,
      productId: '',
      productName:'',
      productStock:0,
      selectedProductId:'',
      selectedProductName:'',
      selectedProductCategory:'',
      noWaitingListOrderMessage:'',
      selectedProductQuantity:'',
      selectedState:'',
      updateProductModal:false,
      stockName:'',
      stockOrderId:"",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
        if (apiRequestCallId === this.waitinglistWebApiCallId) {
          this.waitinglistOrderResponse(responseJson, errorReponse)
        } 
        if (apiRequestCallId === this.updateWaitinglistApiCallId) {
          this.updateWaitingListResponse(responseJson, errorReponse)
        }
        
    }

  
    // if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
    //   const WaitingListInfo = message.getData(getName(MessageEnum.WaitingListInfo));
    //   if(WaitingListInfo !== null && WaitingListInfo !== undefined){
    //     if(WaitingListInfo.productId){
    //       this.waitinglList(WaitingListInfo.productId)
    //       StorageProvider.set('waitingListInfo', JSON.stringify(WaitingListInfo))
    //       this.setState({
    //         selectedProductId:WaitingListInfo.productId,
    //         selectedProductName:WaitingListInfo.productName,
    //         selectedProductQuantity:WaitingListInfo.stcok,
    //       })
    //     } else {
    //       this.setState({ productId: WaitingListInfo }, () => {
    //         this.waitinglList(this.state.productId);
    //       })
    //     }

    //   }
    // }

   

    // Customizable Area End
  }
 // Customizable Area Start
 async componentDidMount(): Promise<void> {
  let waitingListInfo = await StorageProvider.get('waitingListInfo')
  if(waitingListInfo !== null && waitingListInfo !== undefined){
    let json = JSON.parse(waitingListInfo)
    this.waitinglList(json.productId)
    this.setState({
      selectedProductId:json.productId,
      selectedProductName:json.productName,
      selectedProductCategory:json.productCategory,
    })
  }

}

waitinglistOrderResponse = (responseJson: WaitingList, errorReponse: string) => {
  if (responseJson) {
    if (!responseJson.errors && responseJson.data) {
      this.successWaitingListOrderResponse(responseJson.data)
      this.setState({ waitingListData: responseJson.data })
    } else {
      this.setState({ 
        waitingListData: [],
        noWaitingListOrderMessage :responseJson.message
       })
      //  ToastMessage("error",responseJson.message)
      }
  }
}

updateWaitingListResponse = (responseJson: UpdateWaitingListInterface, errorReponse: string) => {
  if (responseJson && responseJson.meta ) {
    this.successUpdateResponse(responseJson)
    // ToastMessage("success",responseJson.meta.message)
    this.waitinglList(this.state.selectedProductId);
  } else  {
    // ToastMessage("error", responseJson.message ? responseJson.message : responseJson.errors[0])
  } 
}

successWaitingListOrderResponse(responseJson: object) {
}
successUpdateResponse(responseJson: object) {
  Alert.alert("Waitinglist Updated")
  // const mesasge= new Message(getName(MessageEnum.CatalogueMessage));
  // mesasge.addData(getName(MessageEnum.NavigationPropsMessage),this.props);
  // this.send(mesasge);
}

apiCall = async (data: { contentType: string, method: string, endPoint: string, body?: object, type?: string }) => {
  const { contentType, method, endPoint, body, type } = data;

  const header = {
    // "Content-Type": contentType,
    "token": await StorageProvider.get('token-access')
  };
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  body && type === 'formData' ?
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    )
    : 
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    )
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    endPoint
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    method
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  return requestMessage.messageId;
};

// API calls
waitinglList = async (product_id:string) => {
  this.waitinglistWebApiCallId = await this.apiCall({
    contentType: "form-data",
    method: configJSON.validationApiMethodTypeGET,
    endPoint: `${configJSON.waitingListAPiEndPoint}?product_id=${product_id}`,
  });
}

updateWaitingList = async (order_id:string) => {
  
  let formData = new FormData();
  formData.append('order_id', order_id.toString())
  this.updateWaitinglistApiCallId = await this.apiCall({
    contentType: "form-data",
    method: configJSON.validationApiMethodTypePOST,
    endPoint: configJSON.updateWaitingListOrderAPiEndPoint,
    body: formData,
    type : "formData"
  });
}

handleUpdateWaitingList = (order_id:string) => {
  this.updateWaitingList(order_id)
}
backToCataloguePage = () => {
  // const message: Message = new Message(
  //   // getName(MessageEnum.CatalogueMessage)
  // );
  // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  // this.send(message);
}

handleCancelOrder = (orderId:string) => {
  // const message: Message = new Message(
  //   getName(MessageEnum.OrderManagementMessage)
  // );
  // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  // message.addData(getName(MessageEnum.OrderManagementInfo), {orderId});
  // this.send(message);
}

returnNewDataTime = (orderDate:string) => {
  let newTime = new Date(orderDate).toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, hour12:true})
  let newFormateDate = moment(newTime).format('DD-MM-YYYY')
  let newFormateTime = moment(newTime).format('hh:mm A')
  return `${newFormateDate} at ${newFormateTime}`
}
userDateTime=(dateTime:string)=>{
  let time = new Date(dateTime).toLocaleString('en-US', {timeZone: 'Asia/Kolkata', hour12:true})
  let newDate = moment(time).format('DD-MM-YYYY')
  let newTime = moment(time).format('hh:mm A')
  return `${newDate} at ${newTime}`
}
  // Customizable Area End
}
