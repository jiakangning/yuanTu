class EquipmentRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (key, callback) {
    this.cache.smembers(key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

module.exports = EquipmentRepo
