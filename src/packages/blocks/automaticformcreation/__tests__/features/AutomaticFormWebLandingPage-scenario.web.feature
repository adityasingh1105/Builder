Feature: AutomaticFormWebLandingPage

    Scenario: User navigates to AutomaticFormWebLandingPage
        Given I am a User loading AutomaticFormWebLandingPage
        When I navigate to the AutomaticFormWebLandingPage
        Then Network response from get form api
        And AutomaticFormWebLandingPage will load with out errors
        And I can leave the screen with out errors