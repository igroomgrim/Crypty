'use strict'

const config = require('./config')
const httpservice = require('./httpservice')
const _ = require('underscore')

const ZRXPairID = '0x'
const KNCPairID = 'kyber-network'
const QSPPariID = 'quantstamp'
const ELECPairID = 'electrifyasia'

module.exports = {
  async getCoinPrice () {
    try {
      const zrxData = await this.getZRXPrice()
      const kncData = await this.getKNCPrice()
      const qspData = await this.getQSPPrice()
      const elecData = await this.getELECPrice()

      var coinPrice = {
        zrx: zrxData,
        knc: kncData,
        qsp: qspData,
        elec: elecData
      }

      return coinPrice
    } catch (err) {
      console.log(err)
      return err
    }
  },

  async getZRXPrice () {
    const options = {
      uri: config.CMK_API_ENDPOINT + ZRXPairID
    }

    try {
      const res = await httpservice.get(options)
      return res[0]
    } catch (err) {
      console.error(err)
      return err
    }
  },

  async getKNCPrice () {
    const options = {
      uri: config.CMK_API_ENDPOINT + KNCPairID
    }

    try {
      const res = await httpservice.get(options)
      return res[0]
    } catch (err) {
      console.error(err)
      return err
    }
  },

  async getQSPPrice () {
    const options = {
      uri: config.CMK_API_ENDPOINT + QSPPariID
    }

    try {
      const res = await httpservice.get(options)
      return res[0]
    } catch (err) {
      console.error(err)
      return err
    }
  },

  async getELECPrice () {
    const options = {
      uri: config.CMK_API_ENDPOINT + ELECPairID
    }

    try {
      const res = await httpservice.get(options)
      return res[0]
    } catch (err) {
      console.error(err)
      return err
    }
  }
}
