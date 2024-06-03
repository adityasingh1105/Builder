Feature: TextSummariser

    Scenario: User navigates to TextSummariser
        Given I am a User loading TextSummariser
        When I navigate to the TextSummariser
        Then TextSummariser will load with out errors
        And I can enter text with out errors
        And I can click on Sub button with with out errors
        And I can click on ADD button with with out errors
        And I can click on summarize button with with out errors
        And api will return succes
        And api will return error