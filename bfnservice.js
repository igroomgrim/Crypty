'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const OMGUSD = 'OMGUSD'
const NEOUSD = 'NEOUSD'

module.exports = {
  async getCoinPrice () {
    try {
      const neoData = await this.getNEOPrice()
      const omgData = await this.getOMGPrice()

      var coinPrice = {
        neo: neoData,
        omg: omgData
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
  }
}
