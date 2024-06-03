Feature: ReceiptCustomisation

    Scenario: User navigates to ReceiptCustomisation
        Given I am a User loading ReceiptCustomisation
        When I navigate to the ReceiptCustomisation
        Then ReceiptCustomisation will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I press on button to show the password
        And I press on button to hide the password
        And I can leave the screen with out errors