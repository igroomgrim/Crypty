'use strict'

const splitter = '==================\n'
const smileyFace = '≧◡≦'
const usd_thb = 32

module.exports = {
  usdToTHB (amountInUSD) {
    return (parseFloat(amountInUSD) * usd_thb).toFixed(2)
  },

  sunnDokkMessage (bx, cmk, bfn) {
    let omg = bx.omg
    let btc = bx.btc
    let eth = bx.eth
    let ltc = bx.ltc

    let knc = cmk.knc
    let zrx = cmk.zrx
    let qsp = cmk.qsp
    let elec = cmk.elec

    let knc_thb = this.usdToTHB(knc.price_usd)
    let zrx_thb = this.usdToTHB(zrx.price_usd)
    let qsp_thb = this.usdToTHB(qsp.price_usd)

    let omg_bfn = bfn.omg
    let neo_bfn = bfn.neo

    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)
    let bfn_neo_thb = this.usdToTHB(neo_bfn.last_price)

    return `✿✿\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 LTC  : ${ltc.last_price} THB [BX]\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    `1 NEO : ${bfn_neo_thb} THB [Bitfinex]\n` +
    `1 KNC  : ${knc_thb} THB\n` +
    `1 ZRX : ${zrx_thb} THB\n` +
    `1 QSP : ${qsp_thb} THB\n` +
    `1 ELEC : ${elec.price_usd}$\n`
    smileyFace
  },

  cryptoLoverMessage (bx, cmk) {
    let omg = bx.omg
    let btc = bx.btc
    let eth = bx.eth
    let ltc = bx.ltc

    let qsp = cmk.qsp
    let qsp_thb = this.usdToTHB(qsp.price_usd)

    return `✿CryptoLover✿\n` +
    `1 BTC : ${btc.last_price} THB\n` +
    `1 ETH : ${eth.last_price} THB\n` +
    `1 LTC  : ${ltc.last_price} THB [BX]\n` +
    `1 OMG : ${omg.last_price} THB\n` +
    `1 QSP : ${qsp_thb} THB\n` +
    smileyFace
  },

  omsLoverMessage (bx, bfn) {
    let omg = bx.omg
    let btc = bx.btc
    let eth = bx.eth
    let xrp = bx.xrp

    let omg_bfn = bfn.omg
    let bfn_omg_thb = this.usdToTHB(omg_bfn.last_price)

    return `✿OMG✿\n` +
    `1 OMG  : ${omg.last_price} THB [BX]\n` +
    `1 OMG  : ${bfn_omg_thb} THB [Bitfinex]\n` +
    `1 BTC  : ${btc.last_price} THB [BX]\n` +
    `1 ETH  : ${eth.last_price} THB [BX]\n` +
    `1 XRP  : ${xrp.last_price} THB [BX]\n` +
    smileyFace
  }
}
