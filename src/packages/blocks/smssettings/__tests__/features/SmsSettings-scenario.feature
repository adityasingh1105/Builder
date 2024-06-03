Feature: SmsSettings

    Scenario: User navigates to SmsSettings
        Given I am a User loading SmsSettings
        When I can navigate from the SmsSettings to the SmsSettingRegistration
        Then I navigate to the SmsSettingRegistration screen after clicking on Sms Setting Registration button 
        When I can navigate from the SmsSettings to the SmsSettingLogin
        Then I navigate to the SmsSettingLogin screen after clicking on Sms Setting login user button
        When I can navigate from the SmsSettings to the SmsSettingAdminLogin
        Then I navigate to the SmsSettingAdminLogin screen after clicking on Sms Setting Admin loginbutton
        When user can close the keyboard by clicking out side of the screen
      