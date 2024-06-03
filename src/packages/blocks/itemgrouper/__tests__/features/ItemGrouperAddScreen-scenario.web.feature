Feature: ItemGrouper

    Scenario: User navigates to ItemGrouperAddscreen
        Given User loading ItemGrouperAddscreen
        When I navigate to the ItemGrouperAddscreen
        Then ItemgrouperAddScreen is visible
        Then Default Api calling
        Then User can post into Group
        Then User can Edit the Groups
        Then User Can search from screen
        Then Modal Button Click
        Then Input for Group Name
        Then Button For Add group
        Then handle Accordian1
        Then handle Accordian2
        Then handle Accordian3
        Then handle Accordian4
        Then handle CheckBox Input
        Then error handling
        And Data Is not There
