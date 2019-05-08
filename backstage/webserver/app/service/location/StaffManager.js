const async = require('async')
const StaffRepo = require('../../model/location/StaffRepo')

class StaffManager {
  constructor (staffRepo) {
    this.staffRepo = staffRepo || new StaffRepo()
  }
  getAll ({ limit = 50 } = {}, callback) {
    async.waterfall(
      [
        this.staffRepo.getAll.bind(this.staffRepo),
        (staffs, cb) => {
          async.mapLimit(staffs, limit, this.staffRepo.get.bind(this.staffRepo), cb)
        }
      ],
      callback
    )
  }
  find (data, { limit = 50 }, callback) {
    if (data && data.length) {
      const list = data.split(',') || []
      async.mapLimit(list, limit, this.staffRepo.get.bind(this.staffRepo), callback)
    } else {
      process.nextTick(() => {
        callback(null, [])
      })
    }
  }
}

StaffManager.Subscribe = '陕西陕煤曹家滩矿业有限公司:人员精确定位系统:channel'

module.exports = StaffManager
