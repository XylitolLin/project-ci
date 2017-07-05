const schedule = require('node-schedule')
const task = require('./index.js')

const j = schedule.scheduleJob('5 0 0 * * *', () => {
    console.log('The answer to life, the universe, and everything!', new Date())
    task()
})