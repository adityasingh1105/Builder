Feature: waitinglist

    Scenario: User navigates to waitinglist
        Given I am a User loading waitinglist
        When I navigate to the waitinglist
        Then waitinglist will load with out errors
        And Waitinglist will get the user on API call
        And I can set the waiting list data and update with out error
        And Waitinglist will get the error on API call
        And Update waitinglist will get the user on API call
        And Update waitinglist will get the error on API call
        And I can get navigation data
        And I can navigate back to cataloguw with out errors
        And I can cancel the waitinglist order with out errors
