class MainCoalFlowRepo {
  constructor (cache) {
    this.cache = cache || require('../../../config/plugin.redis').singleton()
  }
  getAll (callback) {
    this.cache.smembers(MainCoalFlowRepo.Key, callback)
  }
  get (key, callback) {
    this.cache.hgetall(key, callback)
  }
}

MainCoalFlowRepo.Key = '陕西陕煤曹家滩矿业有限公司:煤流自动化子系统'

module.exports = MainCoalFlowRepo
