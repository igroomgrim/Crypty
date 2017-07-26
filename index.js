'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.listen(app.get('port'), () => {
  console.log(`Running Crypty on port : ${app.get('port')}`)
})
