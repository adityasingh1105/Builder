Feature: DownloadUpload

    Scenario: User navigates to DownloadUpload
        Given I am a User loading DownloadUpload
        When I navigate to the DownloadUpload
        Then DownloadUpload will load with out errors
        Then I can change Refrence ID text input value without errors
        Then I can change Refrence Type text input value without errors
