import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import ReviewApprovalBasicUser from "../../src/ReviewApprovalBasicUser.web";

const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "ReviewApprovalBasicUser",
};
const feature = loadFeature(
  "./__tests__/features/review-approval-basic-user-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to review approval basic user screen", ({
    given,
    when,
    then,
  }) => {
    let ReviewApprovalBasicUserWrapper: ShallowWrapper;
    let instance: ReviewApprovalBasicUser;
    given("I am a User loading ReviewApprovalBasicUser", () => {
      ReviewApprovalBasicUserWrapper = shallow(
        <ReviewApprovalBasicUser {...screenProps} />
      );
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    when("I navigate to the ReviewApprovalBasicUser", () => {
      instance =
        ReviewApprovalBasicUserWrapper.instance() as ReviewApprovalBasicUser;
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("ReviewApprovalBasicUser will load without errors", () => {
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("I can enter a reviewable id without errors", () => {
      const reviewableIdInput = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "reviewableIdInput"
      );
      expect(reviewableIdInput.length).toBe(1);
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("I can select a commentable type without errors", () => {
      const commentableTypePicker = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "commentableTypePicker"
      );
      expect(commentableTypePicker.length).toBe(1);
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("I can press the submit button without errors", () => {
      const submitBtn = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "submitBtn"
      );
      expect(submitBtn.length).toBe(1);
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    when("I touch to outside of the input field without errors", () => {
      const reviewApprovalViewTouchable =
        ReviewApprovalBasicUserWrapper.findWhere(
          (node) => node.prop("data-testid") === "ReviewApprovalViewTouchable"
        );
      expect(reviewApprovalViewTouchable.length).toBe(0);
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then("I will see a loading indicator only while loading", () => {
      ReviewApprovalBasicUserWrapper.setState({
        loading: true,
      });
      const activityIndicator = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "loader"
      );
      expect(activityIndicator.length).toBe(1);
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });

    then(
      "I should not see a loading indicator if the page is not loading",
      () => {
        ReviewApprovalBasicUserWrapper.setState({
          loading: false,
          resultMessage: null,
        });
        const activityIndicator = ReviewApprovalBasicUserWrapper.findWhere(
          (node) => node.prop("data-testid") === "loader"
        );
        expect(activityIndicator.length).toBe(0);
        expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
      }
    );

    then(
      "I will not see any success or error message in the first load",
      () => {
        let resultMessageTxt = ReviewApprovalBasicUserWrapper.findWhere(
          (node) => node.prop("data-testid") === "resultMessageTxt"
        );
        expect(resultMessageTxt.length).toBe(0);
        expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
      }
    );

    when("I change the reviewable id field", () => {
      const reviewableIdInput = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "reviewableIdInput"
      );
      reviewableIdInput.props().onChange({
        target: { value: "123" },
      });
      setImmediate(() => {
        ReviewApprovalBasicUserWrapper.update();
        expect(
          (
            ReviewApprovalBasicUserWrapper.state() as {
              reviewableIdInput: string;
            }
          ).reviewableIdInput
        ).toBe("123");
        expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
      });
    });

    then("I can see a result message after submitting the form", () => {
      ReviewApprovalBasicUserWrapper.setState({
        resultMessage: "Success",
      });
      const resultMessageTxt = ReviewApprovalBasicUserWrapper.findWhere(
        (node) => node.prop("data-testid") === "resultMessageTxt"
      );
      expect(resultMessageTxt.props().children).toBe("Success");
      expect(ReviewApprovalBasicUserWrapper).toBeTruthy();
    });
  });
});
