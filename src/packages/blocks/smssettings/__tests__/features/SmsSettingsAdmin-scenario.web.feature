Feature: SmsSettingsAdmin

    Scenario: User navigates to SmsSettingsAdmin
        Given I am a User loading SmsSettingsAdmin
        When I navigate to the SmsSettingsAdmin
        Then Fetch Initial Data without error
        And Test Post after Setting Input
        And Test Post after Switch Setting
        And Test Post after Switch SubSetting
        And Test Delete after Clicking