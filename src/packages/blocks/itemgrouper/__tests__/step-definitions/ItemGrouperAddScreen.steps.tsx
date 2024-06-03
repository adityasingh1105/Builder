import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ItemGrouperAddScreen from "../../src/ItemGrouperAddScreen";
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
    id: "ItemGrouperAddScreen"
  };


const feature = loadFeature('./__tests__/features/ItemGrouperAddScreen-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(window, 'alert').mockImplementation(() => { })
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ItemGrouperAddScreen', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ItemGrouperAddScreen;

        given('I am a User loading ItemGrouperAddScreen', () => {
            exampleBlockA = shallow(<ItemGrouperAddScreen {...screenProps} />);
        });

        when('I navigate to the ItemGrouperAddScreen', () => {
            expect(exampleBlockA).toBeTruthy();

        });

        then('ItemGrouperAddSCreen will load with out errors', () => {
          
            expect(exampleBlockA).toBeTruthy();
        });

      


    });
});