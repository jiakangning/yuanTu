const Redis = require('ioredis')

let client

function load (config) {
  if (config) {
    return config
  }
  return require('./config.loader').load().redis
}

module.exports = {
  init: config => {
    const setting = load(config)
    client = new Redis({
      host: setting.host,
      port: setting.port,
      password: setting.password,
      retryStrategy: times => (Math.min(times * 50, 2000))
    })
    client.on('error', (err) => {
      console.log(`Redis缓存服务出现问题，故障描述：${err}`)
    })
    return client
  },
  singleton: () => {
    if (!client) {
      throw new Error('无法正常连接缓存服务')
    } else {
      return client
    }
  }
}
