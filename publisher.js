'use strict'

const config = require('./config')
const bxservice = require('./bxservice')
const cmkservice = require('./cmkservice')
const httpservice = require('./httpservice')
const ms_generator = require('./message_generator')

const LINENotifyToken_CryptoLover = process.env.LINENotifyToken_CryptoLover
const LINENotifyToken_OMSLover = process.env.LINENotifyToken_OMSLover
const LINENotifyToken_CryptoMoneyClub = process.env.LINENotifyToken_CryptoMoneyClub

const headers = {
  'User-Agent': 'AzukiChan/0.0.1',
  'Content-Type': 'application/x-www-form-urlencoded'
}

module.exports = {
  async publish () {
    try {
      const cmkdata = await cmkservice.getCoinPrice()
      const bxdata = await bxservice.getCoinPrice()
      this.publishToCryptoMoneyClub(bxdata, cmkdata)
    } catch (err) {
      console.log(err)
    }
  },

  async publishToCryptoMoneyClub (bxdata, cmkdata) {
    let message = ms_generator.cryptoMoneyClubMessage(bxdata, cmkdata)
    console.log(message)
  },

  async publishToOMSLover (bxdata, cmkdata) {
    let message = ms_generator.omsLoverMessage(bxdata, cmkdata)

    const options = {
      'url': config.LINE_NOTIFY_API_ENDPOINT,
      'headers': headers,
      'auth': {
        'bearer': LINENotifyToken_OMSLover
      },
      'form': {
        'message': message
      }
    }

    try {
      await httpservice.post(options)
    } catch (err) {
      console.log(err)
    }
  },

  async publishToCryptoLover (bxdata, cmkdata) {
    let message = ms_generator.cryptoLoverMessage(bxdata, cmkdata)

    const options = {
      'url': config.LINE_NOTIFY_API_ENDPOINT,
      'headers': headers,
      'auth': {
        'bearer': LINENotifyToken_CryptoLover
      },
      'form': {
        'message': message
      }
    }

    try {
      await httpservice.post(options)
    } catch (err) {
      console.log(err)
    }
  }
}
