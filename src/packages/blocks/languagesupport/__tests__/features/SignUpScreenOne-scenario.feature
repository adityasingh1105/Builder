Feature: SignUpScreenOne

    Scenario: User navigates to SignUpScreenOne In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then I can Enter the Mobile Number
        And I can Agree to receive SMS messages fronm the roo
        And I can select the Log In button with out errors
        And I can select the Log In button1 with out errors
        And I can select button with out errors
        And If button find some thing wrong they give errors
        And I can leave the screen with out errors
