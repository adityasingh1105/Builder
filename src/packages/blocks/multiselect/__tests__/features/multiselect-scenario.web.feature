Feature: multiselect

    Scenario: User navigates to multiselect
        Given I am a User loading multiselect
        When I navigate to the multiselect
        Then multiselect will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors