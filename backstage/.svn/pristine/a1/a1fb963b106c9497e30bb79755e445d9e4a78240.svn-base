const cluster = require('cluster')
const net = require('net')
const farmhash = require('farmhash')
const Redis = require('ioredis')

const port = require('./config/config.loader').load().server.http
const cpus = require('os').cpus().length

if (cluster.isMaster) {
  const workers = []
  const spawn = function (i) {
    workers[i] = cluster.fork()
    workers[i].on('exit', (code, signal) => {
      console.log(`重新创建工作线程:${i}`)
      spawn(i)
    })
  }
  const hash = function (ip, len) {
    return farmhash.fingerprint32(ip) % len
  }
  for (let i = 0; i < cpus; i++) {
    spawn(i)
  }
  net.createServer({ pauseOnConnect: true }, function (connection) {
    const worker = workers[hash(connection.remoteAddress, cpus)]
    worker.send('sticky-session:connection', connection)
  }).listen(port)

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
  /*
    曹家滩自动化系统推送
  */
  // setInterval(() => {
  //   client.publish('RTP.Automatic.Drain', 'ALL')
  //   client.publish('RTP.Automatic.CoalFlow', 'ALL')
  //   client.publish('RTP.Automatic.Fan', 'ALL')
  //   client.publish('RTP.Automatic.Pressure', 'ALL')
  //   client.publish('RTP.Automatic.Security', 'ALL')
  //   client.publish('RTP.Automatic.Alarm', 'ALL')
  // }, 20000)

  setInterval(() => {
    client.publish('RTP.Automatic.Fan', 'ALL')
    client.publish('RTP.Automatic.Security', 'ALL')
    client.publish('RTP.Automatic.Alarm', 'ALL')
    client.publish('RTP.Position.Staff', 'ALL')
    client.publish('RTP.Position.Vehicle', 'ALL')
  }, 5000)
} else {
  require('./app')
}
