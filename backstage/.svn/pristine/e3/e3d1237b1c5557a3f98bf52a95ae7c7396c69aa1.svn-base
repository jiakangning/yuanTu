const DrainageManager = require('../service/monitor/DrainageManager')
const MainCoalFlowManager = require('../service/monitor/MainCoalFlowManager')
const SafeManager = require('../service/monitor/SafeManager')
const MinePressureManager = require('../service/monitor/MinePressureManager')
const MainFanManger = require('../service/monitor/MainFanManager')
const MonitorManger = require('../service/monitor/MonitorManager')
const EquipmentManager = require('../service/monitor/EquipmentManager')
const { subscribe } = require('../../config/plugin.subscribe')
const locale = require('../locale').load()
const socket = require('../../config/plugin.socket')

/* 排水 */
exports.getAllDrainages = (req, res, next) => {
  const drainageManager = new DrainageManager()
  drainageManager.getAll({}, (error, drainages) => {
    if (error) {
      next(error)
    } else {
      res.json(drainages)
    }
  })
}

exports.pushAllDrainages = ({ interval = 5000 } = {}) => {
  const io = socket.singleton()
  const drainageChannel = io.of('/monitor/drainages')
  const drainageManager = new DrainageManager()
  subscribe('RTP.Automatic.Drain', null, (error, channel, message) => {
    if (error) return socket.emit(drainageChannel, 'error', error.message || locale.automatic.drain.exception)
    drainageManager.getAll({}, (error, drainages) => {
      if (error) return socket.emit(drainageChannel, 'error', error.message || locale.automatic.drain.none)
      socket.emit(drainageChannel, 'data', { type: 'show', payload: drainages })
    })
  })
}

/* 主煤流 */
exports.getAllMainCoalFlow = (req, res, next) => {
  const mainCoalFlowManager = new MainCoalFlowManager()
  mainCoalFlowManager.getAll({}, (error, mainCoalFlows) => {
    if (error) {
      next(error)
    } else {
      res.json(mainCoalFlows)
    }
  })
}

exports.pushAllMainCoalFlows = ({ interval = 5000 } = {}) => {
  const io = socket.singleton()
  const flowChannel = io.of('/monitor/main-coal-flows')
  const mainCoalFlowManager = new MainCoalFlowManager()
  subscribe('RTP.Automatic.CoalFlow', null, (error, channel, message) => {
    if (error) return socket.emit(flowChannel, 'error', error.message || locale.automatic.coalFlow.exception)
    mainCoalFlowManager.getAll({}, (error, mainCoalFlows) => {
      if (error) return socket.emit(flowChannel, 'error', error.message || locale.automatic.coalFlow.none)
      socket.emit(flowChannel, 'data', { type: 'show', payload: mainCoalFlows })
    })
  })
}

/** 安全监控 */
exports.getAllSafty = (req, res, next) => {
  const safeManager = new SafeManager()
  safeManager.getAll({}, (error, result) => {
    if (error) {
      next(error)
    } else {
      res.json(result)
    }
  })
}
// 推送全部安全监控值
exports.pushAllSafty = () => {
  const io = socket.singleton()
  const safeChannel = io.of('/monitor/safties')
  const safeManager = new SafeManager()
  subscribe('RTP.Automatic.Security', null, (error, channel, message) => {
    if (error) return socket.emit(safeChannel, 'error', error.message || locale.automatic.security.exception)
    safeManager.getAll({}, (error, result) => {
      if (error) {
        return socket.emit(safeChannel, 'error', error.message || locale.automatic.security.none)
      }
      return socket.emit(safeChannel, 'data', { type: 'show', payload: result })
    })
  })
}

/** 矿压监测 */
exports.getAllMinePressures = (req, res, next) => {
  const minePressureManager = new MinePressureManager()
  minePressureManager.getAll({}, (error, result) => {
    if (error) {
      next(error)
    } else {
      res.json(result)
    }
  })
}
// 推送全部矿压监测值
exports.pushAllMinePressures = ({ interval = 5000 } = {}) => {
  const io = socket.singleton()
  const pressureChannel = io.of('/monitor/mine-pressures')
  const minePressureManager = new MinePressureManager()
  subscribe('RTP.Automatic.Pressure', null, (error, channel, message) => {
    if (error) return socket.emit(pressureChannel, 'error', error.message || locale.automatic.pressure.exception)
    minePressureManager.getAll({}, (error, result) => {
      if (error) {
        return socket.emit(pressureChannel, 'error', error.message || locale.automatic.pressure.none)
      }
      return socket.emit(pressureChannel, 'data', { type: 'show', payload: result })
    })
  })
}

/** 主扇风机 */
exports.getAllMainFan = (req, res, next) => {
  const mainFanManger = new MainFanManger()
  mainFanManger.getAll({}, (error, result) => {
    if (error) {
      next(error)
    } else {
      res.json(result)
    }
  })
}
exports.pushAllMainFan = () => {
  const io = socket.singleton()
  const fanChannel = io.of('/monitor/main-fans')
  const mainFanManger = new MainFanManger()
  subscribe('RTP.Automatic.Fan', null, (error, channel, message) => {
    if (error) return socket.emit(fanChannel, 'error', error.message || locale.automatic.fan.exception)
    mainFanManger.getAll({}, (error, result) => {
      if (error) {
        return socket.emit(fanChannel, 'error', error.message || locale.automatic.fan.none)
      }
      return socket.emit(fanChannel, 'data', { type: 'show', payload: result })
    })
  })
}

// 获取全部监控系统的报警数据
exports.getAllAlarms = (req, res, next) => {
  const monitorManger = new MonitorManger()
  monitorManger.getAlarms({}, (error, result) => {
    if (error) {
      next(error)
    } else {
      res.json(result)
    }
  })
}
// 推送全部监测系统的报警数据
exports.pushAllAlarms = () => {
  const io = socket.singleton()
  const alarmChannel = io.of('/monitor/alarm')
  const monitorManger = new MonitorManger()
  subscribe('RTP.Automatic.Alarm', null, (error, channel, message) => {
    if (error) return socket.emit(alarmChannel, 'error', error.message || locale.automatic.alarm.exception)
    monitorManger.getAlarms({}, (error, result) => {
      if (error) {
        return socket.emit(alarmChannel, 'error', error.message || locale.automatic.alarm.none)
      }
      return socket.emit(alarmChannel, 'data', { type: 'show', payload: result })
    })
  })
}

/*
  creator:zhengkai
  date: 2019-05-07
  description: 获取全部设备描述信息，返回根据系统所属进行分组后的集合
*/
exports.equipments = (req, res, next) => {
  const equipmentManager = new EquipmentManager()
  equipmentManager.getByKeys(
    [
      '麻地梁:压风机监控系统',
      '麻地梁:安全监控系统'
    ],
    { limit: 20 },
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: true, message: '获取设备描述信息出现错误' })
      }
      return res.json(result)
    }
  )
}
