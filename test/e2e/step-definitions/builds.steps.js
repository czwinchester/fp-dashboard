const { client } = require('nightwatch-cucumber')
const { Given, Then, When } = require('cucumber')

Given(/^the landing page has been accessed$/, () => {
  const landingPage = client.page.landingPage()
  return landingPage.navigate()
})

When(/^the builds navbar button has been clicked$/, () => {
  const landingPage = client.page.landingPage()
  return landingPage.click('@buildsTab')
})

Then(/^the latest builds table should be visible$/, () => {
  const buildsPage = client.page.builds()
  return buildsPage.assert.visible('@buildsTable')
})

Then(/^the latest builds should be displayed in the table$/, () => {
  return client.assert.elementCount('.builds-table-row', 26)
})

Given(/^I search for a build or builds$/, () => {
  const buildsPage = client.page.builds()
  return buildsPage.setValue('@searchBar', 'CN 2.0 iOS')
})

Then(/^the appropriate builds should be displayed$/, () => {
  const buildsPage = client.page.builds()
  return buildsPage.assert.elementCount('.builds-table-row', 1)
})

Then(/^the build status must be displayed in the table for each record$/, () => {
  const buildsPage = client.page.builds()
  return client.assert.elementContainsTextCount('span', 'No build', 9) &&
    client.assert.elementContainsTextCount('span', 'Delayed', 1) &&
    client.assert.elementContainsTextCount('span', 'On time', 16)
})
