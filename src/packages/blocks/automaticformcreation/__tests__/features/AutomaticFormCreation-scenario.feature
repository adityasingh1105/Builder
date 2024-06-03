Feature: AutomaticFormCreation

    Scenario: User navigates to AutomaticFormCreation
        Given I am a User loading AutomaticFormCreation
        When I navigate to the AutomaticFormCreation
        Then AutomaticFormCreation will load with out errors
        And Network response from put form api
        And Network response from api is error
        And I can select the button with with out errors
        And I can leave the screen with out errors