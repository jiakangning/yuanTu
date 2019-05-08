class StaffRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(StaffRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

StaffRepo.Key = '陕西陕煤曹家滩矿业有限公司:人员精确定位系统:井下'

module.exports = StaffRepo
