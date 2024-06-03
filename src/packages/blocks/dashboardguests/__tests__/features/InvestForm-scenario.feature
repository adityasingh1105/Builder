Feature: InvestForm

    Scenario: User navigates to InvestForm
        Given I am a User loading InvestForm
        When I navigate to the InvestForm
        Then I can enter invest amount with out errors
        And date will render with out errors
        And I can click invest button with out errors
        And InvestForm Api will return error
        And InvestForm Api will return succes