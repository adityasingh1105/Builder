Feature: Watermark

    Scenario: User navigates to Watermark
        Given I am a User loading Watermark
        Then Watermark will load with out errors
        And mounting the screen
        And Handles api gives success
        And onPress action item function triggered
        And waterMarkText function triggered
        And onRemoveLogo function triggered
        And apiCall function triggered
        And navigation function triggered
        And LunchLibrary function triggered
        And openamera function triggered