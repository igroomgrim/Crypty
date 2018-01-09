'use strict'

const config = require('./config')
const httpservice = require('./httpservice')
const _ = require('underscore')

const OMGPairID = 'omisego'
const ZRXPairID = '0x'
const KNCPairID = 'kyber-network'

module.exports = {
  compress (cmkData) {
    var filterPairIDs = [OMGPairID, ZRXPairID, KNCPairID]
    var filteredData = cmkData.filter(function (item) {
      return filterPairIDs.indexOf(item.id) > -1
    })

    return _.sortBy(filteredData, 'symbol')
  },

  async getCoinPrice () {
    const options = {
      uri: config.CMK_API_ENDPOINT
    }

    try {
      const res = await httpservice.get(options)
      return this.compress(res)
    } catch (err) {
      console.error(err)
      return err
    }
  }
}
