import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ItemGroup from "../../src/ItemGroup";
import { beforeEach, jest, expect } from '@jest/globals'

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
    id: "ItemGroup"
  };


const feature = loadFeature('./__tests__/features/ItemGroup-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(window, 'alert').mockImplementation(() => { })
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ItemGroup', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ItemGroup;

        given('I am a User loading ItemGroup', () => {
            exampleBlockA = shallow(<ItemGroup {...screenProps} />);
        });

        when('I navigate to the ItemGroup', () => {
            expect(exampleBlockA).toBeTruthy();

        });

        then('ItemGroup will load with out errors', () => {
          
            expect(exampleBlockA).toBeTruthy();
        });

      


    });
});