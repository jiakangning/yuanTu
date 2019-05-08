const async = require('async')

class SafeManager {
  constructor (repo) {
    if (repo) {
      this.repo = repo
    } else {
      const SafeRepo = require('../../model/monitor/SafeRepo')
      this.repo = new SafeRepo()
    }
  }
  getAll ({ limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAll.bind(this.repo),
      (result, cb) => async.mapLimit(result, limit, this.repo.get.bind(this.repo), cb)
    ], callback)
  }
  getAlarms ({ limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAlarms.bind(this.repo),
      (result, cb) => async.mapLimit(result, limit, this.repo.get.bind(this.repo), cb)
    ], callback)
  }
}

module.exports = SafeManager
