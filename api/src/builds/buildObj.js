import moment from 'moment'

const self = module.exports = {
  status: {
    ON_TIME: 'On time',
    DELAYED: 'Delayed',
    NO_BUILD: 'No build'
  },
  toSqlDateTime: (jsDateTime) => {
    return moment(jsDateTime).format('YYYY-MM-DD HH:mm:ss')
  },
  from: (latestVersion) => {
    if (latestVersion) {
      return {
        title: latestVersion.title,
        os: latestVersion.device_family === null ? 'Android' : 'iOS',
        shortversion: latestVersion.shortversion.split('-')[0],    //Lincoln Way versions e.g. 1.2.3-456.foo.789.etc
        longversion: latestVersion.shortversion,
        release_time: latestVersion.updated_at,
        release_time_sql: self.toSqlDateTime(latestVersion.updated_at)
      }
    }
  }
}
