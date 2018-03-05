// HockeyApp API Wrapper
const HockeyApp = require('hockeyapp-api-wrapper')
const { HOCKEYAPP_AUTH_TOKEN } = process.env
const hockeyAppCli = new HockeyApp.Client(HOCKEYAPP_AUTH_TOKEN)

// HockeyApp Titles
import hockeyAppTitles from '../resources/hockeyAppTitles.js'

const self = module.exports = {
  getAppIdsFromResources: () => {
    return hockeyAppTitles.getAppTitles().map(build => build.id)
  },

  getAllAppsFromHockey: () => {
    return hockeyAppCli.getApps()
  },

  matchAppsById: (appsFromHockey) => {
    let matchedApps = []

    self.getAppIdsFromResources().forEach(appId => {
      matchedApps.push(HockeyApp.Utils.getAppByIdMatch(appsFromHockey, appId))
    })

    return matchedApps
  },

  getAllVersions: (apps) => {
    let promises = []

    apps.forEach(app => {
      promises.push(new Promise((resolve, reject) => {
        resolve(hockeyAppCli.getVersions(app))
      }))
    })

    return Promise.all(promises)
  },

  getLatestVersions: (versions) => {
    let latestVersions = []

    versions.forEach(version => {
      latestVersions.push(HockeyApp.Utils.getLatestVersion(version))
    })

    return latestVersions
  }
}
