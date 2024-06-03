Feature: TextComparison

    Scenario: User navigates to TextComparison
        Given I am a User loading TextComparison
        When I navigate to the TextComparison
        Then TextComparison will load with out errors
        And I can enter text with out errors
        And I can leave the screen with out errors