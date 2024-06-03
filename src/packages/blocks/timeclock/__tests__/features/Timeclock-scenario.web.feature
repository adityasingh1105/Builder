Feature: Timeclock

    Scenario: User navigates to Timeclock
        Given I am a User loading Timeclock
        When I navigate to the Timeclock
        Then Timeclock will load with out errors
        And If user has not started game yet
        And I can press start game button with out errors
        And Finish api with error
        And I can press start game button with out timeout errors
        And I can press finish game button with out errors
        And If user game is in progress
        And I can press start game button with errors
        And I can press start game button with 502 errors
        And If user game has ended
        And User status api failed
        And I can leave the screen with out errors