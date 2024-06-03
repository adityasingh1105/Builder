Feature: CompanyListWeb

    Scenario: User navigates to CompanyListWeb
        Given I am a User loading CompanyListWeb
        When I navigate to the CompanyListWeb
        Then CompanyListWeb will load with out errors
        Then CompanyMap will load with out errors
        And I can see the companyName with with out errors
        And I can see the companyType with with out errors
        And I can click the investBtn button with out errors
        And CompanyListWeb Api will return error
        And CompanyListWeb Api will return succes
        And I can leave the screen with out errors