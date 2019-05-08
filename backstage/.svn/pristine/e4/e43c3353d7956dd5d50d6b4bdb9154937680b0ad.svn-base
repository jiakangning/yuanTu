const axios = require('axios')
const Vehicle = require('./Vehicle')

class VehicleRepo {
  constructor (host) {
    this.host = host || require('../../../config/config.loader').load().api.location
  }
  findAll (callback) {
    axios.get('/api/gis/getvehicleinfo?typename&departmentname&districtteamname&cardnum', {
      baseURL: this.host,
      timeout: 3000
    })
      .then(res => {
        const items = JSON.parse(res.data).result || []
        return callback(null, items.map(item => new Vehicle(item)))
      })
      .catch(err => callback(err))
  }
}

module.exports = VehicleRepo
