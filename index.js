'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

const publisher = require('./publisher')

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Meeaaww')
})

app.get('/meaw', function (req, res) {
  publisher.publish()
  res.status(200).send('Meaaawww 200')
})

app.listen(app.get('port'), () => {
  console.log(`Running Crypty on port : ${app.get('port')}`)
})
