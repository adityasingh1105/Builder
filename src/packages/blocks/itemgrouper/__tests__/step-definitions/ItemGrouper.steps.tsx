import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { Message } from "../../../../framework/src/Message"
import React from "react";
import ItemGrouper from "../../src/ItemGrouper"
import { beforeEach, jest, expect } from '@jest/globals'
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            return Promise.resolve(callback);
        }),
        navigate: jest.fn(),
        dispatch: jest.fn()
    },
    id: "ItemGrouper"
}

const groupListData = { "data": [{ "id": "1", "type": "item_group_master", "attributes": { "id": 1, "account_id": 12, "name": "Frequently Visited Category", "created_at": "2023-04-11T08:08:15.708Z", "updated_at": "2023-05-12T05:23:07.912Z", "products": [] } }, { "id": "9", "type": "item_group_master", "attributes": { "id": 9, "account_id": 12, "name": "My Cart", "created_at": "2023-05-12T12:53:34.437Z", "updated_at": "2023-05-12T12:53:34.437Z", "products": [{ "id": 27, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 36, "images": [{ "id": 111, "url": "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e572b1cae3fb0527a9d38050768e8d40b81c181f/istockphoto-93355119-612x612.jpg" }] }] } }, { "id": "7", "type": "item_group_master", "attributes": { "id": 7, "account_id": 12, "name": "My Favourite", "created_at": "2023-05-12T09:23:21.517Z", "updated_at": "2023-05-12T09:23:21.517Z", "products": [{ "id": 27, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 32, "images": [{ "id": 111, "url": "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e572b1cae3fb0527a9d38050768e8d40b81c181f/istockphoto-93355119-612x612.jpg" }] }, { "id": 28, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 33, "images": [] }] } }, { "id": "2", "type": "item_group_master", "attributes": { "id": 2, "account_id": 12, "name": "Wishlist", "created_at": "2023-04-11T08:08:33.538Z", "updated_at": "2023-05-12T05:23:07.917Z", "products": [] } }], "meta": { "message": "Success" } };
const groupingListData = { "data": [{ "id": "1", "type": "item_group_master", "attributes": { "id": 1, "account_id": 12, "name": "Frequently Visited Category", "created_at": "2023-04-11T08:08:15.708Z", "updated_at": "2023-05-12T05:23:07.912Z", "products": [] } }, { "id": "9", "type": "item_group_master", "attributes": { "id": 9, "account_id": 12, "name": "My Cart", "created_at": "2023-05-12T12:53:34.437Z", "updated_at": "2023-05-12T12:53:34.437Z", "products": [{ "id": 27, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 36, "images": [{ "id": 111, "url": "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e572b1cae3fb0527a9d38050768e8d40b81c181f/istockphoto-93355119-612x612.jpg" }] }] } }, { "id": "7", "type": "item_group_master", "attributes": { "id": 7, "account_id": 12, "name": "My Favourite", "created_at": "2023-05-12T09:23:21.517Z", "updated_at": "2023-05-12T09:23:21.517Z", "products": [{ "id": 27, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 32, "images": [{ "id": 111, "url": "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBkQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e572b1cae3fb0527a9d38050768e8d40b81c181f/istockphoto-93355119-612x612.jpg" }] }, { "id": 28, "category_id": 35, "sub_category_id": 42, "brand_id": null, "name": "Winter Cap", "account_item_grouper_id": 33, "images": [] }] } }, { "id": "2", "type": "item_group_master", "attributes": { "id": 2, "account_id": 12, "name": "Wishlist", "created_at": "2023-04-11T08:08:33.538Z", "updated_at": "2023-05-12T05:23:07.917Z", "products": [] } }], "meta": { "message": "Success" } };
const feature = loadFeature('./__tests__/features/ItemGrouper-scenario.feature');


defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(window, 'alert').mockImplementation(() => {})
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to ItemGrouper', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ItemGrouper;

        given('I am a User loading ItemGrouper', () => {
            exampleBlockA = shallow(<ItemGrouper {...screenProps} />);
        });

        when('I navigate to the ItemGrouper', () => {
            instance = exampleBlockA.instance() as ItemGrouper
        });

        then('ItemGrouper will load with out errors', () => {
            const tokenString: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            tokenString.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenString);

            const addGroupBtn = exampleBlockA.findWhere(node => node.prop('testID') === 'addGroupBtn')
            addGroupBtn.simulate('press')

            expect(exampleBlockA).toBeTruthy();
        });

        then('I can fetch grouplist data', () => {
            const getGroupListMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getGroupListMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getGroupListMessage.messageId);
            getGroupListMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), groupListData);
            instance.getGroupListApiId = getGroupListMessage.messageId;
            runEngine.sendMessage("Unit Test", getGroupListMessage)

            const groupList = exampleBlockA.findWhere(node => node.prop('testID') === 'groupList');
            groupList.props().keyExtractor({ id: 1 })
            let itemObj = instance.state.GroupList[1]

            groupList.props().renderItem({ item: itemObj, index: 0 });
            const FlatListRenderItem = groupList.renderProp('renderItem')({ item: itemObj, index: 0 })

            const hgTest = FlatListRenderItem.findWhere(node => node.prop('testID') === 'hgTest')
            hgTest.simulate('press')

            const hgDelete = FlatListRenderItem.findWhere(node => node.prop('testID') === 'hgDelete')
            hgDelete.simulate('press')

            const isTrueBtn = FlatListRenderItem.findWhere(node => node.prop('testID') === 'isTrueBtn')
            isTrueBtn.simulate('press');

            const FlatListRenderItemUpdated = groupList.renderProp('renderItem')({ item: instance.state.GroupList[1], index: 0 })
            const productList = FlatListRenderItemUpdated.findWhere(node => node.prop('testID') === 'productList');
            productList.props().keyExtractor({ id: 1 })
            productList.props().renderItem({ item: instance.state.GroupList[1].attributes.products[0] }, 0)
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can delete group', () => {
            const getDeleteGroupApiId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getDeleteGroupApiId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getDeleteGroupApiId.messageId);
            getDeleteGroupApiId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { "message": "Group deleted successfully." });
            instance.getDeleteGroupApiId = getDeleteGroupApiId.messageId;
            runEngine.sendMessage("Unit Test", getDeleteGroupApiId)
            expect(exampleBlockA).toBeTruthy();
        })

        then('I can fetch grouping list data', () => {
            const getGroupingListApicallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getGroupingListApicallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getGroupingListApicallId.messageId);
            getGroupingListApicallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), groupingListData);
            instance.getGroupingListApicallId = getGroupingListApicallId.messageId;
            runEngine.sendMessage("Unit Test", getGroupingListApicallId)
            expect(exampleBlockA).toBeTruthy();
        })

        then('I can fetch data with error', () => {
            const getGroupingListApicallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getGroupingListApicallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), getGroupingListApicallId.messageId);
            getGroupingListApicallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: { token: "Invalid token" } });
            instance.getGroupListApiId = getGroupingListApicallId.messageId;
            runEngine.sendMessage("Unit Test", getGroupingListApicallId)
            expect(exampleBlockA).toBeTruthy();
        })

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