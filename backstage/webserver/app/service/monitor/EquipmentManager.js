const async = require('async')

class EquipmentManager {
  constructor (repo) {
    if (repo) {
      this.repo = repo
    } else {
      const EquipmentRepo = require('../../model/monitor/EquipmentRepo')
      this.repo = new EquipmentRepo()
    }
  }
  getByKey (key, { limit = 20 }, callback) {
    async.waterfall([
      this.repo.getAll.bind(this.repo, key),
      (equipments, cb) => {
        async.mapLimit(equipments, limit, this.repo.get.bind(this.repo), cb)
      }
    ], callback)
  }
  getByKeys (keys, { limit = 20 }, callback) {
    async.map(keys, (key, cb) => {
      this.getByKey(key, { limit }, cb)
    }, (err, result) => {
      if (err) {
        return callback(err)
      }
      callback(null, keys.map((key, index) => ({
        key: key.indexOf(':') > -1 ? key.substring(key.lastIndexOf(':') + 1) : key,
        items: result[index]
      })))
    })
  }
}

module.exports = EquipmentManager
