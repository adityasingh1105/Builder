Feature: LanguageSupport

Scenario: User navigates to PhoneVerification
    Given I am a User loading PhoneVerification
    When I navigate to the PhoneVerification
    Then I can enter a Phone Number with out errors
    And I can select checkbox with out errors
    And I can select the Submit button with out errors

    Scenario: User tries to change language
    Given Language change dialog is loading
    When I click on language change button
    Then I can open language dialog
    And I can close language dialog