Feature: ReceiptCustomisation

    Scenario: User navigates to ReceiptCustomisation
        Given I am a User loading ReceiptCustomisation
        When I navigate to the ReceiptCustomisation
        Then ReceiptCustomisation will load with out errors
        And I can enter firstName text with out errors
        And I can enter lastName text with out errors
        And I can select the button with out errors
        And I can select logo with out errors
        And I can delete logo with out errors
        And I can delete logo
        And I can select documents with out errors
        And I can delete documents with out errors
        And I can select image with out errors
        And I can delete image with out errors
        And If got success response from server
        And If got error response from server
        And Receive function response and error testing
        And If there is no errors this will execute
        And If got errors this will execute
