/* 排水 */
const async = require('async')
const DrainageRepo = require('../../model/monitor/DrainageRepo')

class DrainageManager {
  constructor (repo) {
    this.repo = repo || new DrainageRepo()
  }
  getAll ({ limit = 20 } = {}, callback) {
    async.waterfall(
      [
        this.repo.getAll.bind(this.repo),
        (drainages, cb) => {
          async.mapLimit(drainages, limit, this.repo.get.bind(this.repo), cb)
        }
      ], callback)
  }
}

module.exports = DrainageManager
