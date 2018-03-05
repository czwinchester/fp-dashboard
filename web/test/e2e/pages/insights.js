const nightWatchConfig = require('../nightwatch.conf')
const devServerUrl = nightWatchConfig.test_settings.default.globals.devServerURL
module.exports = {
  url: devServerUrl + '/insights',
  elements: {
    header: '#insights-header'
  }
}
