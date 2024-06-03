Feature: SmsSettingRegistration

    Scenario: User navigates to SmsSettingRegistration
        Given I am a User loading SmsSettingRegistration
        When I enter the name in Name field to register
        Then I successfully enter the name
        When I enter my email-id to the email field
        Then I successfully enter the email in the email field
        When I should enter the password in the field
        Then I enter the password in the password the field
        When I should confirm the password in confirm password field
        Then I check the password to confirm 
        When I click on option modal to select user
        When I click on the submit button form
        Then I navigate to the SmsSettings screen
        When I click outside to close the keyboard

     