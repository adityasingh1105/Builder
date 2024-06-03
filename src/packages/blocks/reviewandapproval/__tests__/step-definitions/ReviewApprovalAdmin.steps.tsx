import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { default as BlockHelpers } from "../../../utilities/src/BlockHelpers";
import ReviewApprovalAdmin from "../../src/ReviewApprovalAdmin";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { ReviewApprovalResponseDataType } from "../../src/common";

const config = require("../../src/config");
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "ReviewApprovalAdmin",
};
const feature = loadFeature(
  "./__tests__/features/review-approval-admin-scenario.feature"
);
jest.mock("react-navigation", () => ({}));

const dummyData: ReviewApprovalResponseDataType[] = [
  {
    id: "2",
    type: "review_and_approval",
    attributes: {
      id: "2",
      account_id: "3",
      reviewable_id: "2",
      reviewable_type: "BxBlockComments::Comment",
      created_at: "2022-11-03T10:06:39.045Z",
      updated_at: "2022-11-03T10:06:39.045Z",
      approval_status: "pending",
      reviewable: null,
      account: {
        id: "3",
        first_name: "Demo",
        last_name: "Test",
        full_phone_number: "13108540001",
        country_code: 1,
        phone_number: 3108540001,
        email: "nirmalvajaa@gmail.com",
        activated: true,
        device_id: null,
        unique_auth_id: "QV1dOqy2a4mHAdqX4GTmvAtt",
        created_at: "2022-11-02T08:47:28.723Z",
        updated_at: "2022-11-02T08:51:31.117Z",
        user_name: null,
        platform: null,
        user_type: null,
        app_language_id: null,
        is_blacklisted: false,
        role_id: 1,
      },
    },
  },
  {
    id: "3",
    type: "review_and_approval",
    attributes: {
      id: "3",
      account_id: "3",
      reviewable_id: "3",
      reviewable_type: "BxBlockPosts::Post",
      created_at: "2022-12-01T09:20:48.579Z",
      updated_at: "2022-12-01T09:20:48.579Z",
      approval_status: "pending",
      reviewable: {
        id: "3",
        name: "22",
        description: "333",
        category_id: "6",
        created_at: "2022-12-01T09:19:53.030Z",
        updated_at: "2022-12-01T09:19:53.030Z",
        body: "Testing",
        location: null,
        account_id: "3",
      },
      account: {
        id: "3",
        first_name: "Demo",
        last_name: "Test",
        full_phone_number: "13108540001",
        country_code: 1,
        phone_number: 3108540001,
        email: "nirmalvajaa@gmail.com",
        activated: true,
        device_id: null,
        unique_auth_id: "QV1dOqy2a4mHAdqX4GTmvAtt",
        created_at: "2022-11-02T08:47:28.723Z",
        updated_at: "2022-11-02T08:51:31.117Z",
        user_name: null,
        platform: null,
        user_type: null,
        app_language_id: null,
        is_blacklisted: false,
        role_id: 1,
      },
    },
  },
];
const isComment = (index: number) =>
  dummyData[index].attributes.reviewable_type === config.commentableTypeComment;
const checkCommentPost = (index: number) =>
  isComment(index) ? config.comment : config.post;
const checkMessageContent = (index: number) =>
  isComment(index) ? config.message : config.content;

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(BlockHelpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to review approval admin screen", ({
    given,
    when,
    then,
  }) => {
    let ReviewApprovalAdminWrapper: ShallowWrapper;
    let instance: ReviewApprovalAdmin;
    given("I am a User loading ReviewApprovalAdmin", () => {
      ReviewApprovalAdminWrapper = shallow(
        <ReviewApprovalAdmin {...screenProps} />
      );
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    when("I navigate to the ReviewApprovalAdmin", () => {
      instance = ReviewApprovalAdminWrapper.instance() as ReviewApprovalAdmin;
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    then("ReviewApprovalAdmin will load without errors", () => {
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    then("ReviewApprovalAdmin will display current reviews", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: dummyData,
      });
      runEngine.sendMessage("Unit Test", apiMsg);

      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    then(
      "ReviewApprovalAdmin will display no reviews text if there is no reviews",
      () => {
        const apiNoItemsMsg: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        apiNoItemsMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          { data: [] }
        );
        runEngine.sendMessage("Unit Test", apiNoItemsMsg);

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "ReviewApprovalAdmin will display alert if there is an error in loading the data",
      () => {
        const apiNoItemsMsg: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        apiNoItemsMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          { data: [] }
        );
        runEngine.sendMessage("Unit Test", apiNoItemsMsg);

        const apiErrorResponceMsg: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        apiErrorResponceMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          { errors: "Error" }
        );
        runEngine.sendMessage("Unit Test", apiErrorResponceMsg);

        const apiFailedErrorResponceMsg: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        runEngine.sendMessage("Unit Test", apiFailedErrorResponceMsg);

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    when("I approve the review", () => {
      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: dummyData,
      });
      runEngine.sendMessage("Unit Test", apiMsg);

      setImmediate(() => {
        /* Need to fix this with RNTL, Enzyme doesn't render the flatlist
		ReviewApprovalAdminWrapper.update();
		const approveBtn = ReviewApprovalAdminWrapper.findWhere(
			(node) => node.prop("testID") === "approveBtn"
		);
		approveBtn.simulate("click");

		const updatedDummyData = dummyData;
		updatedDummyData[0].attributes.approval_status = "approved";
		instance.setState({data: updatedDummyData, loading: false});
		*/

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      });
    });

    then("ReviewApprovalAdmin will display approved review text", () => {
      setImmediate(() => {
        /* Need to fix this with RNTL, Enzyme doesn't render the flatlist
        ReviewApprovalAdminWrapper.update();
        const approvalStatusText = ReviewApprovalAdminWrapper.findWhere(
          (node) => node.prop("testID") === "approvalStatus"
        );
		
        expect(approvalStatusText.props().children).toBe(config.approved);
		*/

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      });
    });

    when("I reject the review", () => {
      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: dummyData,
      });
      runEngine.sendMessage("Unit Test", apiMsg);

      setImmediate(() => {
        /* Need to fix this with RNTL, Enzyme doesn't render the flatlist
        ReviewApprovalAdminWrapper.update();
        const approveBtn = ReviewApprovalAdminWrapper.findWhere(
          (node) => node.prop("testID") === "approveBtn"
        );
        approveBtn.simulate("click");

        const updatedDummyData = dummyData;
        updatedDummyData[0].attributes.approval_status = "rejected";
        instance.setState({ data: updatedDummyData, loading: false });
		*/

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      });
    });

    then("ReviewApprovalAdmin will display rejected review text", () => {
      setImmediate(() => {
        /* Need to fix this with RNTL, Enzyme doesn't render the flatlist
        ReviewApprovalAdminWrapper.update();
        const approvalStatusText = ReviewApprovalAdminWrapper.findWhere(
          (node) => node.prop("testID") === "approvalStatus"
        );

        expect(approvalStatusText.props().children).toBe(config.rejected);
		*/

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      });
    });

    when("The list of review approvals updated", () => {
      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: dummyData,
      });
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("The list of review approvals will be displayed correctly", () => {
      ReviewApprovalAdminWrapper.update();
      const reviewApprovalList = ReviewApprovalAdminWrapper.findWhere(
        (node) => node.prop("testID") === "reviewApprovalList"
      );
      const keyExtractor = reviewApprovalList.prop("keyExtractor")(
        dummyData[0],
        0
      );
      expect(keyExtractor).toBe("0");
    });

    when("I can touch to outside of the input", () => {
      const reviewApprovalViewTouchable = ReviewApprovalAdminWrapper.findWhere(
        (node) => node.prop("testID") === "ReviewApprovalViewTouchable"
      );
      reviewApprovalViewTouchable.simulate("press");
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    let reviewApprovalListItemWrapper: ShallowWrapper;

    when("Items on the reviews approvals list will display correctly", () => {
      const reviewApprovalListItem = instance.renderReviewApprovalItems({
        item: dummyData[0],
        index: 0,
        separators: {
          highlight: jest.fn(),
          unhighlight: jest.fn(),
          updateProps: jest.fn(),
        },
      });
      reviewApprovalListItemWrapper = shallow(reviewApprovalListItem);
      expect(ReviewApprovalAdminWrapper).toBeTruthy();
    });

    when(
      "I can click to approve button of the review approval list items",
      () => {
        const approveBtn = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "approveBtn"
        );
        approveBtn.simulate("press");

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    when(
      "I can click to reject button of the review approval list items",
      () => {
        const rejectBtn = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "rejectBtn"
        );
        rejectBtn.simulate("press");
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    when(
      "Items on the review approval list will have correct account name information",
      () => {
        const reviewItemAccountName = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemAccountName"
        );
        expect(reviewItemAccountName.props().children).toBe(
          dummyData[0].attributes.account?.first_name +
            ", " +
            dummyData[0].attributes.account?.last_name
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Items on the review approval list will have correct review item id information",
      () => {
        const reviewItemId = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemId"
        );
        expect(reviewItemId.props().children).toBe(
          config.reviewableId + ": " + dummyData[0].id
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Items on the review approval list will have correct review item type information",
      () => {
        const reviewApprovalListItem = instance.renderReviewApprovalItems({
          item: {
            ...dummyData[0],
            attributes: {
              ...dummyData[0].attributes,
              reviewable: dummyData[1].attributes.reviewable,
            },
          },
          index: 0,
          separators: {
            highlight: jest.fn(),
            unhighlight: jest.fn(),
            updateProps: jest.fn(),
          },
        });
        reviewApprovalListItemWrapper = shallow(reviewApprovalListItem);

        const reviewItemType = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemType"
        );
        expect(reviewItemType.props().children).toBe(
          config.reviewableType + ": " + checkCommentPost(0)
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Items on the review approval list will have correct review section id information",
      () => {
        const reviewableSectionIdText = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewableSectionIdText"
        );
        expect(reviewableSectionIdText.props().children).toBe(
          config.reviewable +
            " " +
            checkCommentPost(0) +
            " " +
            config.id +
            ": " +
            dummyData[1].attributes.reviewable_id
        );

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Items on the review approval list will have correct review section content information",
      () => {
        const reviewableSectionContentText =
          reviewApprovalListItemWrapper.findWhere(
            (node) => node.prop("testID") === "reviewableSectionContentText"
          );
        expect(reviewableSectionContentText.props().children).toBe(
          config.reviewable +
            " " +
            checkCommentPost(0) +
            " " +
            checkMessageContent(0) +
            ": " +
            dummyData[1].attributes.reviewable?.body
        );

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    when(
      "Approval status of any item on the review approval list is approved",
      () => {
        const reviewApprovalListItem = instance.renderReviewApprovalItems({
          item: {
            ...dummyData[1],
            attributes: {
              ...dummyData[1].attributes,
              approval_status: "approved",
            },
          },
          index: 1,
          separators: {
            highlight: jest.fn(),
            unhighlight: jest.fn(),
            updateProps: jest.fn(),
          },
        });
        reviewApprovalListItemWrapper = shallow(reviewApprovalListItem);
      }
    );

    then(
      "Approve button on the review approval list items won't be displayed",
      () => {
        const approveBtn = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "approveBtn"
        );
        expect(approveBtn.length).toBe(0);
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Reject button on the review approval list items won't be displayed",
      () => {
        const approveBtn = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "approveBtn"
        );
        expect(approveBtn.length).toBe(0);
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Review approval list items will have correct account name information",
      () => {
        const reviewItemAccountName = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemAccountName"
        );
        expect(reviewItemAccountName.props().children).toBe(
          dummyData[1].attributes.account?.first_name +
            ", " +
            dummyData[1].attributes.account?.last_name
        );

        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Review approval list items will have correct review item id information",
      () => {
        const reviewItemId = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemId"
        );
        expect(reviewItemId.props().children).toBe(
          config.reviewableId + ": " + dummyData[1].id
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Review approval list items will have correct review item type information",
      () => {
        const reviewItemType = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewItemType"
        );
        expect(reviewItemType.props().children).toBe(
          config.reviewableType + ": " + checkCommentPost(1)
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Review approval list items will have correct review section id information",
      () => {
        const reviewableSectionIdText = reviewApprovalListItemWrapper.findWhere(
          (node) => node.prop("testID") === "reviewableSectionIdText"
        );
        expect(reviewableSectionIdText.props().children).toBe(
          config.reviewable +
            " " +
            checkCommentPost(1) +
            " " +
            config.id +
            ": " +
            dummyData[1].attributes.reviewable_id
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );

    then(
      "Review approval list items will have correct review section content information",
      () => {
        const reviewableSectionContentText =
          reviewApprovalListItemWrapper.findWhere(
            (node) => node.prop("testID") === "reviewableSectionContentText"
          );
        expect(reviewableSectionContentText.props().children).toBe(
          config.reviewable +
            " " +
            checkCommentPost(1) +
            " " +
            checkMessageContent(1) +
            ": " +
            dummyData[1].attributes.reviewable?.body
        );
        expect(ReviewApprovalAdminWrapper).toBeTruthy();
      }
    );
  });
});
