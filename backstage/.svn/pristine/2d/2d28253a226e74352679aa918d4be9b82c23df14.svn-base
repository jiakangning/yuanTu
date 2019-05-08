class MainFanRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(MainFanRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

// MainFanRepo.Key = '陕西陕煤曹家滩矿业有限公司:主扇风机监测系统'
MainFanRepo.Key = '麻地梁:压风机监控系统'

module.exports = MainFanRepo
