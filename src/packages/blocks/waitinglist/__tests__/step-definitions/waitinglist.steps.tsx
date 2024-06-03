import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Waitinglist from "../../src/Waitinglist"
const navigation = {
    navigate: () => jest.fn(),
    goBack: () => jest.fn(),
  };
const screenProps = {
    navigation: navigation,
    id: "orderlist"
}
const data = {
    "data": [
        {
            "id": "151",
            "attributes": {
                "id": 151,
                "order_number": "OD00000151",
                "account_id": 362,
                "total": "500.0",
                "status": "partially_waiting",
                "order_status_id": 1,
                "order_date":'1212 T jnd T gdg',
                "order_items": [
                    {
                        "id": "100",
                        "type": "order_item",
                        "attributes": {
                            "id": 100,
                            "order_id": 151,
                            "quantity": 5,
                            "unit_price": "100.0",
                            "total_price": "500.0",
                            "status": "partially_waiting",
                            "catalogue_id": 1,
                            "waiting_qty": 4,
                            "product_name":"Standard"
                            
                        }
                    }
                ],
            }
        },
        {
            "id": "151",
            "attributes": {
                "id": 151,
                "order_number": "OD00000151",
                "account_id": 362,
                "total": "500.0",
                "status": "partially_waiting",
                "order_status_id": 1,
                "order_items": [
                    {
                        "id": "100",
                        "type": "order_item",
                        "attributes": {
                            "id": 100,
                            "order_id": 151,
                            "quantity": 5,
                            "unit_price": "100.0",
                            "total_price": "500.0",
                            "status": "partially_waiting",
                            "catalogue_id": 1,
                            "waiting_qty": 4,
                            "product_name":""
                            
                        }
                    }
                ],
            }
        },
    ]
}
const updateData={
    "data": {
        "id": "62",
        "type": "order",
        "attributes": {
            "id": 62,
            "order_number": "OD00000015",
            "account_id": 3,
            "coupon_code_id": null,
            "delivery_address_id": null,
            "sub_total": "0.0",
            "total": "300.0",
            "status": "placed",
            "applied_discount": "0.0",
            "cancellation_reason": null,
            "order_date": "2023-03-31T08:13:57.695Z",
            "is_gift": false,
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
            "tax_charges": "0.0",
            "deliver_by": null,
            "tracking_number": null,
            "is_error": false,
            "delivery_error_message": null,
            "order_status_id": 2,
            "is_group": true,
            "is_availability_checked": false,
            "shipping_charge": null,
            "shipping_discount": null,
            "shipping_net_amt": null,
            "shipping_total": null,
            "total_tax": null,
            "created_at": "2023-03-31T08:13:46.876Z",
            "updated_at": "2023-03-31T08:15:06.261Z",
            "delivery_addresses": [],
            "razorpay_order_id": null,
            "order_items": [
                {
                    "id": "55",
                    "type": "order_item",
                    "attributes": {
                        "id": 55,
                        "order_id": 62,
                        "quantity": 3,
                        "unit_price": "100.0",
                        "total_price": "300.0",
                        "old_unit_price": null,
                        "status": "placed",
                        "catalogue_id": 3,
                        "catalogue_variant_id": null,
                        "order_status_id": 2,
                        "placed_at": null,
                        "confirmed_at": null,
                        "in_transit_at": null,
                        "delivered_at": null,
                        "cancelled_at": null,
                        "refunded_at": null,
                        "manage_placed_status": false,
                        "manage_cancelled_status": false,
                        "created_at": "2023-03-31T08:13:46.891Z",
                        "updated_at": "2023-03-31T08:15:06.260Z",
                        "waiting_qty": 0,
                        "order_statuses": null,
                        "delivery_addresses": null,
                        "catalogue": {
                            "id": "3",
                            "type": "catalogue",
                            "attributes": {
                                "category": {
                                    "id": 6,
                                    "name": "Main Cource",
                                    "created_at": "2023-03-23T11:06:49.426Z",
                                    "updated_at": "2023-03-23T11:06:49.426Z",
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
                                    "id": 40,
                                    "name": "Paneer Main Cource",
                                    "created_at": "2023-03-23T11:44:55.664Z",
                                    "updated_at": "2023-03-23T11:44:55.664Z",
                                    "parent_id": null,
                                    "rank": null
                                },
                                "brand": null,
                                "tags": [],
                                "reviews": [],
                                "name": "Paneer Kolhapuri",
                                "sku": null,
                                "description": null,
                                "manufacture_date": null,
                                "length": null,
                                "breadth": null,
                                "height": null,
                                "stock_qty": 1,
                                "availability": null,
                                "weight": null,
                                "price": 100,
                                "recommended": null,
                                "on_sale": null,
                                "sale_price": null,
                                "discount": null,
                                "images": null,
                                "average_rating": 0,
                                "catalogue_variants": []
                            }
                        }
                    }
                }
            ],
            "account": {
                "id": "3",
                "type": "account",
                "attributes": {
                    "activated": false,
                    "email": "srishtib2@yopmail.com",
                    "user_name": "srishti bagga",
                    "role": "user",
                    "description": null,
                    "full_phone_number": null,
                    "full_name": null,
                    "restaurant_location": null,
                    "average_price": null,
                    "operational_hours": null,
                    "website": null,
                    "address": null,
                    "first_name": null,
                    "last_name": null,
                    "tags": [],
                    "country_code": null,
                    "phone_number": null,
                    "images_and_videos": []
                }
            },
            "order_transaction": null
        }
    },
    "meta": {
        "message": "order confirmed successfully"
    }
}
const feature = loadFeature('./__tests__/features/waitinglist-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test("User navigates to waitinglist screen", ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Waitinglist;
    
        given("I am a merchant loading waitinglist", () => {
          exampleBlockA = shallow(<Waitinglist {...screenProps} />);
        });
    
        when("I navigate to the waitinglist", () => {
          instance = exampleBlockA.instance() as Waitinglist;
          
        });
    
        then("waitinglist will load without errors", () => {   
          expect(exampleBlockA).toBeDefined(); 
        });
    
        when('waitinglist will get the user on API call', () => {
          const waitinglistWebApiCallId  = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
          );
          waitinglistWebApiCallId.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              waitinglistWebApiCallId.messageId
          );
          waitinglistWebApiCallId.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify(data))
          );
          instance.waitinglistWebApiCallId = waitinglistWebApiCallId.messageId;
          runEngine.sendMessage("Unit Test", waitinglistWebApiCallId);
          expect(waitinglistWebApiCallId).toBeDefined();
      });
      when('I can set the waiting list data and update with out errors', async () => {
        let navCancelButtonFile = exampleBlockA.findWhere((node) => node.prop('testID') === 'waitinglist_button').first();
            navCancelButtonFile.simulate('press')
            expect(navCancelButtonFile).toBeTruthy();
      })
      then('waitinglist will load API through errors', () => {
          const waitinglistWebApiCallIdError = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
          );
          waitinglistWebApiCallIdError.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              waitinglistWebApiCallIdError.messageId
          );
          waitinglistWebApiCallIdError.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                  errors: [{}]
              }
          );
          instance.waitinglistWebApiCallId = waitinglistWebApiCallIdError.messageId;
          runEngine.sendMessage("Unit Test", waitinglistWebApiCallIdError);
          expect(waitinglistWebApiCallIdError).toBeDefined();
      });
     
      when('I can leave the screen with out errors', () => {
        instance.componentWillUnmount()
        expect(exampleBlockA).toBeTruthy();
    });

   });
    

});
