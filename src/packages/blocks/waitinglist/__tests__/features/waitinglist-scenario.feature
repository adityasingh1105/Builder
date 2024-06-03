Feature: waitinglist

    Scenario: User navigates to waitinglist screen
        Given I am a merchant loading waitinglist
        When I navigate to the waitinglist
        Then waitinglist will load without errors
        When waitinglist will get the user on API call
        When I can set the waiting list data and update with out errors
        Then waitinglist will load API through errors
        
        And I can leave the screen with out errors

      