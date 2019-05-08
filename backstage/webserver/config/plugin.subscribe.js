const Redis = require('ioredis')

const set = {}

function load (config) {
  if (config) {
    return config
  }
  return require('./config.loader').load().redis
}

function activate (channel, config) {
  if (!set.hasOwnProperty(channel)) {
    const setting = load(config)
    const client = new Redis({
      host: setting.host,
      port: setting.port,
      password: setting.password,
      retryStrategy: times => (Math.min(times * 50, 2000))
    })
    client.on('error', (err) => {
      console.log(`连接Redis订阅服务出现问题，故障描述：${err}`)
    })
    Object.defineProperty(set, channel, {
      enumerable: true,
      configurable: false,
      writable: false,
      value: client
    })
  }
}

exports.subscribe = (channel, config, callback) => {
  activate(channel, config)
  set[channel].subscribe(channel, function (err, count) {
    if (err) {
      callback(err)
      console.log(`订阅Redis推送出现问题，故障描述：${err}`)
    } else {
      console.log('已正常订阅Redis推送')
    }
  })
  set[channel].on('message', (channel, message) => {
    return callback(null, channel, message)
  })
}
