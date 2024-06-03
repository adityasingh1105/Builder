Feature: ItemGrouper

Scenario: User navigates to ItemAddtoGroup
    Given I am a User loading ItemAddtoGroup
    When I navigate to the ItemAddtoGroup
    Then ItemGrouper will load with out errors
    Then I can fetch category list data
    Then I can post group with out errors
    Then I can fetch data with error
    Then I can hide modal
    And I can leave the screen with out errors
