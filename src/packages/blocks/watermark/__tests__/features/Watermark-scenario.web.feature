Feature: Watermark

    Scenario: User navigates to Watermark
        Given I am a User loading Watermark
        When I navigate to the Watermark
        Then Watermark will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors