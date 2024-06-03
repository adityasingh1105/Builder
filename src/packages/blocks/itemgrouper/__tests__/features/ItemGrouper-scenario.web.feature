Feature: ItemGrouper

Scenario: User navigates to ItemGrouper
    Given User loading ItemGrouper
    When I navigate to the ItemGrouper
    Then Click on ItemGrouper navigate to productList
    Then grouplist is visible and user can delete item
    Then delete Group
    Then Edit group
    Then on click Add Group navigate to itemGroupAddScreen
    Then Api Call after Deleting the group
    Then to handle Errors
    And I can leave the screen with out errors