Feature: Insights page

  Background:
    Given I access the landing page
    Given I have clicked on the insights tab

    Scenario: Viewing insights
      Then the insights page header should be displayed
