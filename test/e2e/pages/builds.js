const nightWatchConfig = require('../nightwatch.conf')
const devServerUrl = nightWatchConfig.test_settings.default.globals.devServerURL

// const buildsCommands = {
//   waitRow: function () {
//     this.api.pause(10000)
//     return this.waitForElementVisible('@buildsTableRow', 1000)
//   }
// }

module.exports = {
  url: devServerUrl,
  // commands: [buildsCommands],
  elements: {
    buildsTable: '#builds-table',
    tableHeaderStatus: '#status-header',
    searchBar: '#search-bar',
    buildsTableRow: '.builds-table-row'
  }
}
