Feature: FormApprovalWorkflow

   Scenario: User navigates to FormApprovalWorkflow
    Given I am a User loading FormApprovalWorkflow
    When I navigate to the FormApprovalWorkflow
    Then FormApprovalWorkflow will load with out errors
And Current Location of user is fetched
      Scenario: User can select locations from dropdown
    Given I am a User selecting drop location
    When user click on drop location select field
    Then user can select option from dropdown list
    And Data will load as per selected options
    And CustomerDetails will be stored
  