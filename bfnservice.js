'use strict'

const config = require('./config')
const httpservice = require('./httpservice')

const OMGUSD = "OMGUSD"

module.exports = {
	async getCoinPrice () {
  	const options = {
    	uri: config.BFN_API_ENDPOINT + "pubticker/" + OMGUSD + "/"
  	}

    try {
      const res = await httpservice.get(options)
      return res
    } catch (err) {
      console.error(err)
      return err
    }
  }
}
