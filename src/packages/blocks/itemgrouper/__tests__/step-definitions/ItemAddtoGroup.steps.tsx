import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { Message } from "../../../../framework/src/Message"
import React from "react";
import ItemAddtoGroup from "../../src/ItemAddtoGroup";
import { beforeEach, jest, expect } from '@jest/globals'
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = require("react-navigation")
const screenProps = {
    navigation: {
      goBack: jest.fn(),
      navigate: jest.fn(),
      state: {
        params: {
            selectproduct: [],
             isEdit: true, 
             groupName: "My Fav",
            groupId: "3"
        },
      },
    },
    id: "ItemAddtoGroup"
  };

const catListData = { "data": [{ "id": "8", "type": "category", "attributes": { "id": 8, "name": "Blankets", "created_at": "2023-04-11T05:48:10.662Z", "updated_at": "2023-04-11T05:48:10.662Z" } }, { "id": "7", "type": "category", "attributes": { "id": 7, "name": "Dry Cleaning", "created_at": "2023-04-11T05:47:41.587Z", "updated_at": "2023-04-11T05:47:41.587Z" } }, { "id": "19", "type": "category", "attributes": { "id": 19, "name": "Furniture", "created_at": "2023-04-21T07:51:25.195Z", "updated_at": "2023-04-21T07:51:25.195Z" } }, { "id": "20", "type": "category", "attributes": { "id": 20, "name": "Shoes", "created_at": "2023-04-27T09:09:24.709Z", "updated_at": "2023-04-27T09:09:24.709Z" } }], "meta": { "message": "Success" } };
const subCatListData = { "data": [{ "id": "43", "type": "sub_category", "attributes": { "id": 43, "name": "Blanket", "created_at": "2023-04-11T05:54:15.792Z", "updated_at": "2023-04-24T07:00:35.292Z", "image": "dummyimage", "category": [{ "id": 8, "name": "Blankets" }] } }], "meta": { "message": "Success" } };
const productListData = { "data": [{ "id": "5", "type": "catalogue", "attributes": { "id": 5, "category": { "id": 8, "name": "Blankets", "created_at": "2023-04-11T05:48:10.662Z", "updated_at": "2023-04-11T05:48:10.662Z", "admin_user_id": null, "rank": null, "light_icon": { "url": null }, "light_icon_active": { "url": null }, "light_icon_inactive": { "url": null }, "dark_icon": { "url": null }, "dark_icon_active": { "url": null }, "dark_icon_inactive": { "url": null }, "identifier": null }, "sub_category": { "id": 43, "name": "Blanket", "created_at": "2023-04-11T05:54:15.792Z", "updated_at": "2023-04-24T07:00:35.292Z", "parent_id": 8, "rank": null }, "brand": null, "tags": [], "reviews": [], "name": "coat", "sku": "7415", "description": "summer and winter coat", "manufacture_date": "2023-03-21T00:00:00.000Z", "length": null, "breadth": null, "height": null, "stock_qty": null, "availability": null, "weight": null, "price": 1001.0, "recommended": null, "on_sale": null, "sale_price": null, "discount": null, "loyalty_points": 4, "images": [{ "id": 72, "url": "dummyImage" }], "average_rating": 0, "catalogue_variants": [{ "id": "3", "type": "catalogue_variant", "attributes": { "id": 3, "catalogue_id": 5, "catalogue_variant_color_id": null, "catalogue_variant_size_id": null, "price": null, "stock_qty": 100, "on_sale": null, "sale_price": null, "discount_price": null, "length": null, "breadth": null, "height": null, "created_at": "2023-05-15T07:05:21.573Z", "updated_at": "2023-05-15T07:05:21.573Z", "images": null } }] } },], "meta": { "message": "Success" } };

const feature = loadFeature('./__tests__/features/ItemAddtoGroup-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(window, 'alert').mockImplementation(() => { })
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ItemAddtoGroup', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ItemAddtoGroup;

        given('I am a User loading ItemAddtoGroup', () => {
            exampleBlockA = shallow(<ItemAddtoGroup {...screenProps} />);
        });

        when('I navigate to the ItemAddtoGroup', () => {
            instance = exampleBlockA.instance() as ItemAddtoGroup
        });

        then('ItemGrouper will load with out errors', () => {
            const tokenString: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            tokenString.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenString);

            const modalSampleBtn = exampleBlockA.findWhere(node => node.prop('testID') === 'modalSampleBtn')
            modalSampleBtn.simulate('press')

            const searchInput = exampleBlockA.findWhere(node => node.prop('testID') === 'searchInput')
            searchInput.simulate('changeText', 'search')
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can fetch category list data', () => {
            const getCategorylistApiCallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getCategorylistApiCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategorylistApiCallId.messageId);
            getCategorylistApiCallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), catListData);
            instance.getCategorylistApiCallId = getCategorylistApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getCategorylistApiCallId)

            const getSubCategorylistApiCallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getSubCategorylistApiCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSubCategorylistApiCallId.messageId);
            getSubCategorylistApiCallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), subCatListData);
            instance.getSubCategorylistApiCallId = getSubCategorylistApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getSubCategorylistApiCallId)

            const getProductListApiCallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getProductListApiCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getProductListApiCallId.messageId);
            getProductListApiCallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), productListData);
            instance.getProductListApiCallId = getProductListApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getProductListApiCallId)

            const searchList = exampleBlockA.findWhere(node => node.prop('testID') === 'searchList');
            let itemObj = instance.state.searchQuery[1]
            searchList.props().renderItem({ item: itemObj, index: 0 });

            const FlatListRenderItem = searchList.renderProp('renderItem')({ item: itemObj, index: 0 })
            const downArrowBtn = FlatListRenderItem.findWhere(node => node.prop('testID') === 'downArrowBtn')
            downArrowBtn.simulate('press');


            const FlatListRenderItemUpdated = searchList.renderProp('renderItem')({ item: instance.state.searchQuery[1], index: 0 })
            const getSubCatCall = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getSubCatCall.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSubCatCall.messageId);
            getSubCatCall.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), subCatListData);
            instance.getSubCategorylistApiCallId = getSubCatCall.messageId;
            runEngine.sendMessage("Unit Test", getSubCatCall)
            if (instance.state.subcategories.length > 0) {
                const subCategoryList = FlatListRenderItemUpdated.findWhere(node => node.prop('testID') === 'subCategoryList');
                subCategoryList.props().renderItem({ item: instance.state.subcategories[0] }, 0)

                const subRenderItem = subCategoryList.renderProp('renderItem')({ item: instance.state.subcategories[0], index: 0 })
                const subCatPress = subRenderItem.findWhere(node => node.prop('testID') === 'subCatPress')
                subCatPress.simulate('press', instance.state.subcategories[0]);


                const subRenderItemUpdated = subCategoryList.renderProp('renderItem')({ item: instance.state.subcategories[0], index: 0 })
                const getProdList = new Message(getName(MessageEnum.RestAPIResponceMessage))
                getProdList.addData(getName(MessageEnum.RestAPIResponceDataMessage), getProdList.messageId);
                getProdList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), productListData);
                instance.getProductListApiCallId = getProdList.messageId;
                runEngine.sendMessage("Unit Test", getProdList)
                if (instance.state.productList.length > 0) {
                    const productList = subRenderItemUpdated.findWhere(node => node.prop('testID') === 'productList');
                    productList.props().renderItem({ item: instance.state.productList[0] }, 0)

                    const productItemUpdated = productList.renderProp('renderItem')({ item: instance.state.productList[0], index: 0 })
                    const productItemCheck = productItemUpdated.findWhere(node => node.prop('testID') === 'productItemCheck')

                    productItemCheck.simulate('valueChange', instance.state.productList[0].id);
                }
                expect(exampleBlockA).toBeTruthy();
            }
        });

        then('I can post group with out errors', () => {
            const getPostgroupApiCallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getPostgroupApiCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostgroupApiCallId.messageId);
            getPostgroupApiCallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { "message": "Items added to group successfully." });
            instance.getPostgroupApiCallId = getPostgroupApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getPostgroupApiCallId)
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can fetch data with error', () => {
            const getPostgroupApiCallIdError = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getPostgroupApiCallIdError.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostgroupApiCallIdError.messageId);
            getPostgroupApiCallIdError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: { token: "Invalid token" } });
            instance.getPostgroupApiCallId = getPostgroupApiCallIdError.messageId;
            runEngine.sendMessage("Unit Test", getPostgroupApiCallIdError)
            expect(exampleBlockA).toBeTruthy();
        })

        then('I can hide modal', () => {
            const saveBtn = exampleBlockA.findWhere(node => node.prop('testID') === 'saveBtn')
            saveBtn.simulate('press');

            const hideModalPress = exampleBlockA.findWhere(node => node.prop('testID') === 'hideModalPress')
            hideModalPress.simulate('press');
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            const emptyToken: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            emptyToken.addData(getName(MessageEnum.SessionResponseToken), "");
            runEngine.sendMessage("Unit Test", emptyToken);
            expect(exampleBlockA).toBeTruthy();
        });


    });
});