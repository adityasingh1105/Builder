Feature: AutomaticFormCreation

    Scenario: User navigates to AutomaticFormWebCreation
        Given I am a User loading AutomaticFormWebCreation
        When I navigate to the AutomaticFormWebCreation
        Then Network response from put form api
        And Network response from api is error
        And AutomaticFormWebCreation will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors