Feature: LoginWeb

    Scenario: User navigates to LoginWeb
        Given I am a User loading LoginWeb
        When I navigate to the LoginWeb
        Then LoginWeb will load with out errors
        And I can select the country code with with out errors
        And I can enter number with out errors
        And I can press the LoginWeb button with out errors
        And LoginWeb Api will return error
        And LoginWeb Api will return succes
        And I can enter otpWeb with out errors
        And I can click resend otpWeb button with out errors
        And I can click cnacle button with out errors
        And I can click submit button with out errors
        And otpWeb Verification Api will return error
        And otpWeb Verification Api will return succes
        And I can leave the screen with out errors