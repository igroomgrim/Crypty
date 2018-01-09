'use strict'

const splitter = '==================\n'
const smileyFace = '≧◡≦'
const usd_thb = 33.20

module.exports = {
  usdToTHB (amountInUSD) {
    return (parseFloat(amountInUSD) * usd_thb).toFixed(2)
  },

  cryptoLoverMessage (bxdata, cmkdata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    return `✿CryptoLover✿\n` +
    `1 OMG : ${omg.last_price} THB\n` +
    `1 ETH : ${eth.last_price} THB\n` +
    `1 BTC : ${btc.last_price} THB\n` +
    smileyFace
  },

  cryptoMoneyClubMessage (bxdata, cmkdata, bfndata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let knc = cmkdata[2]
    let knc_thb = this.usdToTHB(knc.price_usd)

    let omg_bfn = bfndata[1]
    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)

    return `✿GoToTheMOON✿\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 KNC  : ${knc.price_usd} USD\n` +
    `1 KNC  : ${knc_thb} THB\n` +
    smileyFace
  },

  omsLoverMessage (bxdata, cmkdata, bfndata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let omg_bfn = bfndata[1]
    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)

    return `✿OMG✿\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    smileyFace
  },

  cryptoInvesterMessage (bxdata, cmkdata, bfndata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let knc = cmkdata[2]
    let knc_thb = this.usdToTHB(knc.price_usd)

    let omg_bfn = bfndata[1]
    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)

    return `✿CryptoInvester✿\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 KNC  : ${knc.price_usd} USD\n` +
    `1 KNC  : ${knc_thb} THB\n` +
    smileyFace
  },

  sunnDokkMessage (bxdata, cmkdata, bfndata) {
    let omg = bxdata[0]
    let btc = bxdata[1]
    let eth = bxdata[2]

    let knc = cmkdata[2]
    let knc_thb = this.usdToTHB(knc.price_usd)

    let omg_bfn = bfndata[1]
    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)

    return `✿SunnDokkWahh✿\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    `1 KNC  : ${knc.price_usd} USD\n` +
    `1 KNC  : ${knc_thb} THB\n` +
    smileyFace
  }
}
