Feature: FileAttachment

    Scenario: User navigates to FileAttachment
        Given I am a User loading FileAttachment
        When I navigate to the FileAttachment
        Then FileAttachment will load with out errors
        Then I can click close modal
        And I can leave the screen with out errors