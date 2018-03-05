import buildService from './buildService.js'
import cron from 'cron'

const updateBuildsJob = new cron.CronJob('*/10 * * *', function() {
    buildService.updateBuilds()
      .then(result =>{
          console.log(result)
          console.log('updateBuilds ticked')
        })
  }, function () {
    console.log('stopped cron job')
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'Europe/London' /* Time zone of this job. */
)
