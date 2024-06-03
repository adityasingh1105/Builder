import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AnnotationsWeb from "../../src/Annotations.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Annotations",
};

const feature = loadFeature(
  "./__tests__/features/Annotations-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    localStorage.setItem("LOGIN_TOKEN", "3242")
  });

  test("User navigates to Annotations", ({ given, when, then }) => {
    let annotation:ShallowWrapper;
    let instance:AnnotationsWeb; 

    given("I am a User loading Annotations", () => {
      annotation = shallow(<AnnotationsWeb {...screenProps}/>);
    });

    when("I navigate to the Annotations", () => {
      instance = annotation.instance() as AnnotationsWeb
    });

    then("Annotations will load with out errors", () => {
      expect(annotation).toBeTruthy();
      instance.componentDidMount()
    });

    then('I can view notes with out errors', async () => { 
      const createNotesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createNotesAPI.messageId
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data: [{id: 1, attributes:{title:'test', description:'test'}}]}
      );
      instance.createNoteId = createNotesAPI.messageId;
      runEngine.sendMessage("Unit Test", createNotesAPI);   
      let renderReason = annotation.findWhere((node)=>node.prop('data-test-id')==='renderedReason')
      expect(renderReason).toBeTruthy()
    });  

    then('I can create notes with out errors', () => {
      let btnCreateNote = annotation
        .findWhere((node) => 
          node.prop('data-test-id') === 'createNotes'
        );
      btnCreateNote.simulate("click")

      let textInput =   annotation.findWhere((node)=>node.prop('data-test-id')==='titleInput')
      textInput.simulate('change',{target: {value: 'testing'}})
      expect (instance.state.title).toBe('testing')
  
      let descInput =   annotation.findWhere((node)=>node.prop('data-test-id')==='descInput')
      descInput.simulate('change',{target: {value: 'testing'}})
      expect (instance.state.title).toBe('testing')

      let btnCreateSubmitNote = annotation.findWhere((node) => node.prop('data-test-id') === 'createSubmitNote');
      btnCreateSubmitNote.simulate("click")

      const createNotesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createNotesAPI.messageId
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data: {title:'test', desc:'test'}}
      );
      instance.postNoteId = createNotesAPI.messageId;
      runEngine.sendMessage("Unit Test", createNotesAPI);
      expect(annotation).toBeTruthy();
    });
    
     
    then('I can delete notes with out errors', () => {
        const btnDelete = annotation.findWhere((node)=>node.prop('data-test-id')==='deleteNote')
        btnDelete.simulate('click');
        const createNotesAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        createNotesAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          createNotesAPI.messageId
        );
        createNotesAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {data: "Deleted successfully!!"}
        );
        instance.deleteNoteId = createNotesAPI.messageId;
        runEngine.sendMessage("Unit Test", createNotesAPI);  
        expect(annotation).toBeTruthy();  
    });

     then('I can edit notes with out errors', () => {
     
      let btnEditNote = annotation.findWhere((node) => node.prop('data-test-id') === 'editNote');
      // instance.handleSetRenderEditNote();
      btnEditNote.simulate("click")

      let textInput =   annotation.findWhere((node)=>node.prop('data-test-id')==='editTitleInput')
      textInput.simulate('change',{target: {value: 'testing'}})
      expect (instance.state.title).toBe('testing')
  
      let descInput =   annotation.findWhere((node)=>node.prop('data-test-id')==='editDescInput')
      descInput.simulate('change',{target: {value: 'testing'}})
      expect (instance.state.title).toBe('testing')

      let btnCreateSubmitNote = annotation.findWhere((node) => node.prop('data-test-id') === 'btnEditSubmit');
      btnCreateSubmitNote.simulate("click")

      const createNotesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createNotesAPI.messageId
      );
      createNotesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data: {title:'test', desc:'test'}}
      );
      instance.patchNoteId = createNotesAPI.messageId;
      runEngine.sendMessage("Unit Test", createNotesAPI);
      expect(annotation).toBeTruthy();
    });

    then('I can leave modal without edit notes with out errors', () => {
      let btnEditNote = annotation.findWhere((node) => node.prop('data-test-id') === 'editNote');
      btnEditNote.simulate("click")
      let btnCreateSubmitNote = annotation.findWhere((node) => node.prop('data-test-id') === 'btnEditCancel');
      btnCreateSubmitNote.simulate("click");
      expect(annotation).toBeTruthy();
    })
 
    then('I can leave the screen with out errors', () => {
        instance.componentWillUnmount()
        expect(annotation).toBeTruthy();
    });
  });
});
