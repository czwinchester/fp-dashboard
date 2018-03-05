import app from './app'
import db from './builds/db.js'
import cronJobs from './builds/cronJobs.js'

const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
