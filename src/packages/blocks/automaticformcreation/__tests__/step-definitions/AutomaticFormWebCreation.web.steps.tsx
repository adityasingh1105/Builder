import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AutomaticFormWebCreation from "../../src/AutomaticFormWebCreation.web";
const navigation = require("react-navigation");

const webScreenProps = {
  navigation: navigation,
  id: "AutomaticFormWebCreation",
};

const webFeature = loadFeature(
  "./__tests__/features/AutomaticFormWebCreation-scenario.web.feature"
);

defineFeature(webFeature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AutomaticFormWebCreation", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AutomaticFormWebCreation;

    given("I am a User loading AutomaticFormWebCreation", () => {
      exampleBlockA = shallow(<AutomaticFormWebCreation {...webScreenProps} />);
    });

    when("I navigate to the AutomaticFormWebCreation", () => {
      instance = exampleBlockA.instance() as AutomaticFormWebCreation;
      instance.componentDidMount(); 
      const event = {name:'Integer_Field',value:'123'}
      // instance.onNewChangeValues(event);
      instance.setState({values:{["Integer Field"]:"123"}})
    //   instance.setState({automaticData:
    //     {
    //         "id": "3",
    //         "type": "form_creation",
    //         "attributes": {
    //             "id": 3,
    //             "name": "New test field",
    //             "description": "test test test",
    //             "field_name": [
    //                 {
    //                     "id": 5,
    //                     "field_name": "Integer Field",
    //                     "field_type": "integer",
    //                     "form_creation_id": 3,
    //                     "created_at": "2023-03-23T13:32:18.564Z",
    //                     "updated_at": "2023-03-23T13:32:18.564Z"
    //                 },
    //             ]
    //         }
    //     }
    // })
     
      instance.callApiFormData();
      instance.renderInputType("text","name");
      instance.renderInputType("integer","name");
      instance.renderInputType("date","name");
      instance.renderInputType("time","name");
      instance.renderInputType("boolean","name");
      //  instance.doButtonPressed();
    });


    then("Network response from put form api", () => {

      const putFormDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: "successfull"
        }
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage.messageId
      );
      instance.putFormId = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);

    })

    then("Network response from api is error", () => {
      const putFormDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": {


          }
        }
      );
      putFormDataMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putFormDataMessage.messageId
      );
      instance.putFormId = putFormDataMessage.messageId;
      runEngine.sendMessage(putFormDataMessage.messageId, putFormDataMessage);

    })

    then("AutomaticFormWebCreation will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
