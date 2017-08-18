'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const OMGPairID = '26'
const BTCPairID = '1'
const ETHPairID = '21'

module.exports = {
  compress (bxData) {
    let omgPair = bxData[OMGPairID]
    let btcPair = bxData[BTCPairID]
    let ethPair = bxData[ETHPairID]

    return [omgPair, btcPair, ethPair]
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
