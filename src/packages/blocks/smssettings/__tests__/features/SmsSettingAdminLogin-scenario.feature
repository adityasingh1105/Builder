Feature: SmsSettingAdminLogin

    Scenario: User navigates to SmsSettingAdminLogin
        Given I am a User loading SmsSettingAdminLogin
        When I enter the admin user name in the SmsSettingAdminLogin input field
        Then SmsSettingAdminLogin admin user name get will load in the screen
        When I can enter admimPassword in the SmsSettingAdminLogin in the adminPassword
        Then I can check adminPassword weather is correct or not
        When I can click on the submit button after filling all the data
        Then User get navigate to the SmsSettingAdminLayout screen after clicking on submit the creditails
        When user can close keyboard by click without of the screen
        