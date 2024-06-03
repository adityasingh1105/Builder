Feature: Review Approval Basic User

  Scenario: User navigates to review approval basic user screen
    Given I am a User loading ReviewApprovalBasicUser
    When I navigate to the ReviewApprovalBasicUser
    Then ReviewApprovalBasicUser will load without errors
    And I can enter a reviewable id without errors
    And I can select a commentable type without errors
    And I can press the submit button without errors
    And I can leave the screen with out errors
    When I touch to outside of the input field without errors
    And I will see a loading indicator only while loading
    And I should not see a loading indicator if the page is not loading
    And I will not see any success or error message in the first load
    When I change the reviewable id field
    And I can see a result message after submitting the form
