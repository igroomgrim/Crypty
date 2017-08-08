'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

var rp = require('request-promise');
var cronJob = require('cron').CronJob;

const LINENotifyToken = process.env.LINENotifyToken
const LINENotifySIGTToken = process.env.LINENotifySIGTToken
const OMGPairID = '26'
const BTCPairID = '1'
const ETHPairID = '21'
const ZECPairID = '8'

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Meeaaww');
})

app.get('/meaw', function (req, res) {
  publish();
  res.status(200).send('Meaaawww');
})

function publish() {
  // publishOMG()
  publishSIGT()
}

function publishOMG() {
  var bxOptions = {
    uri: 'https://bx.in.th/api/',
    json: true
  };

  rp(bxOptions)
    .then(function ( marketdata ) {
        console.log(marketdata[OMGPairID]);

        let omgPair = marketdata[OMGPairID];
        let btcPair = marketdata[BTCPairID];
        let ethPair = marketdata[ETHPairID];
        let zecPair = marketdata[ZECPairID];

        notifyToGroup(omgPair, btcPair, ethPair, zecPair);
    })
    .catch(function (err) {
        console.log(err);
    });
}

function publishSIGT() {
  var sigtOptions = {
    uri: 'https://api.coinmarketcap.com/v1/ticker/signatum/',
    json: true
  };

  rp(sigtOptions)
    .then(function ( sigt ) {
        console.log(sigt[0]);
        notifyToSIGTGroup(sigt[0])
    })
    .catch(function (err) {
        console.log(err);
    });
}

function messageGenerator( omg, btc, eth, zec ) {
  let change = omg['change'];
  let lastPrice = omg['last_price'];
  let volumeIn24HR = omg['volume_24hours'];
  let volumeBids = omg['orderbook']['bids'];
  let volumeAsks = omg['orderbook']['asks'];
  
  let omglastPriceMSG = `1 OMG : ${lastPrice} THB\n`;
  let omgChangeMSG = `Change : ${change}%\n`;
  let omgVolume24MSG = `Volume24HR : ${volumeIn24HR} OMG\n`;
  let omgBidsMSG = `Highest buy: ${volumeBids.highbid} THB\n`;
  let omgAsksMSG = `Lowest sell: ${volumeAsks.highbid} THB\n`;

  let spliter = '- - - - - - - - - - - - - -\n'

  let btcLastPriceMSG = `1 BTC : ${btc.last_price} THB\n`;
  let ethLastPriceMSG = `1 ETH : ${eth.last_price} THB\n`;

  let zecPrice = (btc.last_price * zec.last_price).toFixed(2);
  let zecLastPriceMSG = `1 ZEC : ${zecPrice} THB\n`

  let theEnd = '≧◡≦';

  return `✿OMG✿\n` + omglastPriceMSG + omgChangeMSG + omgVolume24MSG 
  + omgBidsMSG + omgAsksMSG + spliter + btcLastPriceMSG + ethLastPriceMSG + zecLastPriceMSG
  + theEnd;
}

function messageSIGTGenerator( sigt ) {
  let price_usd = ( sigt.price_usd * 33.28 ) 
  return `✿SIGT✿\n` + `1 SIGT\n${price_usd} THB\n` + `${sigt.price_btc} BTC\n` + `------------`
}

function notifyToGroup( omg, btc, eth, zec ) {
  var message = messageGenerator(omg, btc, eth, zec);

  var headers = {
    'User-Agent':       'AzukiChan/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  var options = {
    'url': 'https://notify-api.line.me/api/notify',
    'method': 'POST',
    'headers': headers,
    'auth': {
       'bearer': LINENotifyToken
    },
    'form': {
       'message': message
    }
  }
  
  rp(options)
    .then(function ( result ) {
        console.log('publish success');
    })
    .catch(function (err) {
        console.log(err);
    });
}

function notifyToSIGTGroup( sigt ) {
  var message = messageSIGTGenerator(sigt);

  var headers = {
    'User-Agent':       'AzukiChan/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  var options = {
    'url': 'https://notify-api.line.me/api/notify',
    'method': 'POST',
    'headers': headers,
    'auth': {
       'bearer': LINENotifySIGTToken
    },
    'form': {
       'message': message
    }
  }
  
  rp(options)
    .then(function ( result ) {
        console.log('publish success');
    })
    .catch(function (err) {
        console.log(err);
    });
}

app.listen(app.get('port'), () => {
  console.log(`Running Crypty on port : ${app.get('port')}`)
  
  var job = new cronJob({
    cronTime: '0 */20 * * * *',
    onTick: function() {
      // Publish every 20 min
      publish();
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  });

  job.start();
})
