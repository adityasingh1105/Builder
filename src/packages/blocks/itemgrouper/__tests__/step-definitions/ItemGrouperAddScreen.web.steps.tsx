import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { beforeEach, jest, expect } from '@jest/globals'
import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import ItemGrouperAddScreen from "../../src/ItemGrouperAddScreen.web"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")

const frequntlyaddscreenProps = {
  navigation: navigation,
  id: "ItemGrouperAddScreen"
}

const itemGrouperAddScreenFeature = loadFeature('./__tests__/features/ItemGrouperAddScreen-scenario.web.feature');

defineFeature(itemGrouperAddScreenFeature, (test) => {

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  const subCatData = {
    "data": [
        {
            "id": "43",
            "type": "sub_egory",
            "attributes": {
                "id": 43,
                "name": "Banket",
                "created_at": "2021T05:54:15.792Z",
                "updated_at": "2023-04-2:35.292Z",
                "image": "https://jlaundrtorage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5619ef4d5ef0a25385543e602b97b1eb64512728/tr.jpg",
                "category": [
                    {
                        "id": 8,
                        "name": "Blas"
                    }
                ]
            }
        }
    ],
    "meta": {
        "message": "Success"
    }
}
  const pro_list = {
    "data": [
        {
            "id": "5",
            "type": "catalogue",
            "attributes": {
                "id": 5,
                "category": {
                    "id": 8,
                    "name": "Blankets",
                    "created_at": "2023-04-11T05:48:10.662Z",
                    "updated_at": "2023-04-11T05:48:10.662Z",
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
                    "id": 43,
                    "name": "Bt",
                    "created_at": "2023-5.792Z",
                    "updated_at": "2023-05.292Z",
                    "parent_id": 8,
                    "rank": null
                },
                "brand": null,
                "tags": [],
                "reviews": [],
                "name": "cot",
                "sku": "7415",
                "description": "summter coat",
                "manufacture_date": "200:00.000Z",
                "length": null,
                "breadth": null,
                "height": null,
                "stock_qty": null,
                "availability": null,
                "weight": null,
                "price": 101.0,
                "recommended": null,
                "on_sale": null,
                "sale_price": null,
                "discount": null,
                "loyalty_points": 9,
                "images": [
                    {
                        "id": 7,
                        "url": "httprubytusractive_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--073660c76f072500fac60caa4dd7b8dea90e4856/pexels-blaque-x-863963.jpg"
                    }
                ],
                "average_rating": 0,
                "catalogue_variants": [
                    {
                        "id": "3",
                        "type": "ca_variant",
                        "attributes": {
                            "id": 36,
                            "catalogue_id": 5,
                            "catalogue_variant_color_id": null,
                            "catalogue_variant_size_id": null,
                            "price": null,
                            "stock_qty": 100,
                            "on_sale": null,
                            "sale_price": null,
                            "discount_price": null,
                            "length": null,
                            "breadth": null,
                            "height": null,
                            "created_at": "2023-05-15T07:05:21.573Z",
                            "updated_at": "2023-05-15T07:05:21.573Z",
                            "images": null
                        }
                    }
                ]
            }
        }
    ],
    "meta": {
        "message": "Success"
    }
}
  const cat_data = {
    "data": [
        {
            "id": "8",
            "type": "category",
            "attributes": {
                "id": 8,
                "name": "Bkets",
                "created_at": "2023-04-1.662Z",
                "updated_at": "2023-0.662Z"
            }
        }
    ],
    "meta": {
        "message": "Success"
    }
}
  const grouped_products ={
    "data": [
        {
            "id": "60",
            "type": "item_group_master",
            "attributes": {
                "id": 60,
                "account_id": 4,
                "name": "auny78",
                "created_at": "2023-05-18T06:38:23.964Z",
                "updated_at": "2023-05-18T06:38:23.964Z",
                "products": [
                    {
                        "id": 5,
                        "category_id": 8,
                        "sub_category_id": 43,
                        "brand_id": null,
                        "name": "coat",
                        "account_item_grouper_id": 341,
                        "images": [
                            {
                                "id": 72,
                                "url": "283543-re_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--073660c76f072500fac60caa4dd7b8dea90e4856/pexels-blaque-x-863963.jpg"
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "meta": {
        "message": "Success"
    }
}


  test('User navigates to ItemGrouperAddscreen', ({ given, when, then }) => {
    let itemGrouperAddScreenBloackA: ShallowWrapper;
    let itemGrouperAddScreenInstance: ItemGrouperAddScreen;

    given('User loading ItemGrouperAddscreen', () => {
      itemGrouperAddScreenBloackA = shallow(<ItemGrouperAddScreen {...frequntlyaddscreenProps} />);
    });

    when('I navigate to the ItemGrouperAddscreen', () => {
      itemGrouperAddScreenInstance = itemGrouperAddScreenBloackA.instance() as ItemGrouperAddScreen
    });

    then('ItemgrouperAddScreen is visible', () => {
      itemGrouperAddScreenInstance = itemGrouperAddScreenBloackA.instance() as ItemGrouperAddScreen;
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      )
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
      runEngine.sendMessage('Unit Test', tokenMsg)

      const apicalling = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apicalling.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apicalling
      );
      apicalling.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        cat_data
      );
      apicalling.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apicalling.messageId
      );

      itemGrouperAddScreenInstance.getCategorylistApiCallId = apicalling.messageId;

      runEngine.sendMessage("Unit Test", apicalling);
      const apiError = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiError
      );
      apiError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        error: [
          {
            error: "Failed",
          },
        ],
      });
      apiError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiError.messageId
      );

      itemGrouperAddScreenInstance.getCategorylistApiCallId = apiError.messageId;

      runEngine.sendMessage("Unit Test", apiError);
      expect(itemGrouperAddScreenBloackA).toBeTruthy();

    })
    then('Default Api calling', () => {
     const response ={}
      const defaultApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      defaultApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        defaultApiCall
      );
      defaultApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        response
      );
      defaultApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        defaultApiCall.messageId
      );

      itemGrouperAddScreenInstance.defaultApiCallId = defaultApiCall.messageId;

      runEngine.sendMessage("Unit Test", defaultApiCall);
      expect(itemGrouperAddScreenBloackA).toBeTruthy();
    })
    then(('User can post into Group'), () => {
      const postproductApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      postproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postproductApiCall
      );
      postproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        grouped_products
         
      );
      postproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postproductApiCall.messageId
      );

      itemGrouperAddScreenInstance.getPostgroupApiCallId = postproductApiCall.messageId;

      runEngine.sendMessage("Unit Test", postproductApiCall);
      expect(itemGrouperAddScreenBloackA).toBeTruthy();

  
    })
    then('User can Edit the Groups', () => {


      const EditproductApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      EditproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        EditproductApiCall
      );
      EditproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        grouped_products
      );
      EditproductApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        EditproductApiCall.messageId
      );

      itemGrouperAddScreenInstance.getShowofGroupApiCallId = EditproductApiCall.messageId;

      runEngine.sendMessage("Unit Test", EditproductApiCall);
      expect(itemGrouperAddScreenBloackA).toBeTruthy();

    })
    then(('User Can search from screen'), () => {
      let itemSearchBtn = itemGrouperAddScreenBloackA.findWhere(
        (node) => node.prop("data-test-id") === "input-tag"
      );
      const eventItem = { target: { name: "test", value: "erer" } }
      itemSearchBtn.simulate("change", eventItem)
      expect(itemSearchBtn).toBeTruthy()
    })
    then(('Modal Button Click'), () => {
      let ItemGrouperModalBtn = itemGrouperAddScreenBloackA.findWhere(
        (node) => node.prop("data-test-id") === "modal-save"
      );
      const event = { currentTarget: ItemGrouperModalBtn }
      ItemGrouperModalBtn.simulate("click", event)
      expect(ItemGrouperModalBtn).toBeTruthy()
    })
    then(('Input for Group Name'), () => {
        let ItemGrouperInputBtn = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "Input-group-name"
        );
        const eventItem = { target: { name: "test", value: "test" } }
        ItemGrouperInputBtn.simulate("change", eventItem)
        expect(ItemGrouperInputBtn).toBeTruthy()

      })
    then(('Button For Add group'), () => {
        let ItemBtnForAddGroup = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "btn-for-Add"
        );
        ItemBtnForAddGroup.simulate('click')
        ItemBtnForAddGroup.simulate('click')
        expect(ItemBtnForAddGroup).toBeTruthy()

      })
    then(('handle Accordian1'), () => {
      const categoryApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApiCall
      );
      categoryApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        cat_data
      );
      categoryApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApiCall.messageId
      );
      itemGrouperAddScreenInstance.getCategorylistApiCallId = categoryApiCall.messageId;
      runEngine.sendMessage("Unit Test", categoryApiCall);
        let ItemAccordiaon1 = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "ACC-01"
        );
        
        ItemAccordiaon1.at(0).simulate('change')
        ItemAccordiaon1.at(0).simulate('change')
        expect(ItemAccordiaon1).toBeTruthy()
      })
    then(('handle Accordian2'), () => {
        let ItemAccordiaon2 = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "ACC-02"
        );
        ItemAccordiaon2.at(0).simulate('click')
        expect(ItemAccordiaon2).toBeTruthy()
      })
    then(('handle Accordian3'), () => {
      const subcategoryApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        subcategoryApiCallId
      );
      subcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subCatData
      );
      subcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        subcategoryApiCallId.messageId
      );

      itemGrouperAddScreenInstance.getSubCategorylistApiCallId = subcategoryApiCallId.messageId;

      runEngine.sendMessage("Unit Test", subcategoryApiCallId);
        let ItemAccordiaon3 = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "ACC-03"
        );
        ItemAccordiaon3.at(0).simulate('change')
        ItemAccordiaon3.at(0).simulate('change')
        expect(ItemAccordiaon3).toBeTruthy()


      })
    then(('handle Accordian4'), () => {
        let ItemAccordiaon4 = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "ACC-04"
        );
        ItemAccordiaon4.at(0).simulate('click')
        expect(ItemAccordiaon4).toBeTruthy()


      })
    then(('handle CheckBox Input'), () => {

      const productListCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      productListCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        productListCallId
      );
      productListCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        pro_list
      );
      productListCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        productListCallId.messageId
      );

      itemGrouperAddScreenInstance.getProductlistApiCallId = productListCallId.messageId;

      runEngine.sendMessage("Unit Test", productListCallId);
        let CheckBoxItem = itemGrouperAddScreenBloackA.findWhere(
          (node) => node.prop("data-test-id") === "Check-01"
        );
        CheckBoxItem.at(0).simulate('change')
        expect(CheckBoxItem).toBeTruthy()
      })

    then(('error handling'), () => {

        const responseError = {
          "errors": "something went wrong",
          "data": []
        }
        const Errorhandle = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        Errorhandle.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          Errorhandle
        );
        Errorhandle.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseError
        );
        Errorhandle.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          Errorhandle.messageId
        );
        itemGrouperAddScreenInstance.getCategorylistApiCallId = Errorhandle.messageId;
        runEngine.sendMessage("Unit Test getUserProfileAPICallId", Errorhandle);
        expect(itemGrouperAddScreenBloackA).toBeTruthy();
      })
    then('Data Is not There', () => {
      let ItemGrouperInputBtn = itemGrouperAddScreenBloackA.findWhere(
        (node) => node.prop("data-test-id") === "Input-group-name"
      );
      const eventItem = { target: { name: "test", value: "" } }
      ItemGrouperInputBtn.simulate("change", eventItem)
      let ItemBtnForAddGroup = itemGrouperAddScreenBloackA.findWhere(
        (node) => node.prop("data-test-id") === "btn-for-Add"
      );
      
      ItemBtnForAddGroup.simulate('click')
      expect(itemGrouperAddScreenBloackA).toBeTruthy();
    });


  });
});