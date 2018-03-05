const {client} = require('nightwatch-cucumber')
const {Given, Then, When} = require('cucumber')
const landingPage = client.page.landingPage()
const insightsPage = client.page.insights()

Given(/^I have clicked on the insights tab$/, () => {
  return landingPage.navigate().click('@insightsTab')
})

Then(/^the insights page header should be displayed$/, () => {
  return insightsPage.assert.visible('@header')
})
