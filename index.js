'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

var rp = require('request-promise');
var cronJob = require('cron').CronJob;

const LINENotifyToken = ''
const OMGPairID = '26'
const BTCPairID = '1'
const ETHPairID = '21'

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Meeaaww');
})

app.get('/publish', function (req, res) {
  publish();
  res.status(200).send('Meaaawww');
})

function publish() {
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

        notifyToGroup(omgPair, btcPair, ethPair);
    })
    .catch(function (err) {
        console.log(err);
    });
}

function messageGenerator( omg, btc, eth ) {
  let change = omg['change'];
  let lastPrice = omg['last_price'];
  let volumeIn24HR = omg['volume_24hours'];
  let volumeBids = omg['orderbook']['bids'];
  let volumeAsks = omg['orderbook']['asks'];
  
  let omglastPriceMSG = `Last price : ${lastPrice} THB\n`;
  let omgChangeMSG = `Change : ${change}%\n`;
  let omgVolume24MSG = `Volume24HR : ${volumeIn24HR} OMG\n`;
  let omgBidsMSG = `Highest buy: ${volumeBids.highbid} THB\n`;
  let omgAsksMSG = `Lowest sell: ${volumeAsks.highbid} THB\n`;

  let spliter = '- - - - - - - - - - - - - -\n'

  let btcLastPriceMSG = `BTC : ${btc.last_price} THB\n`;
  let ethLastPriceMSG = `ETH : ${eth.last_price} THB\n`

  let theEnd = '≧◡≦';

  return `✿OMG✿\n` + omglastPriceMSG + omgChangeMSG + omgVolume24MSG 
  + omgBidsMSG + omgAsksMSG + spliter + btcLastPriceMSG + ethLastPriceMSG
  + theEnd;
}

function notifyToGroup( omg, btc, eth ) {
  var message = messageGenerator(omg, btc, eth);

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
        console.log('publish success')
    })
    .catch(function (err) {
        console.log()
    });
}

app.listen(app.get('port'), () => {
  console.log(`Running Crypty on port : ${app.get('port')}`)
  
  var job = new cronJob({
    cronTime: '0 */30 * * * *',
    onTick: function() {
      // Publish every 30 min
      publish();
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  });

  job.start();
})
