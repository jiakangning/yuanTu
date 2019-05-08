/* 主煤流 */
const asyn = require('async')
const MainCoalFlowRepo = require('../../model/monitor/MainCoalFlowRepo')

class MainCoalFlowManager {
  constructor (repo) {
    this.repo = repo || new MainCoalFlowRepo()
  }
  getAll ({ limit = 20 } = {}, callback) {
    asyn.waterfall(
      [
        this.repo.getAll.bind(this.repo),
        (mainCoalFlows, cb) => {
          asyn.mapLimit(mainCoalFlows, limit, this.repo.get.bind(this.repo), cb)
        }
      ], callback)
  }
}

module.exports = MainCoalFlowManager
