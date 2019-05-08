class SafeRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(SafeRepo.Key, callback)
  }
  getAlarms (callback) {
    this.cache.smembers(SafeRepo.AlarmKey, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

// SafeRepo.Key = '陕西陕煤曹家滩矿业有限公司:安全监控系统'
// SafeRepo.AlarmKey = '陕西陕煤曹家滩矿业有限公司:安全监控系统:报警'

SafeRepo.Key = '麻地梁:安全监控系统'
SafeRepo.AlarmKey = '麻地梁:安全监控系统:报警'

module.exports = SafeRepo
