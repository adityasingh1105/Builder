Feature: Translation

    Scenario: User navigates to Translation
        Given I am a User loading Translation
        When I navigate to the Translation
        Then Translation will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors