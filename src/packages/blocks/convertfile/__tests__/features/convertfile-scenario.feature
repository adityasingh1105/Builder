Feature: convertfile

    Scenario: User navigates to convertfile
        Given I am a User loading convertfile
        When I navigate to the convertfile
        Then convertfile will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors