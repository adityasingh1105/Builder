Feature: CustomisableUserProfiles

    Scenario: User navigates to CustomisableUserProfiles
        Given I am a User loading CustomisableUserProfiles
        When I navigate to the CustomisableUserProfiles
        Then I type a required field
        Then I checked checkbox
        Then on click cancel
        Then I type a required field again
        Then I click radio
        Then I type date
        Then I keypress integer
        Then I keypress float
        Then update profile result
        Then I can click save
        Then I delete required field
        And I can leave the screen with out errors
