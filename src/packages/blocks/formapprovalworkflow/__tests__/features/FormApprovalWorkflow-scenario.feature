Feature: FormApprovalWorkflow

Scenario: User navigates to FormApprovalWorkflow
        Given I am a User loading FormApprovalWorkflow
        When I navigate to the FormApprovalWorkflow
        Then FormApprovalWorkflow will ask permission without errors 
        When I click on Current location
        Then FormApprovalWorkflow will take user current location
        When I enter Destination text without error
        Then I can choose a destination from list
        And I can navigate to GeolocationScreen