class MinePressureRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(MinePressureRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

MinePressureRepo.Key = '陕西陕煤曹家滩矿业有限公司:矿压监测系统'

module.exports = MinePressureRepo
