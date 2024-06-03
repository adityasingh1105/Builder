Feature: Splashscreen

    Scenario: User navigates to Splashscreen
        Given I am a User loading Splashscreen
        When I navigate to the Splashscreen
        Then Splashscreen will load with out errors
        And I can leave the screen with out errors

      Scenario:User navigates to LanguageSupport
            Given User attempting LanguageSupport
            When I navigate to the LanguageSupport    
            Then I should see the LanguageSupport screen 

