Feature: GeoLocation


    Scenario: User navigates to GeoLocation
        Given I am a User loading GeoLocation
        When I navigate to the GeoLocation
        Then GeoLocation will load with out errors

    Scenario: We can see the route on map
        Given Coordinates are set
        When Coordinates and route available
        Then Directions service is set
        And Coordinates are set
        And Start Coordinates are set
        And End Coordinates are set
        And Route is calculated
       

    Scenario: User can see the markers
        Given Locations Markers are visible
        When Markers are place on Map
        Then Pickup Marker is visible
        And Destination Marker is visible

    Scenario: To cancel the request
        Given User has a cancel button
        When When user clicks on cancel button
        Then API to cancel search is called
        And User naviagtes back to search page
