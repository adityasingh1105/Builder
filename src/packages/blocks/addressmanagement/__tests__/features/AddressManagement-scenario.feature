Feature: AddressManagement

    Scenario: User navigates to AddAddress
        Given I am a User loading AddAddress
        When I navigate to the AddAddress
        Then AddAddress will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And Call RestAPIs without errors
        And I can leave the screen with out errors

    Scenario: User navigates to Addresses
        Given I am a User loading Addresses
        When I navigate to the Addresses
        Then Addresses will load with out errors
        And Call RestAPIs without errors
        And I can leave the screen with out errors