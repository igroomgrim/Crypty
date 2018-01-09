'use strict'

const config = require('./config')
const bxservice = require('./bxservice')
const cmkservice = require('./cmkservice')
const bfnservice = require('./bfnservice')
const httpservice = require('./httpservice')
const ms_generator = require('./message_generator')

const LINENotifyToken_CryptoLover = process.env.LINENotifyToken_CryptoLover
const LINENotifyToken_OMSLover = process.env.LINENotifyToken_OMSLover
const LINENotifyToken_CryptoMoneyClub = process.env.LINENotifyToken_CryptoMoneyClub
const LINENotifyToken_CryptoInvester = process.env.LINENotifyToken_CryptoInvester
const LINENotifyToken_SunnDokk = process.env.LINENotifyToken_SunnDokk

const headers = {
  'User-Agent': 'AzukiChan/0.0.1',
  'Content-Type': 'application/x-www-form-urlencoded'
}

module.exports = {
  async publish () {
    try {
      const cmkdata = await cmkservice.getCoinPrice()
      const bxdata = await bxservice.getCoinPrice()
      const bfndata = await bfnservice.getCoinPrice()
      // this.publishToCryptoMoneyClub(bxdata, cmkdata, bfndata)
      this.publishToOMSLover(bxdata, cmkdata, bfndata)
      this.publishToCryptoLover(bxdata, cmkdata)
      // this.publishToCryptoInvester(bxdata, cmkdata, bfndata)
      this.publishToSunnDokkWahh(bxdata, cmkdata, bfndata)

    } catch (err) {
      console.log(err)
    }
  },

  async publishToCryptoMoneyClub (bxdata, cmkdata, bfndata) {
    let message = ms_generator.cryptoMoneyClubMessage(bxdata, cmkdata, bfndata)
    const options = {
      'url': config.LINE_NOTIFY_API_ENDPOINT,
      'headers': headers,
      'auth': {
        'bearer': LINENotifyToken_CryptoMoneyClub
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
  },

  async publishToCryptoInvester (bxdata, cmkdata, bfndata) {
    let message = ms_generator.cryptoInvesterMessage(bxdata, cmkdata, bfndata)

    const options = {
      'url': config.LINE_NOTIFY_API_ENDPOINT,
      'headers': headers,
      'auth': {
        'bearer': LINENotifyToken_CryptoInvester
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

  async publishToSunnDokkWahh (bxdata, cmkdata, bfndata) {
    let message = ms_generator.sunnDokkMessage(bxdata, cmkdata, bfndata)

    const options = {
      'url': config.LINE_NOTIFY_API_ENDPOINT,
      'headers': headers,
      'auth': {
        'bearer': LINENotifyToken_SunnDokk
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
