Feature: SmsSettingsLogin

    Scenario: User navigates to SmsSettingsLogin
        Given I am a User loading SmsSettingsLogin
        When I navigate to the SmsSettingsLogin
        Then Login as admin
        And Login as user
        And Register as a user or admin