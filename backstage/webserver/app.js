const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config.loader').load()
const dbCtx = require('./app/model')

const authRoute = require('./app/router/auth')
// const { sps } = require('./app/middleware/authenticate')
const failure = require('./app/middleware/failure')
const spaceRoute = require('./app/router/space')
const gisRoute = require('./app/router/gis')
const monitorRoute = require('./app/router/monitor')

/*
  曹家滩人/车定位路由
*/
// const locationRoute = require('./app/router/location')

/*
  麻地梁人/车定位路由
*/
const employeeRoute = require('./app/router/employee')
const vehicleRoute = require('./app/router/vehicle')

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(require('./config/plugin.morgan')('log'))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'app', 'public')))

app.use('/auth', authRoute)
// app.use(rps())

app.use('/space', spaceRoute)
app.use('/position', gisRoute)

app.use('/monitor', monitorRoute)
/*
  曹家滩人/车定位路由
*/
// app.use('/location', locationRoute)

/*
  麻地梁人/车定位路由
*/
app.use(employeeRoute)
app.use(vehicleRoute)

app.use(failure)

const server = app.listen(0, 'localhost', () => {
  console.log(`已正常开启Http服务，使用端口：${config.server.http.port}`)
  if (process.env.NODE_ENV === 'production') {
    dbCtx.sequelize.authenticate().then(() => {
      console.log('已正常连接数据库')
    }).catch(err => {
      console.log('无法连接数据库，故障描述：', err)
    })
  } else if (process.env.NODE_ENV === 'development') {
    dbCtx.sequelize.sync({ force: false }).then(_ => {
      console.log('已同步更新数据库结构')
    }).catch(err => {
      console.log('无法同步更新数据库结构，故障描述：', err)
    })
  }
})

require('./config/plugin.redis').init()
require('./config/plugin.socket').init(server)
// io.use(sps())

/*
  曹家滩推送
*/
// 定位相关推送
// const location = require('./app/controller/location')
// location.pushAllStaffs()
// location.pushAllVehicles()

// 监测监控相关推送
// const monitor = require('./app/controller/monitor')
// monitor.pushAllSafty({ interval: 20000 })
// monitor.pushAllMinePressures({ interval: 20000 })
// monitor.pushAllMainFan({ interval: 20000 })
// monitor.pushAllDrainages({ interval: 20000 })
// monitor.pushAllMainCoalFlows({ interval: 20000 })
// monitor.pushAllAlarms({ interval: 20000 })

/*
  麻地梁推送
*/
require('./app/controller/employee').subscribe()
require('./app/controller/vehicle').subscribe()
const { pushAllMainFan, pushAllSafty, pushAllAlarms } = require('./app/controller/monitor')
pushAllAlarms()
pushAllSafty()
pushAllMainFan()
// require('./app/controller/taxi').connect(io)

process.on('message', (message, connection) => {
  if (message !== 'sticky-session:connection') {
    return undefined
  }
  server.emit('connection', connection)
  connection.resume()
})
