Feature: PortfolioWeb

    Scenario: User navigates to PortfolioWeb
        Given I am a User loading PortfolioWeb
        When I navigate to the PortfolioWeb
        Then PortfolioWeb will load with out errors
        Then portFolioFlatList will load with out errors
        And I can see the companyName with with out errors
        And I can see the companyType with with out errors
        And I can see the investAmount with with out errors
        And I can see the dateOfInvest with with out errors
        And PortfolioWeb Api will return error
        And PortfolioWeb Api will return succes
        And I can leave the screen with out errors