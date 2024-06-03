Feature: LanguageOptions

    Scenario: User navigates to LanguageOptions
        Given I am a User loading LanguageOptions
        When I navigate to the LanguageOptions
        Then LanguageOptions will load with out errors
        And LanguageOptions will load language without errors
        And LanguageOptions has error in load language
        And LanguageOptions will load language data without errors
        And LanguageOptions has error in load language data
        And I can select language without errors
        And I can click save button without errors
        And I can click back button without errors
        And I can leave the screen with out errors