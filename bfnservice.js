'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const OMGUSD = 'OMGUSD'
const NEOUSD = 'NEOUSD'
const BTCUSD = 'BTCUSD'

module.exports = {
  async getCoinPrice () {
    try {
      const neoData = await this.getNEOPrice()
      const omgData = await this.getOMGPrice()
      const btcData = await this.getBTCPrice()

      var coinPrice = {
        neo: neoData,
        omg: omgData,
        btc: btcData
      }

      return coinPrice
    } catch (err) {
      console.log(err)
      return err
    }
  },

  async getNEOPrice () {
    const options = {
      uri: config.BFN_API_ENDPOINT + 'pubticker/' + NEOUSD + '/'
    }

    try {
      const res = await httpservice.get(options)
      return res
    } catch (err) {
      console.error(err)
      return err
    }
  },

  async getOMGPrice () {
    const options = {
      uri: config.BFN_API_ENDPOINT + 'pubticker/' + OMGUSD + '/'
    }

    try {
      const res = await httpservice.get(options)
      return res
    } catch (err) {
      console.error(err)
      return err
    }
  },

  async getBTCPrice () {
    const options = {
      uri: config.BFN_API_ENDPOINT + 'pubticker/' + BTCUSD + '/'
    }

    try {
      const res = await httpservice.get(options)
      return res
    } catch (err) {
      console.error(err)
      return err
    }
  }
}
