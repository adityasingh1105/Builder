Feature: FileAttachment

    Scenario: User navigates to FileAttachmentList
        Given I am a User loading FileAttachmentList
        When I navigate to the FileAttachmentList
        Then FileAttachmentList will load with out errors
        And I can leave the screen with out errors