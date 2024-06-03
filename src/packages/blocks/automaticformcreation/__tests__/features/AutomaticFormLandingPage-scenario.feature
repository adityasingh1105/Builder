Feature: AutomaticFormLandingPage

    Scenario: User navigates to AutomaticFormLandingPage
        Given I am a User loading AutomaticFormLandingPage
        When I navigate to the AutomaticFormLandingPage
        Then AutomaticFormLandingPage will load with out errors
        And Click on flatlist item
        And Network response from get form api
        And I can leave the screen with out errors