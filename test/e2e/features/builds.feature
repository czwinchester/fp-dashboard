Feature: Builds

  Background:
    Given the landing page has been accessed
    When the builds navbar button has been clicked

  Scenario: Viewing the latest daily builds
    Then the latest builds table should be visible
    And the latest builds should be displayed in the table
#    And the build status must be displayed in the table for each record
