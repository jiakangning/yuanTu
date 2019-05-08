class VehicleRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(VehicleRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

VehicleRepo.Key = '陕西陕煤曹家滩矿业有限公司:车辆精确定位系统:井下'

module.exports = VehicleRepo
