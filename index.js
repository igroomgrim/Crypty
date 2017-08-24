'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()
const publisher = require('./publisher')
var cronJob = require('cron').CronJob

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Meeaaww')
})

app.get('/meaw', function (req, res) {
  res.status(200).send('Meaaawww 200')
})

app.listen(app.get('port'), () => {
  console.log(`Running Crypty on port : ${app.get('port')}`)

  var cryptoJob = new cronJob({
    cronTime: '0 */20 * * * *',
    onTick: function () {
      // Publish every 20 min
      publisher.publish()
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  })

  var cryptoHourJob = new cronJob({
    cronTime: '0 */60 * * * *',
    onTick: function () {
      // Publish every 60 min
      publisher.publishEveryHour()
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  })

  cryptoJob.start()
  cryptoHourJob.start()
})
