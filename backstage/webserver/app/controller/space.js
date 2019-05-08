const SpaceCalcManager = require('../service/space/spaceCalcManager')
const TraceManager = require('../service/space/TraceManager')
const History = require('../service/space/historyManager')
/**
 * 根据基站编号、方向、距离获取人员或车辆的位置
 */
exports.calcLocation = (req, res, next) => {
  new SpaceCalcManager().getpoint(req.body, (err, points) => {
    if (err) return res.status(500).json(err)
    res.json(points)
  })
}

exports.compose = (req, res, next) => {
  new TraceManager().compose((err, points) => {
    if (err) return res.status(500).json(err)
    res.json(points)
  })
}

/**
 *  传入多个当前人员或车辆位置,，从 influxdb 中获取记录的最后位置，获取轨迹，并存到influxdb中，点转为轨迹
 * @param { type:'车辆/人员',body:[{tag,coord,lanewayName,lanewayIndex }...]}
 * @return {返回多个人员或车辆的轨迹点数组}
*/
exports.createPath = (req, res, next) => {
  if (req.body && req.body.body && req.body.type) {
    const body = req.body.body
    const type = req.body.type
    new SpaceCalcManager().getpath(body, type, (err, points) => {
      if (err) return res.status(500).json(err)
      res.json(points)
    })
  } else {
    res.status(400).json('req  parameter invalid')
  }
}

/** 获取历史记录中指定tag的最近一条记录
 * @param { tag: ,type:'车辆/人员'}
 */
exports.getLastestInfo = (req, res, next) => {
  if (req.body && req.body.tag && req.body.type) {
    const tag = req.body.tag
    const type = req.body.type
    new History().getLastestInfo(tag, type, (err, points) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(points)
    })
  } else {
    res.status(400).json('req  parameter invalid')
  }
}
/** 获取指定tag指定时间起点的历史轨迹
 * @param { tag: ,type:'车辆/人员',startTime:}
 * @return {time: ,coord: }
 */
exports.getHitoryPath = (req, res, next) => {
  if (req.body && req.body.tag && req.body.type && req.body.startTime && req.body.endTime) {
    const tag = req.body.tag
    const type = req.body.type
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    new History().getHitoryPath(tag, type, startTime, endTime, (err, points) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(points)
    })
  } else {
    res.status(400).json('req  parameter invalid')
  }
}

/** 获取指定tag指定时间起点的里程
 * @param { tag: ,type:'车辆/人员',startTime:}
 * @retun number
 */
exports.getHistoryMile = (req, res, next) => {
  if (req.body && req.body.tag && req.body.type && req.body.startTime && req.body.endTime) {
    const tag = req.body.tag
    const type = req.body.type
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    new History().getHistoryMile(tag, type, startTime, endTime, (err, points) => {
      if (err) return res.status(500).json(err)
      res.status(200).json(points)
    })
  } else {
    res.status(400).json('req  parameter invalid')
  }
}
