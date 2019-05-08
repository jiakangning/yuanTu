const async = require('async')

class MainFanManager {
  constructor (repo) {
    if (repo) {
      this.repo = repo
    } else {
      const MainFanRepo = require('../../model/monitor/MainFanRepo')
      this.repo = new MainFanRepo()
    }
  }
  getAll ({ limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAll.bind(this.repo),
      (result, cb) => async.mapLimit(result, limit, this.repo.get.bind(this.repo), cb),
      (res, cb) => {
        if (res && res.length) {
          cb(null, res.map(item => { return { ...item, tag: item.name, name: item.tag } }))
        } else {
          cb(null, [])
        }
      }
    ], callback)
  }
}

module.exports = MainFanManager