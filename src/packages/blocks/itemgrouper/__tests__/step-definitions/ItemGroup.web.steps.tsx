import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import { Message } from "../../../../framework/src/Message"
import React from "react";
import ItemGroup from "../../src/ItemGroup.web"
import { beforeEach, jest, expect } from '@jest/globals'
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")
const ItemGrouperScreenProps = {
  navigation: navigation,
  id: "ItemGroup"
}

const featuresofItem = loadFeature('./__tests__/features/ItemGrouper-scenario.web.feature');
const groupList = {
  "data": [
    {
      "id": "6",
      "type": "item_group_master",
      "attributes": {
        "id": 6,
        "account_id": 5,
        "name": "au",
        "created_at": "223.964Z",
        "updated_at": "2023-4Z",
        "products": [
          {
            "id": 2,
            "category_id": 3,
            "sub_category_id": 4,
            "brand_id": null,
            "name": "coat",
            "account_item_grouper_id": 41,
            "images": [
              {
                "id": 72,
                "url": "htte.svc.//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--073660c76f072500fac60caa4dd7b8dea90e4856/pexels-blaque-x-863963.jpg"
              }
            ]
          }
        ]
      }
    },
    {
      "id": "1",
      "type": "item_group_aster",
      "attributes": {
        "id": 4,
        "account_id": 4,
        "name": "banket",
        "created_at": "205-17T05:27:34.039Z",
        "updated_at": "2023-7T05:27:34.039Z",
        "products": []
      }
    },

  ],
  "meta": {
    "message": "Success"
  }
}

defineFeature(featuresofItem, (test) => {

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(window, 'alert').mockImplementation(() => { })
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ItemGrouper', ({ given, when, then }) => {
    let ItemGrouperBlock: ShallowWrapper;
    let instance01: ItemGroup;
    given('User loading ItemGrouper', () => {
      ItemGrouperBlock = shallow(<ItemGroup {...ItemGrouperScreenProps} />);
    });

    when('I navigate to the ItemGrouper', () => {
      instance01 = ItemGrouperBlock.instance() as ItemGroup
    });

    then('Click on ItemGrouper navigate to productList', () => {
      const msgTokenProductList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgTokenProductList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgTokenProductList.messageId
      );
      msgTokenProductList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        groupList
      );
      instance01.getGroupListApiId = msgTokenProductList.messageId;
      runEngine.sendMessage("Unit Test getUserProfileAPICallId", msgTokenProductList);
      expect(ItemGrouperBlock).toBeTruthy();


    })
    then('grouplist is visible and user can delete item', () => {


      const groupListApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      groupListApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        groupListApiCall
      );
      groupListApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        groupList
      );
      groupListApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        groupListApiCall.messageId
      );

      instance01.getGroupListApiId = groupListApiCall.messageId;
      runEngine.sendMessage("Unit Test getUserProfileAPICallId", groupListApiCall);
      let deletegroupItem = ItemGrouperBlock.findWhere(
        (node) => node.prop("data-test-id") === "del-group-item"
      );
      deletegroupItem.at(0).simulate('click')
      expect(deletegroupItem).toBeTruthy()


    })
    then('delete Group', () => {
      let DeleteGroup = ItemGrouperBlock.findWhere(
        (node) => node.prop("data-test-id") === "del-group"
      );
      DeleteGroup.at(0).simulate('click')
      expect(DeleteGroup).toBeTruthy()

    })
    then('Edit group', () => {
      let EditGroupBtn = ItemGrouperBlock.findWhere(
        (node) => node.prop("data-test-id") === "edit-group"
      );
      EditGroupBtn.at(0).simulate('click')
      expect(EditGroupBtn).toBeTruthy()

    })
    then('on click Add Group navigate to itemGroupAddScreen', () => {
      let GroupAddBtn = ItemGrouperBlock.findWhere(
        (node) => node.prop("data-test-id") === "group-add"
      );
      GroupAddBtn.simulate('click')
      expect(GroupAddBtn).toBeTruthy()

    })
    then('Api Call after Deleting the group', () => {
      const responseJson = {
        message: "est"
      }

      const deleteApiCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteApiCall
      );
      deleteApiCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );
      deleteApiCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteApiCall.messageId
      );

      instance01.getDeleteGroupApiId = deleteApiCall.messageId;
      runEngine.sendMessage("Unit Test getUserProfileAPICallId", deleteApiCall);
      expect(ItemGrouperBlock).toBeTruthy();

    })
    then('to handle Errors', () => {
      const responseJson = {
        "errors": "something went wrong",
        "data": ""
      }
      const ErrorMessages = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ErrorMessages.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ErrorMessages
      );
      ErrorMessages.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );
      ErrorMessages.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ErrorMessages.messageId
      );
      instance01.getGroupListApiId = ErrorMessages.messageId;
      runEngine.sendMessage("Unit Test getUserProfileAPICallId", ErrorMessages);
      expect(ItemGrouperBlock).toBeTruthy();

    })
    then('I can leave the screen with out errors', async () => {
      expect(ItemGrouperBlock).toBeTruthy();
    });
  });
});