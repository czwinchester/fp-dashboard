const nightWatchConfig = require('../nightwatch.conf')
const devServerUrl = nightWatchConfig.test_settings.default.globals.devServerURL
module.exports = {
  url: devServerUrl + '/builds',
  elements: {
    title: 'title',
    logo: '#header-logo',
    buildsTab: '#builds-tab',
    insightsTab: '#insights-tab'
  }
}
