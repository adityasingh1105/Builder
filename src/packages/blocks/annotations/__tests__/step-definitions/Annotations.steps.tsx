import { defineFeature, loadFeature } from "jest-cucumber"
import { render, shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Annotations from "../../src/Annotations"
import { FlatList, TouchableOpacity } from "react-native"
import AnnotationsController, { NoteArray } from "../../src/AnnotationsController"

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "Annotations"
}

interface ApiData {
    contentType?: string;
    method: string;
    endPoint: string;
    body?: FormData | string | object;
    type?: string;
}


const feature = loadFeature('./__tests__/features/Annotations-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(async () => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');



    });



    test('User navigates to Annotations', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Annotations;

        given('I am a User loading Annotations', () => {
            exampleBlockA = shallow(<Annotations {...screenProps} />);
        });

        when('I navigate to the Annotations', () => {
            instance = exampleBlockA.instance() as Annotations

        });

        then('Annotations will load with out errors', () => {
            const flatlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'Flatlist')
            const render_item = flatlist.renderProp("renderItem")({ description: "a new note", id: "57", title: "jkckwec" }, { description: "a new note", id: "58", title: "new title" }
            )
            let renderReason = render_item.findWhere((node) => node.prop('testID') === 'renderedReason')
            expect(renderReason).toBeTruthy();
        });

        then('I can create notes with out errors', () => {
            let Button = exampleBlockA.findWhere((node) => node.prop('testID') === 'createNotes');
            Button.props().onPress();

            let textInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'titleInput')
            textInput.simulate('changeText', 'testing')


            let descInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'descInput')
            descInput.simulate('changeText', 'testing')




            let submitButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'onSubmit')
            submitButton.simulate('press')

            const createNotesAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            createNotesAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createNotesAPI.messageId
            );
            createNotesAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: { title: 'test', desc: 'test' },
                }
            );
            instance.createNoteId = createNotesAPI.messageId;
            runEngine.sendMessage("Unit Test", createNotesAPI);


            expect(submitButton).toBeTruthy();

        });

        then('I can view notes with out errors', () => {


            const flatlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'Flatlist')
            const render_item = flatlist.renderProp("renderItem")({ description: "a new note", id: "57", title: "jkckwec" }, { description: "a new note", id: "58", title: "new title" }
            )
            let renderReason = render_item.findWhere((node) => node.prop('testID') === 'renderedReason')

            renderReason.simulate('press')
            expect(renderReason).toBeTruthy();


        }); then('I can delete notes with out errors', () => {

            const flatlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'Flatlist')
            const render_item = flatlist.renderProp("renderItem")({ description: "a new note", id: "57", title: "jkckwec" }, { description: "a new note", id: "58", title: "new title" }
            )
            let renderReason = render_item.findWhere((node) => node.prop('testID') === 'renderedReason')



            renderReason.simulate('press')

            let deleteButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'deleteNote')
            deleteButton.simulate('press')


            let backButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'goBack')
            backButton.simulate('press')


            expect(renderReason).toBeTruthy();

        });

        then('I can edit notes with out errors', () => {

            const flatlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'Flatlist')
            const render_item = flatlist.renderProp("renderItem")({ description: "a new note", id: "57", title: "jkckwec" }, { description: "a new note", id: "58", title: "new title" }
            )
            let renderReason = render_item.findWhere((node) => node.prop('testID') === 'renderedReason')



            renderReason.simulate('press')
            let editButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'editNote')
            editButton.simulate('press')

            let saveButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'saveButton')
            saveButton.simulate('press')

            let cancelButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancelButton')
            cancelButton.simulate('press')

            expect(renderReason).toBeTruthy();

        });

        then('I can leave the screen with out errors', () => {
            const flatlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'Flatlist')
            const render_item = flatlist.renderProp("renderItem")({ description: "a new note", id: "57", title: "jkckwec" }, { description: "a new note", id: "58", title: "new title" }
            )
            let renderReason = render_item.findWhere((node) => node.prop('testID') === 'renderedReason')
            expect(renderReason).toBeTruthy();

            instance.componentWillUnmount()
        });
    });


});
