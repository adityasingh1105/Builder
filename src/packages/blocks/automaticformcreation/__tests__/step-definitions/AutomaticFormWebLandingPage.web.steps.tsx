import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AutomaticFormWebLandingPage from "../../src/AutomaticFormWebLandingPage.web";
// import DataContext from "../../../../components/src/DataContext";

const screenProps = {
  navigation: {
    navigate:jest.fn()
  },
  id: "AutomaticFormWebLandingPage",
};

const feature = loadFeature(
  "./__tests__/features/AutomaticFormWebLandingPage-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AutomaticFormWebLandingPage", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AutomaticFormWebLandingPage;

    given("I am a User loading AutomaticFormWebLandingPage", () => {
      exampleBlockA = shallow(<AutomaticFormWebLandingPage {...screenProps} />);
    });

    when("I navigate to the AutomaticFormWebLandingPage", () => {
      instance = exampleBlockA.instance() as AutomaticFormWebLandingPage;
      instance.componentDidMount(); 
      instance.setState({formData:
        [{
            "id": "3",
            "type": "form_creation",
            "attributes": {
                "id": 3,
                "name": "New test field",
                "description": "test test test",
                "field_name": [
                    {
                        "id": 5,
                        "field_name": "Integer Field",
                        "field_type": "integer",
                        "form_creation_id": 3,
                        "created_at": "2023-03-23T13:32:18.564Z",
                        "updated_at": "2023-03-23T13:32:18.564Z"
                    },
                ]
            }
        }]
    })
      
      instance.getWebFormData();
      // instance.context = DataContext;
    });

    then("Network response from get form api", () => {

      const getMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getMessage
      );
      getMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: "success"
        }
      );
      getMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getMessage.messageId
      );
      instance.formDataId = getMessage.messageId;
      runEngine.sendMessage(getMessage.id, getMessage);

    })

    then("AutomaticFormWebLandingPage will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
