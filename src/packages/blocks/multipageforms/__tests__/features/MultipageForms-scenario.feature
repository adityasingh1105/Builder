Feature: MultipageForms

    Scenario: User navigates to MultipageForms
        Given I am a User loading MultipageForms
        When I navigate to the MultipageForms
        Then MultipageForms will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors