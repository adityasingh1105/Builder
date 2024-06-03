Feature: InvestFormWeb

    Scenario: User navigates to InvestFormWeb
        Given I am a User loading InvestFormWeb
        When I navigate to the InvestFormWeb
        Then InvestFormWeb will load with out errors
        Then I can enter invest amount with out errors
        And date will render with out errors
        And I can click invest button with out errors
        And InvestFormWeb Api will return error
        And InvestFormWeb Api will return succes
        And I can leave the screen with out errors