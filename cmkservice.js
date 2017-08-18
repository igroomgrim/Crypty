'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const SIGTPairID = 'signatum'
const DASHPairID = 'dash'
const ZRXPairID = '0x'
const CVCPairID = 'civic'
const PAYPairID = 'tenx'

module.exports = {
  compress (cmkData) {
    var filterPairIDs = [SIGTPairID, DASHPairID, ZRXPairID, CVCPairID, PAYPairID]
    return cmkData.filter(function (item) {
      return filterPairIDs.indexOf(item.id) > -1
    })
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
