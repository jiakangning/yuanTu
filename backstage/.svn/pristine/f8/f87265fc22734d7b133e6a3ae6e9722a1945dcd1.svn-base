// const cluster = require('cluster')
const Redis = require('ioredis')

// if (cluster.isMaster) {
//   const setting = require('./config/config.loader').load().redis
//   const client = new Redis({
//     host: setting.host,
//     port: setting.port,
//     password: setting.password,
//     retryStrategy: times => (Math.min(times * 50, 2000))
//   })
//   client.on('error', (err) => {
//     console.log(`连接Redis发布服务出现问题，故障描述：${err}`)
//   })
//   setInterval(() => {
//     client.publish('RTP.Automatic.Drain', 'ALL')
//     client.publish('RTP.Automatic.CoalFlow', 'ALL')
//     client.publish('RTP.Automatic.Fan', 'ALL')
//     client.publish('RTP.Automatic.Pressure', 'ALL')
//     client.publish('RTP.Automatic.Security', 'ALL')
//     client.publish('RTP.Automatic.Alarm', 'ALL')
//   }, 20000)
//   cluster.fork()
// } else {
//   require('./app')
// }

const setting = require('./config/config.loader').load().redis
const client = new Redis({
  host: setting.host,
  port: setting.port,
  password: setting.password,
  retryStrategy: times => (Math.min(times * 50, 2000))
})
client.on('error', (err) => {
  console.log(`连接Redis发布服务出现问题，故障描述：${err}`)
})
setInterval(() => {
  client.publish('RTP.Automatic.Drain', 'ALL')
  client.publish('RTP.Automatic.CoalFlow', 'ALL')
  client.publish('RTP.Automatic.Fan', 'ALL')
  client.publish('RTP.Automatic.Pressure', 'ALL')
  client.publish('RTP.Automatic.Security', 'ALL')
  client.publish('RTP.Automatic.Alarm', 'ALL')
}, 20000)
