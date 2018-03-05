const {client} = require('nightwatch-cucumber')
const {Given, Then, When} = require('cucumber')
const landingPage = client.page.landingPage()

Given(/^I access the landing page$/, () => {
  const landingPage = client.page.landingPage()

  return landingPage
    .navigate()
})

Then(/^the title is FordPass Builds$/, () => {
  return client.assert.title('FordPass Builds')
})

Then(/^the FordPass header logo should be displayed$/, () => {
  return landingPage.assert.visible('@logo')
})

Then(/^the Builds tab should be displayed$/, () => {
  return landingPage.assert.visible('@buildsTab')
})

Then(/^the latest builds table should be displayed$/, () => {
  const builds = client.page.builds()
  return builds.assert.visible('@buildsTable')
})
