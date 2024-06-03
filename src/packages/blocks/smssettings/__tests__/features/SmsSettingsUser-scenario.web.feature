Feature: SmsSettingsUser

    Scenario: User navigates to SmsSettingsUser
        Given I am a User loading SmsSettingsUser
        When I navigate to the SmsSettingsUser
        Then Fetch initial data and add user to database
        And Update user data after adding to database
        And Test POST after user setting switch
        And Test POST after user subsetting switch