Feature: Portfolio

    Scenario: User navigates to Portfolio
        Given I am a User loading Portfolio
        When I navigate to the Portfolio
        Then Portfolio will load with out errors
        Then portFolioFlatList will load with out errors
        And I can see the companyName with with out errors
        And I can see the companyType with with out errors
        And I can see the investAmount with with out errors
        And I can see the dateOfInvest with with out errors
        And Portfolio Api will return error
        And Portfolio Api will return succes
        And I can leave the screen with out errors