 Feature:LanguageSupport

Scenario: User navigates to WelcomeScreen
    Given I am a User loading WelcomeScreen
    When I navigate to the WelcomeScreen 
    And I can select the Submit button with out errors
    And I can click the language button with with out the errors
    And I can click the French language button with with out the errors
    And I can leave the screen with out errors