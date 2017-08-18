'use strict'

module.exports = {
  crytoLoverMessage (bxdata, cmkdata) {
		// let price_usd = ( sigt.price_usd * 33.28 )

    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let sigt = cmkdata[4]
    let dash = cmkdata[0]
    let spliter = '--------\n'

  	return `✿SIGT✿\n` +
  	`1 OMG : ${omg.last_price} THB\n` +
  	`1 ETH : ${eth.last_price} THB\n` +
  	`1 BTC : ${btc.last_price} THB\n` +
  	spliter +
  	`1 SIGT : ${sigt.price_usd} $\n` +
  	`1 SIGT : ${sigt.price_btc} BTC\n` +
  	spliter +
  	`1 DASH : ${dash.price_usd} $\n` +
  	`1 DASH : ${dash.price_btc} BTC\n` +
  	spliter
  }
}
