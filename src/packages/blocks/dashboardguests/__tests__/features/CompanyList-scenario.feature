Feature: CompanyList

    Scenario: User navigates to CompanyList
        Given I am a User loading CompanyList
        When I navigate to the CompanyList
        Then CompanyFlatList will load with out errors
        And I can see the companyName with with out errors
        And I can see the companyType with with out errors
        And I can press the investBtn button with out errors
        And CompanyList APi will not run
        And CompanyList Api will return error
        And CompanyList Api will return succes