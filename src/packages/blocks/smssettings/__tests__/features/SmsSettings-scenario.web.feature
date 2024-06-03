Feature: SmsSettings

    Scenario: User navigates to SmsSettings
        Given I am a User loading SmsSettings
        When I navigate to the SmsSettings
        Then SmsSettings will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors