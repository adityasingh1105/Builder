Feature: ItemGroup

Scenario: User navigates to ItemGroup
    Given I am a User loading ItemGroup
    When I navigate to the ItemGroup
    Then ItemGroup will load with out errors