Feature: Editwatermark

    Scenario: User navigates to Editwatermark
        Given I am a User loading Editwatermark
        When I navigate to the Editwatermark
        Then Editwatermark will load with out errors
        And I can hit the getWatermarkApiCallId with out errors
        And I can hit the getWatermarkApiCallId with out errors
        And I can hit the getWatermarkApiCallId with errors
        And Android permission checked
        And captch function is rendering
        And change color function is rendering
        And I can hit the getWatermarkApiCallId with api errors
        And I can hit the editWaterMarkTemplateDownloadId with out errors
        And I can hit the editWaterMarkTemplateDownloadId with errors
        And I can leave the screen with out errors
        And when move image function triggered
      