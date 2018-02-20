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
  return client.assert.elementCount('.builds-table-row', 28)
})
// Then(/^the build status must be displayed in the table for each record$/, () => {
//   const buildsPage = client.page.builds()
//   return client.assert.elementContainsTextCount('td', 'no_build', 1) &&
//     client.assert.elementContainsTextCount('td', 'delayed', 25) &&
//     client.assert.elementContainsTextCount('td', 'ok', 2) &&
//     buildsPage.assert.visible('@tableHeaderStatus')
// })
