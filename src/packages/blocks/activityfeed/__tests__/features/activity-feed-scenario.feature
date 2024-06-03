Feature: ActivityFeed

    Scenario: User navigates to ActivityFeed
        Given I am a User loading ActivityFeed
        When I navigate to the ActivityFeed
        Then ActivityFeed will load without errors
        And activity feed list is rendered
        And I can select dropdown without errors
        And I can leave the screen without errors