Feature: ItemGrouper

Scenario: User navigates to ItemGrouper
    Given I am a User loading ItemGrouper
    When I navigate to the ItemGrouper
    Then ItemGrouper will load with out errors
    Then I can fetch grouplist data
    Then I can delete group
    Then I can fetch grouping list data
    Then I can fetch data with error
    And I can leave the screen with out errors