import moment from 'moment'
const config      = require('../../knexfile.js')
const env         = 'development'
const knex        = require('knex')(config[env])

const self = module.exports = {

  checkVersionExists: (build) => {
    return knex('builds')
      .count('*')
      .where({
        name: build.title,
        os: build.os,
        release_time: build.release_time_sql
      })
  },

  countIsZero: (checkVersionExistsResult) => {
    if (checkVersionExistsResult[0]['count(*)'] === 0) {
      return true
    }
    else {
      return false
    }
  },

  insertBuild: (build) => {
    self.checkVersionExists(build)
      .then(result => {
        if (self.countIsZero(result)) {
          return knex.transaction(trx => {
            return trx.table('builds')
              .where({
                name: build.title,
                os: build.os
              })
              .update({
                latest: false
              })
              .then(() => {
                return trx.table('builds')
                  .insert({
                    name: build.title,
                    os: build.os,
                    shortversion: build.shortversion,
                    longversion: build.longversion,
                    status: build.status,
                    release_time: build.release_time_sql,
                    latest: true
                  })
              })

          })
          .then(() => {
            console.log('[' + moment().format('YYYY-MM-DDTHH:mm:ss') + '] ' + ' successful insert ' + build.title + ' ' + build.os)
          })
          .catch(e => {
            console.log(e)
          })
        }
        else {
          console.log('[' + moment().format('YYYY-MM-DDTHH:mm:ss') + '] ' + build.title + ' ' + build.os + ' up to date')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  getLatestBuilds: () => {
    return knex.transaction(trx => {
      return trx.table('builds')
        .where({
          latest: true
        })
        .then(result => {
          console.log(result)
          return result
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

}

knex.migrate.latest([config])
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })


// knex.migrate.rollback([config])
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err)
//   })

