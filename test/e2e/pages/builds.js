const nightWatchConfig = require('../nightwatch.conf')
const devServerUrl = nightWatchConfig.test_settings.default.globals.devServerURL
module.exports = {
  url: devServerUrl,
  elements: {
    buildsTable: '#builds-table',
    tableHeaderStatus: '#status-header',
    searchBar: '#search-bar'
  }
}
