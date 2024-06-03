Feature: MultipageForms

    Scenario: User navigates to MultipageForms
        Given I am a User loading MultipageForms
        When I navigate to the MultipageForms
        Then MultipageForms will load with out errors
        And Check textfield onChange method
        And Check formik onSubmit method
        And I can click back with out errors
        And I can enter text with out errors
        And I can click submit button with out errors