const async = require('async')

class MinePressureManager {
  constructor (repo) {
    if (repo) {
      this.repo = repo
    } else {
      const MinePressureRepo = require('../../model/monitor/MinePressureRepo')
      this.repo = new MinePressureRepo()
    }
  }
  getAll ({ limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAll.bind(this.repo),
      (pressures, cb) => async.mapLimit(pressures, limit, this.repo.get.bind(this.repo), cb)
    ], callback)
  }
}

module.exports = MinePressureManager
