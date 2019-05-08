const Influx = require('influxdb-nodejs')
const config = require('../../../config/config.loader').load().influx
const async = require('async')
const moment = require('moment')
let dblink = 'http://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.db
const client = new Influx(dblink)
// 获取指定tag的人员或车辆的最近一条数据 type 车辆 人员
class HistoryManager {
  getLastestInfo (tag, type, callback) {
    async.waterfall([
      (cb) => {
        if (type === '车辆') {
        // client.queryRaw('select * from "taxi_vehicleCollection limit 1"')
          client.query('taxi_vehicleCollection')
            .addField('lanewayName', 'lanewayIndex', 'coord', 'time')
            .where('tag', tag)
            .set('limit', 1)
            .set('order by', 'time')
            .set('desc')
            .addGroup('tag')
            .then((res) => dealInfluxData(res, cb))
            .catch(err => cb(err))
        } else if (type === '人员') {
          client.query('taxi_passengerInfoCollection')
            .where('tag', tag)
            .addField('lanewayName', 'lanewayIndex', 'coord', 'time')
            .set('limit', 1)
            .set('order by', 'time')
            .set('desc')
            .addGroup('tag')
            .then((res) => dealInfluxData(res, cb))
            .catch(err => cb(err))
        } else {
          cb(new Error('can not find lastestInfo because type is invalid'))
        }
      }], (err, result) => {
      callback(err, result)
    })
  }
  getHitoryPath (tag, type, startTime, endTime, callback) {
    async.waterfall([
      (cb) => {
        if (type === '车辆') {
          client.query('taxi_vehicleCollection')
            .where('tag', tag)
            .where('time', startTime, '>=')
            .where('time', endTime, '<=')
            .then((res) => dealInfluxData(res, cb))
            .catch(err => cb(err))
        } else if (type === '人员') {
          client.query('taxi_passengerInfoCollection')
            .where('tag', tag)
            .where('time', startTime, '>=')
            .where('time', endTime, '<=')
            .then((res) => dealInfluxData(res, cb))
            .catch(err => cb(err))
        } else {
          cb(new Error('can not find lastestInfo because type is invalid'))
        }
      }], (err, result) => {
      if (err) {
        console.log(err)
        return callback(err)
      }
      if (result && Array.isArray(result)) {
        const data = result.map(obj => {
          JSON.parse(obj.coord)
          return { time: obj.time, coord: obj.coord }
        })
        return callback(null, data || [])
      }
    })
  }
  getHistoryMile (tag, type, startTime, endTime, cb) {
    this.getHitoryPath(tag, type, startTime, endTime, (err, result) => {
      if (err) return cb(err)
      if (result.length <= 1) {
        return cb(null, 0)
      }
      let waitTime = 0
      const miles = result.reduce((num, v, i, arr) => {
        if (i === 0) {
          return num
        } else {
          const x = JSON.parse(v.coord)[0] - JSON.parse(arr[ i - 1 ].coord)[0]
          const y = JSON.parse(v.coord)[1] - JSON.parse(arr[ i - 1 ].coord)[1]
          const z = JSON.parse(v.coord)[2] - JSON.parse(arr[ i - 1 ].coord)[2]

          let startTime = moment(arr[ i - 1 ].time)
          let endTime = moment(v.time)
          let duration = endTime.diff(startTime, 'seconds')
          const dis = Math.sqrt(x * x + y * y + z * z)
          const speed = dis / duration
          if (speed <= 1) {
            waitTime += duration
          }
          return num.concat(Math.sqrt(x * x + y * y + z * z))
        }
      }, [])
      if (miles.length === 0) {
        cb(null, { waitTime: 0, miles: 0 })
      } else {
        const sum = miles.reduce((x, y) => x + y)
        cb(null, { waitTime: waitTime, miles: sum })
      }
    })
  }
}

// 数据处理
const dealInfluxData = (data, cb) => {
  try {
    const results = data.results || []
    const items = results.reduce((total, current) => {
      const series = current.series || []
      const collection = series.reduce((list, item) => {
        const values = item.values || []
        const objs = values.map(value => {
          const temp = value.reduce((obj, v, index) => {
            obj[`${item.columns[index]}`] = v
            return obj
          }, {})
          temp.tag = (item.tags && item.tags.tag) || ''
          return temp
        })
        return list.concat(objs)
      }, [])
      return total.concat(collection)
    }, [])
    cb(null, items)
  } catch (err) {
    cb(err)
  }
}

module.exports = HistoryManager
