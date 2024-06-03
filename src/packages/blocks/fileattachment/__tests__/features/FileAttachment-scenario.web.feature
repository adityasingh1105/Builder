Feature: FileAttachment

    Scenario: User navigates to FileAttachment
        Given I am a User loading FileAttachment
        When I navigate to the FileAttachment
        Then FileAttachment will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors