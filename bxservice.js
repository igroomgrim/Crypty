'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const OMGPairID = '26'
const BTCPairID = '1'
const ETHPairID = '21'
const LTCPairID = '30'
const XRPPairID = '25'
const XZCPairID = '29'

module.exports = {
  compress (bxData) {
    let omgPair = bxData[OMGPairID]
    let btcPair = bxData[BTCPairID]
    let ethPair = bxData[ETHPairID]
    let ltcPair = bxData[LTCPairID]
    let xrpPair = bxData[XRPPairID]
    let xzcPair = bxData[XZCPairID]

    var coinPrice = {
      omg: omgPair,
      btc: btcPair,
      eth: ethPair,
      ltc: ltcPair,
      xrp: xrpPair,
      xzc: xzcPair
    }

    return coinPrice
  },

  async getCoinPrice () {
    const options = {
      uri: config.BX_PUBLIC_API_ENDPOINT
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
