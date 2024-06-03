Feature: FileAttachment

    Scenario: User navigates to FileAttachmentList
        Given I am a User loading FileAttachmentList
        When I navigate to the FileAttachmentList
        Then FileAttachmentList will load with out errors
        Then I can click close modal
        Then I can click onClick of component
        And I can leave the screen with out errors