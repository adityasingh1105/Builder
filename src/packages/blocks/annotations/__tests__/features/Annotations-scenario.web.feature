Feature: Annotations

    Scenario: User navigates to Annotations
        Given I am a User loading Annotations
        When I navigate to the Annotations
        Then Annotations will load with out errors
        And I can view notes with out errors
        And I can create notes with out errors
        And I can delete notes with out errors
        And I can edit notes with out errors
        And I can leave modal without edit notes with out errors
        And I can leave the screen with out errors