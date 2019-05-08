const async = require('async')

class MonitorManager {
  constructor (safeManager, coalFlowManager, drainageManager, pressureManager, mainFanManager) {
    if (safeManager) {
      this.safeManager = safeManager
    } else {
      const SafeManager = require('./SafeManager')
      this.safeManager = new SafeManager()
    }
  }
  getAlarms ({ limit = 20 }, callback) {
    async.auto({
      // 安全监控报警数据
      safeList: this.safeManager.getAlarms.bind(this.safeManager, { limit })
      // 其他模块报警数据
    }, callback)
  }
}

module.exports = MonitorManager
