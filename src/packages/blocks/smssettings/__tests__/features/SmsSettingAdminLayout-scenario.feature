Feature: SmsSettingAdminLayout

    Scenario: User navigates to SmsSettingAdminLayout
        Given I am a User loading SmsSettingAdminLayout
        When I navigate to the SmsSettingAdminLayout I have a input field to create a settings
        Then As I enter value in textinput field I can check weather that is correct or wrong
        When I can create a setting by click on submit button
        Then Setting List Data should get update in list
        When SmsSettingAdminLayout will load with setting list
        Then SmssettingAdminlayout screen will load the data
        When I can delete parent settings from the Setting list
        Then I can check the setting is deleted or not
        When I can turn the toggle to be on or off
        Then I can check weather the value is on or off
        When I can create a sub settings from the main setting
        Then I can check sub settings weather is settings
        When I can create a SubSettings by click on the submit button
        Then I can check the subSettings responces is appear or not
        When user can turn on or off subsettings toggles
        Then toggle get update on clicking the switch
        When I can delete child settings from the settings list
        Then I can check weather is delete or not from the list
        