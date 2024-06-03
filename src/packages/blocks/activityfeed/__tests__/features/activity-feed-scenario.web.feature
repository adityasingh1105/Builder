Feature: ActivityFeed

    Scenario: User navigates to ActivityFeed
        Given I am a User loading ActivityFeed
        When I navigate to the ActivityFeed
        Then ActivityFeed will load without errors
        Then I can press load more button without errors
        And I can select dropdown without errors
        And I can leave the screen without errors
