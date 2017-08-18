'use strict'

const spliter = '====-====-====\n'
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
  	spliter +
  	`1 SIGT : ${sigt.price_usd} $\n` +
  	`1 SIGT : ${sigt.price_btc} BTC\n` +
  	spliter +
  	`1 DASH : ${dash.price_usd} $\n` +
  	`1 DASH : ${dash.price_btc} BTC\n` +
  	spliter +
    smileyFace
  },

  cryptoMoneyClubMessage (bxdata, cmkdata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let cvc = cmkdata[3]
    let zrx = cmkdata[4]

    let zrx_thb = (zrx.price_usd * 33.27).toFixed(2)
    
    return `✿CryptoMoneyClub✿\n` +
    `1 OMG : ${omg.last_price} THB\n` +
    `1 ETH : ${eth.last_price} THB\n` +
    `1 BTC : ${btc.last_price} THB\n` +
    spliter +
    `1 0x : ${zrx.price_usd} $\n` +
    `1 0x : ${zrx_thb} THB\n` +
    `1 CVC : ${cvc.price_usd} $\n` +
    spliter +
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
    spliter +
    `Rate : CoinMarketCap\n` +
    `1 OMG : ${cmk_omg.price_usd} $\n` +
    smileyFace
  }
}
