const axios = require('axios')
const Position = require('./Position')

class PositionRepo {
  constructor (host) {
    this.host = host || require('../../../config/config.loader').load().api.location
  }
  fetch (type, callback) {
    axios.get(`/api/gis/getlocstatusinfo?cardnum=&stringcardtype=${type}`, {
      baseURL: this.host,
      timeout: 3000
    })
      .then(res => {
        const items = JSON.parse(res.data).result || []
        callback(null, items.map(item => new Position(item)))
      })
      .catch(err => callback(err))
  }
}

module.exports = PositionRepo
