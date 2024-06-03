Feature: DesktopNotifications

    Scenario: User navigates to DesktopNotifications
        Given I am a User loading DesktopNotifications
        When I navigate to the DesktopNotifications
        Then DesktopNotifications will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors