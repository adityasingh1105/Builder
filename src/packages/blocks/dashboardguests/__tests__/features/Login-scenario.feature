Feature: Login

    Scenario: User navigates to Login
        Given I am a User loading Login
        When I navigate to the Login
        And I can select the country code with with out errors
        And I can enter number with out errors
        And I can press the login button with out errors
        And Login Api will return error
        And Login Api will return succes
        And I can enter otp with out errors
        And I can click resend otp button with out errors
        And I can click cnacle button with out errors
        And I can click submit button with out errors
        And Otp Verification Api will return error
        And Otp Verification Api will return succes