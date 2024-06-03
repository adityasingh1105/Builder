Feature: Review Approval Admin

    Scenario: User navigates to review approval admin screen
        Given I am a User loading ReviewApprovalAdmin
        When I navigate to the ReviewApprovalAdmin
        Then ReviewApprovalAdmin will load without errors
        And ReviewApprovalAdmin will display current reviews
        And ReviewApprovalAdmin will display no reviews text if there is no reviews
        And ReviewApprovalAdmin will display alert if there is an error in loading the data
        And I can leave the screen without errors
        When I approve the review
        Then ReviewApprovalAdmin will display approved review text
        When I reject the review
        Then ReviewApprovalAdmin will display rejected review text
        When The list of review approvals updated
        Then The list of review approvals will be displayed correctly
        And I can touch to outside of the input
        And Items on the reviews approvals list will display correctly
        And I can click to approve button of the review approval list items
        And I can click to reject button of the review approval list items
        And Items on the review approval list will have correct account name information
        And Items on the review approval list will have correct review item id information
        And Items on the review approval list will have correct review item type information
        And Items on the review approval list will have correct review section id information
        And Items on the review approval list will have correct review section content information
        When Approval status of any item on the review approval list is approved
        Then Approve button on the review approval list items won't be displayed
        And Reject button on the review approval list items won't be displayed
        And Review approval list items will have correct account name information
        And Review approval list items will have correct review item id information
        And Review approval list items will have correct review item type information
        And Review approval list items will have correct review section id information
        And Review approval list items will have correct review section content information
