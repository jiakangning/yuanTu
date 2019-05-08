/**
 * 空间计算管理类
 */
/**
 * locationinfo{lanewayName,lanewayIndex,coord}
 * stationinfo(lanewayName,lanewayIndex,coord,coords)
 */
const moment = require('moment')
const async = require('async')

const HistoryManager = require('./historyManager')
const TraceManager = require('./TraceManager')
let cache
class SpaceCalcManager {
  constructor (traceManager, historymanager) {
    this.historymanager = historymanager || new HistoryManager()
    this.traceManager = traceManager || new TraceManager()
  }

  load (callback) {
    if (!cache) {
      async.waterfall([
        this.traceManager.compose.bind(this.traceManager),
        (result, cb) => {
          // 拿到res后的其他的逻辑处理
          const points = result.map(item => (
            {
              lanewayName: item.name,
              coords: item.coords.map(coord => ({ x: coord.x, y: coord.y, z: coord.z_bottom })),
              stations: item.stations.map(st => ({ code: st.tag, coord: { x: st.coordinates[0], y: st.coordinates[1], z: st.coordinates[2] } }))
            }
          ))
          const pjtarr = this.getProjectStationArr(points)
          cb(null, { schema: points, pjtarr })
        }
      ], (err, result) => {
        if (err) return callback(err)
        cache = result
        callback(null, cache)
      })
    } else {
      process.nextTick(() => {
        callback(null, cache)
      })
    }
  }
  // 获取位置的接口
  getpoint (args, callback) {
    async.waterfall([
      this.load.bind(this),
      (result, cb) => {
        this.getLocation(args.body, result.pjtarr, cb)
      }
    ], (err, points) => {
      callback(err, points)
    })
  }

  // 获取路径的接口,type为数据类型 车辆或人员
  getpath (args, type, callback) {
    // 获取最近时间的位置信息，根据tag
    async.auto({
      cache: this.load.bind(this),
      lastLocations: cbk => this.historymanager.getLastestInfo(args.map(obj => obj.tag), type, cbk),
      paths: (['cache', 'lastLocations', (res, cb) => {
        let resultpath = []
        args.forEach((item, i, arr) => {
          const location = res.lastLocations.find(v => item.tag === v.tag)
          if (location) {
            location.coord = JSON.parse(location.coord)
            if (Array.isArray(location.coord) && location.coord.length === 3) {
              location.coord = { x: location.coord[0], y: location.coord[1], z: location.coord[2] }
            }
            if (location.lanewayName === undefined && location.lanewayIndex === undefined) {
              location.lanewayName = item.lanewayName
              location.lanewayIndex = item.lanewayIndex
            }
            const arr = this.calcpath(location, item, res.cache.schema)
            resultpath.push(arr)
          }
        })
        cb(null, resultpath)
      }]) }, (err, points) => {
      const paths = [].concat.apply([], points.paths)
      callback(err, paths)
    })
  }
  // 根据起止位置计算中间导线点数据，起点，终点，所有基站的信息（内含巷道导线点路径）
  calcpath (startLocation, endLocation, stationInfoArr) {
    try {
      if (Array.isArray(endLocation.coord) && endLocation.coord.length === 3) {
        endLocation.coord = { x: endLocation.coord[0], y: endLocation.coord[1], z: endLocation.coord[2] }
      }
      let paths = []
      // 如果找到上一个位置点
      if (startLocation && startLocation.lanewayName) {
        const startline = stationInfoArr.find(item => item.lanewayName === startLocation.lanewayName).coords
        const endline = stationInfoArr.find(item => item.lanewayName === endLocation.lanewayName).coords
        if (startLocation.lanewayName === endLocation.lanewayName) {
          if (startLocation.lanewayIndex === endLocation.lanewayIndex) {
            if (endLocation.coord && !Array.isArray(endLocation.coord)) {
              endLocation.coord = [endLocation.coord.x, endLocation.coord.y, endLocation.coord.z]
            }
            paths.push(endLocation)
          } else {
            paths = this.getConnectPathSameLaneway(startLocation, endLocation, startline)
          }
        } else {
          paths = this.getConnectPath(startLocation, startline, endLocation, endline)
        }
      } else {
        // 未找到上一个坐标点，则认为是起点
        if (endLocation.coord && !Array.isArray(endLocation.coord)) {
          endLocation.coord = [endLocation.coord.x, endLocation.coord.y, endLocation.coord.z]
        }
        paths.push(endLocation)
      }
      if (paths.length > 1) {
        let startTime = moment(startLocation.time)
        let endTime = moment(paths[paths.length - 1].time)
        let duration = endTime.diff(startTime) / (paths.length - 1)

        for (let i = 0; i < paths.length - 1; i++) {
          paths[i].time = moment(paths[i].time).add(duration * (i + 1)).utc(8).format()
        }
      }
      return paths
    } catch (err) {
      console.log({ calcpatherr: err })
    }
  }

  // 获取起始点在同一条巷道上的路径
  getConnectPathSameLaneway (startLocation, endLocation, line) {
    try {
      const paths = []
      endLocation.coord = [endLocation.coord.x, endLocation.coord.y, endLocation.coord.z]
      if (startLocation.lanewayIndex < endLocation.lanewayIndex) {
        for (let index = startLocation.lanewayIndex + 1; index <= endLocation.lanewayIndex; index++) {
          let location = Object.assign({}, endLocation)
          location.coord = [line[index].x, line[index].y, line[index].z]
          location.lanewayIndex = index
          paths.push(location)
        }
      } else if (startLocation.lanewayIndex > endLocation.lanewayIndex) {
        for (let index = endLocation.lanewayIndex - 1; index < startLocation.lanewayIndex; index--) {
          let location = Object.assign({}, endLocation)
          location.coord = [line[index].x, line[index].y, line[index].z]
          location.lanewayIndex = index
          paths.push(location)
        }
      }
      paths.push(endLocation)
      return paths
    } catch (err) {
      console.log(err)
    }
  }

  // 获取两条不同巷道间的路径,data1为起点，data2终点,data的数据格式为influxdb中的信息{coord, lanewayIndex,lanewayName,}
  getConnectPath (data1, line1, data2, line2) {
    // 获取两条巷道的连接点数据
    let result = this.getIntersection(line1, line2)
    // 里程距离
    // let distance = 0
    // 计算里程用的起始点
    // let lastPoint = data1
    let nextPoint = Object.assign({}, data2)

    let path = []
    // 更新路径和里程
    function updatePath (location) {
      nextPoint = location
      // distance += this.calcDistance(lastPoint.coord, nextPoint.coord)
      if (nextPoint.coord && !Array.isArray(nextPoint.coord)) {
        nextPoint.coord = [nextPoint.coord.x, nextPoint.coord.y, nextPoint.coord.z]
      }

      path.push(nextPoint)
      // lastPoint = nextPoint
    }
    // 不相交
    if (result.length === 0) {
      updatePath(data2)
      return path
      // return {
      //   Path: path,
      //   Length: distance
      // }
    }

    let con1 = Object.assign({}, data1)
    con1.coord = result[0].Point
    con1.lanewayIndex = result[0].Index
    let con2 = Object.assign({}, data2)
    con2.coord = result[1].Point
    con2.lanewayIndex = result[1].Index

    // data1作为起始点，不需要保存
    // path.push(data1.Point);

    // 添加data1与连接点中间的插值点,注意两个连接点只能添加一个到路径中，这里选择添加起点所在巷道的连接点
    if (data1.lanewayIndex < con1.lanewayIndex) {
      for (var i = data1.lanewayIndex + 1; i <= con1.lanewayIndex; i++) {
        let location = Object.assign({}, data1)
        location.coord = line1[i]
        location.lanewayIndex = i
        updatePath(location)
      }
    } else if (data1.lanewayIndex > con1.lanewayIndex) {
      for (let i = data1.lanewayIndex - 1; i >= con1.lanewayIndex; i--) {
        let location = Object.assign({}, data1)
        location.coord = line1[i]
        location.lanewayIndex = i
        updatePath(location)
      }
    } else {
      // 在同一段内，直接插入连接点
      let location = Object.assign({}, data1)
      location.coord = line1[con1.lanewayIndex]
      location.lanewayIndex = con1.lanewayIndex
      updatePath(location)
    }

    // 添加data2与连接点中间的插值点
    if (data2.lanewayIndex < con2.lanewayIndex) {
      for (let i = con2.lanewayIndex - 1; i > data2.lanewayIndex; i--) {
        let location = Object.assign({}, data2)
        location.coord = line2[i]
        location.lanewayIndex = i
        updatePath(location)
      }
    } else if (data2.lanewayIndex > con2.lanewayIndex) {
      for (let i = con2.lanewayIndex + 1; i <= data2.lanewayIndex; i++) {
        let location = Object.assign({}, data2)
        location.coord = line2[i]
        location.lanewayIndex = i
        updatePath(location)
      }
    }
    // 添加终点
    updatePath(data2)
    // distance += this.calcDistance(lastPoint, data2.coord)
    return path
  }

  // 取两条巷道的连接点（tunnel1, tunnel2导线点联系，容差）
  getIntersection (tunnel1, tunnel2, range) {
    // 限定是否连接的容差距离,默认取2米
    if (!range) {
      range = 2
    }
    // 用于记录连接点在各自巷道的位置索引
    let index1 = 0
    let index2 = 0
    let point1 = {}
    let point2 = {}
    let canBreak = false
    // 遍历两条巷道的导线点，取交叉点
    for (; index1 < tunnel1.length; index1++) {
      let node1 = tunnel1[index1]
      index2 = 0
      for (; index2 < tunnel2.length; index2++) {
        let node2 = tunnel2[index2]
        let distance = this.calcDistance(node1, node2)
        // 在连接范围内
        if (distance <= range) {
          point1 = node1
          point2 = node2
          canBreak = true
          break
        }
      }
      // 已经找到，中断遍历
      if (canBreak) {
        break
      }
    }
    // 判断是否有相交值，没有则返回空数组，有则返回两条巷道上的连接点数组
    if (canBreak) {
      return [{
        Point: point1,
        Index: index1
      }, {
        Point: point2,
        Index: index2
      }]
    } else {
      return []
    }
  }

  /**
   * @param {请求数组} req
   * @param {所有基站在巷道上的投影位置信息数组} pjtLocations
   */
  getLocation (req, pjtLocations, cb) {
    // 获取数据库中的巷道基站关联信息
    // const arr= spaceCalcRepo.getAll();
    // 基站在巷道上的投影位置信息
    // const pjtLocations=  getProjectStationArr(arr);
    // 创建索引
    try {
      if (req && Array.isArray(req)) {
        const res = req.map(obj => {
          let locators = obj.locators.toString()
          if (locators.startsWith('0')) {
            locators = locators.substring(1)
          }
          const location = pjtLocations.find(item => item.code.toString() === locators)
          if (location) {
            return this.calcLocationByStation(obj, location)
          } else {
            console.log(`getLocation faild , ${locators} station is invalid`)
            return obj
          }
        })
        cb(null, res)
      } else {
        console.log('getLocation faild  req param is not Array')
        cb(new Error('getLocation faild  req param is not Array'))
      }
    } catch (err) {
      cb(err)
    }
  }

  calcLocationByStation (req, info) {
    let res = Object.assign(req)
    res.lanewayName = info.lanewayName
    res.lanewayIndex = info.lanewayIndex
    res.coord = []
    const index = info.lanewayIndex
    const coords = info.lanewayCoords
    if (req && req.locators && req.direction >= 0 & req.distance >= 0) {
      // 与分站距离
      let distance = req.distance
      // 目标点
      let targetPoint = Object.assign({}, info.coord)

      let totalDis = 0
      let lastCoord = Object.assign({}, info.coord)

      if (req.direction === 1) {
        // 左侧方向
        targetPoint = Object.assign({}, coords[0])

        for (let j = info.lanewayIndex; j >= 0; j--) {
          let nextCoord = Object.assign({}, coords[j])
          // let d = this.calcDistance(nextCoord, lastCoord)
          let dir = this.subVector(lastCoord, nextCoord)
          let d = this.normalise(dir)
          totalDis += d
          if (totalDis >= distance) {
            // 距离大于指定距离，则目标点在该段内，计算与端点的距离和方向，从而得到该点坐标
            d = totalDis - distance
            // 以nextCoord为端点，在dir方向上取距离d的坐标点
            targetPoint = this.addVector(nextCoord, this.mulVector(dir, d))
            break
          }
          lastCoord = Object.assign({}, nextCoord)
        }
      } else if (req.direction === 2) {
        // 右侧方向
        targetPoint = Object.assign({}, coords[coords.length - 1])

        for (let j = index + 1; j < coords.length; j++) {
          let nextCoord = Object.assign({}, coords[j])
          let dir = this.subVector(lastCoord, nextCoord)
          let d = this.normalise(dir)
          totalDis += d
          if (totalDis >= distance) {
            d = totalDis - distance
            targetPoint = this.addVector(nextCoord, this.mulVector(dir, d))
            break
          }

          lastCoord = Object.assign({}, nextCoord)
        }
      }
      res.coord = [targetPoint.x, targetPoint.y, targetPoint.z]
    } else {
      console.log(`计算${req.locators}时方向无效`)
    }

    return res
  }

  /**
   *  获取所有基站的投影点数组
   * @param {从数据库中获取的巷道基站关联信息的数组} arr
   * @return {基站在巷道上的投影点信息数组}
   */
  getProjectStationArr (arr) {
    let pts = []
    arr.map(obj => {
      let temp = obj.stations.map(sta => {
        const { crosspoint, index } = this.getProjectPoint(obj.coords, sta.coord)
        return {
          code: sta.code,
          coord: crosspoint,
          lanewayName: obj.lanewayName,
          lanewayCoords: obj.coords,
          lanewayIndex: index
        }
      })
      pts.push(...temp)
    })
    return pts
  }

  /**
   * 获取点在线上的投影点
   * @param {点数组}  coords:[]
   * @param {点坐标} pt{x,y,z}
   * @return {}[pt,index]
   */
  getProjectPoint (coords, pt) {
    let index = 0
    let crosspoint = {}
    let minDis = -1.0
    // 以线段为单位，逐个检测
    for (let i = 0; i < coords.length - 1; i++) {
      let coord1 = coords[i]
      let coord2 = coords[i + 1]
      let closP = this.getClosestPoint(coord1, coord2, pt)
      let dis = this.calcDistance(closP, pt)
      if (minDis < 0 || minDis > dis) {
        minDis = dis
        crosspoint = closP
        index = i
      }
    }
    return { crosspoint, index }
  }

  calcDistance (c1, c2) {
    // 计算线段长
    let x = c1.x - c2.x
    let y = c1.y - c2.y
    let z = c1.z - c2.z
    return Math.sqrt(x * x + y * y + z * z)
  }

  calcLength (v) {
    // 计算线段长
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  }

  subVector (v1, v2) {
    let v = {}
    v.x = v1.x - v2.x
    v.y = v1.y - v2.y
    v.z = v1.z - v2.z
    return v
  }
  // 向量和数值的乘积
  mulVector (v, t) {
    v.x *= t
    v.y *= t
    v.z *= t
    return v
  }

  // 两个向量的和
  addVector (v1, v2) {
    var tar = {}
    tar.x = v1.x + v2.x
    tar.y = v1.y + v2.y
    tar.z = v1.z + v2.z
    return tar
  }
  normalise (v) {
    // 计算线段长
    let len = this.calcLength(v)
    if (len > 0) {
      let l = 1.0 / len
      v.x *= l
      v.y *= l
      v.z *= l
    }
    return len
  }

  dot (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
  }

  getPerpendicularPoint (p, origin, dir) {
    let v = this.subVector(p, origin)
    let t = this.dot(v, dir)
    let tar = {}
    tar.x = origin.x + dir.x * t
    tar.y = origin.y + dir.y * t
    tar.z = origin.z + dir.z * t
    return tar
  }

  getClosestPoint (p1, p2, p) {
    let dir = {}
    dir.x = p2.x - p1.x // 方向
    dir.y = p2.y - p1.y // 方向
    dir.z = p2.z - p1.z // 方向
    let lineLength = this.normalise(dir)
    // 获取点在线上投影
    let crossP = this.getPerpendicularPoint(p, p1, dir)
    let startDis = this.calcDistance(crossP, p1)
    let endDis = this.calcDistance(crossP, p2)
    // 检测相交点是否在线段内
    if (startDis > lineLength || endDis > lineLength) {
      if (startDis > endDis) {
        return p2
      } else {
        return p1
      }
    }
    return crossP
  }
}

module.exports = SpaceCalcManager
