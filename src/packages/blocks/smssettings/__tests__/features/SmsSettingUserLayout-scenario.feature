Feature: SmsSettingUserLayout

    Scenario: User navigates to SmsSettingUserLayout
        Given I am a User loading SmsSettingUserLayout
        When SmsSettingUserLayout screen should load the data
        Then SmsSettingUserLayout Data get store in the list
        When SmsSettingsuserLayout screen get updated
        Then List get update on the SmsSettingsuserLayout screen
        When I click turn on the main switch to turn on or off
        Then Main switch get update in main userlist
        When I turn off the subSettings

       