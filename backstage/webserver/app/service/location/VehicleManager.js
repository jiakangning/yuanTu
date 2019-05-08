const async = require('async')

class VehicleManager {
  constructor (repo) {
    if (repo) {
      this.repo = repo
    } else {
      const VehicleRepo = require('../../model/location/VehicleRepo')
      this.repo = new VehicleRepo()
    }
  }
  getAll ({ limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAll.bind(this.repo),
      (vehicles, cb) => {
        async.mapLimit(vehicles, limit, this.repo.get.bind(this.repo), cb)
      }
    ], callback)
  }
  find (data, { limit = 20 }, callback) {
    if (data && data.length) {
      const list = data.split(',') || []
      async.mapLimit(list, limit, this.repo.get.bind(this.repo), callback)
    } else {
      process.nextTick(() => {
        callback(null, [])
      })
    }
  }
}

VehicleManager.Subscribe = '陕西陕煤曹家滩矿业有限公司:车辆精确定位系统:channel'

module.exports = VehicleManager
