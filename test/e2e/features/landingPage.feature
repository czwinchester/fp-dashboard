Feature: Landing page

  Scenario: Accessing dashboard landing page

    Given I access the landing page
    Then the title is FordPass Dashboard
    And the FordPass header logo should be displayed
    And the Builds tab should be displayed
    And the latest builds table should be displayed
