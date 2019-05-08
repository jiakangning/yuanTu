class DrainageRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(DrainageRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

DrainageRepo.Key = '陕西陕煤曹家滩矿业有限公司:排水自动化系统'

module.exports = DrainageRepo
