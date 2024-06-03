Feature: TextSummariserWeb

    Scenario: User navigates to TextSummariserWeb
        Given I am a User loading TextSummariserWeb
        When I navigate to the TextSummariserWeb
        Then TextSummariserWeb will load with out errors
        And I can enter text with out errors
        And I can click on Sub button with with out errors
        And I can click on ADD button with with out errors
        And I can click on summarize button with with out errors
        And api will return succes
        And api will return error