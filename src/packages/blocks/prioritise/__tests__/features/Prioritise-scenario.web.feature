
Feature: Prioritise

    Scenario: User navigates to Prioritise
        Given I am a User loading Prioritise
        When I navigate to the Prioritise
        Then Prioritise will load with out errors
        Then It should render the Loader
        Then It should render the EmptyView  
        Then It should render the renderRaw
        Then It should handle priority press
        Then It should render the Footer
        Then user will submit data
        And I can leave the screen with out errors
      

        

