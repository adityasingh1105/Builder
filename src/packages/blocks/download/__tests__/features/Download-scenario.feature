Feature: Download

    Scenario: User navigates to Download
        Given I am a User loading Download
        When I navigate to the Download
        Then Download will load with out errors
        Then Download FlatList Component will render without errors