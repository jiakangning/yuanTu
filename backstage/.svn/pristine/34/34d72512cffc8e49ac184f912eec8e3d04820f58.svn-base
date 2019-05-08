const axios = require('axios')
const Employee = require('./Employee')

class EmployeeRepo {
  constructor (host) {
    this.host = host || require('../../../config/config.loader').load().api.location
  }
  findAll (callback) {
    axios.get('/api/gis/getemployeeinfo?cardnum&departmentname&typeofworkname&officeposition', {
      baseURL: this.host,
      timeout: 3000
    })
      .then(res => {
        const items = JSON.parse(res.data).result || []
        return callback(null, items.map(item => new Employee(item)))
      })
      .catch(err => callback(err))
  }
}

module.exports = EmployeeRepo
