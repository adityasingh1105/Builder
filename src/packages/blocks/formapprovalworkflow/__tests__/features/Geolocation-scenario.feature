Feature: Geolocation

    Scenario: User navigates to Geolocation
        Given I am a User loading Geolocation
        When I navigate to the Geolocation
        Then Geolocation will load with out errors
        When I click on cancel Button without error
        Then I can leave the screen with out errors