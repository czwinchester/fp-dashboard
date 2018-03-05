import buildObj from './buildObj.js'
import db from './db.js'
import hockey from './hockey.js'
import moment from 'moment'

const self = module.exports = {

  getLatestBuilds: () => {
    return db.getLatestBuilds()
      .then(results => {
        results.forEach(build => {
          if (moment().day() === 0 || moment().day() === 6) {
            build.status = '-'
          } else {
            build.status = self.computeStatus(build)
          }
        })
        return results
      })
      .catch(err => {
        console.log(err)
      })
  },

  updateBuilds: () => {
    return hockey.getAllAppsFromHockey()
      .then(result => {
        return hockey.matchAppsById(result)
      })
      .then(matchedApps => {
        return hockey.getAllVersions(matchedApps)
      })
      .then(versions => {
        return hockey.getLatestVersions(versions)
      })
      .then(latestVersions => {
        let latestVersionBuildObjects = []
        latestVersions.forEach(version => {
          if (version !== undefined) {
            latestVersionBuildObjects.push(buildObj.from(version))
          }
        })
        return latestVersionBuildObjects
      })
      .then(latestVersionBuildObjects => {
        let wrapper = []
        latestVersionBuildObjects.forEach(build => {
            if (self.computeStatus(build) !== undefined) {
              build.status = self.computeStatus(build)
              db.insertBuild(build)
            }
            else {
              console.log(build.title + ' ' + build.os + ' status undefined')
            }
          })
      })
      .catch(error => console.log(error))
  },

  computeStatus: (build) => {
    let today = moment()
    let today9am = moment().startOf('day').add(9, 'hours')
    let releaseTime = moment(build.release_time)
    let hoursDiff = today9am.diff(releaseTime, 'hours', true)
    switch (today.day()) {
      case 0:
        if (today.format('DDMMYY') === releaseTime.format('DDMMYY') ||
            hoursDiff < 9 + 24 + 7) {
          return buildObj.status.ON_TIME
        } else {
          return '-'
        }
        break
      case 1:
        if (hoursDiff > 0 &&
            hoursDiff < 9 + 24 + 24 + 7) {
          return buildObj.status.ON_TIME
        } else if (hoursDiff <= 0 &&
                  hoursDiff >= -8) {
          return buildObj.status.DELAYED
        } else {
          return buildObj.status.NO_BUILD
        }
        break
      case 6:
        if (today.format('DDMMYY') === releaseTime.format('DDMMYY') ||
            hoursDiff < 9 + 7) {
          return buildObj.status.ON_TIME
        } else {
          return '-'
        }
        break
      default:
        if (hoursDiff > 0 &&
            hoursDiff < 9 + 7) {
          return buildObj.status.ON_TIME
        } else if (hoursDiff <= 0 &&
                  hoursDiff >= -8) {
          return buildObj.status.DELAYED
        } else {
          return buildObj.status.NO_BUILD
        }
    }
  }

}
