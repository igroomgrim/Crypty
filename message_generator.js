'use strict'

const splitter = '====-====-====\n'
const smileyFace = '≧◡≦'

module.exports = {
  cryptoLoverMessage (bxdata, cmkdata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let sigt = cmkdata[5]
    let dash = cmkdata[0]

  	return `✿CryptoLover✿\n` +
  	`1 OMG : ${omg.last_price} THB\n` +
  	`1 ETH : ${eth.last_price} THB\n` +
  	`1 BTC : ${btc.last_price} THB\n` +
  	splitter +
  	`1 SIGT : ${sigt.price_usd} $\n` +
  	`1 SIGT : ${sigt.price_btc} BTC\n` +
  	splitter +
  	`1 DASH : ${dash.price_usd} $\n` +
  	`1 DASH : ${dash.price_btc} BTC\n` +
    smileyFace
  },

  cryptoMoneyClubMessage (bxdata, cmkdata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let zrx = cmkdata[3]
    let cvc = cmkdata[4]
    
    let zrx_thb = (parseFloat(zrx.price_usd) * 33.27).toFixed(2)
    
    return `✿CryptoMoneyClub✿\n` +
    `1 OMG : ${omg.last_price} THB\n` +
    `1 ETH : ${eth.last_price} THB\n` +
    `1 BTC : ${btc.last_price} THB\n` +
    splitter +
    `1 0x : ${zrx.price_usd} $\n` +
    `1 0x : ${zrx_thb} THB\n` +
    `1 CVC : ${cvc.price_usd} $\n` +
    smileyFace
  },

  omsLoverMessage (bxdata, cmkdata) {
    let bx_omg = bxdata[0]
    let bx_btc = bxdata[1]
    let bx_eth = bxdata[2]

    let cmk_omg = cmkdata[1]

    return `✿OMG✿\n` + 
    `Rate : BX\n` +
    `1 OMG : ${bx_omg.last_price} THB\n` +
    `1 ETH : ${bx_eth.last_price} THB\n` +
    `1 BTC : ${bx_btc.last_price} THB\n` +
    splitter +
    `Rate : CoinMarketCap\n` +
    `1 OMG : ${cmk_omg.price_usd} $\n` +
    smileyFace
  }
}
