exports.server = {
  http: {
    port: 3721
  },
  websocket: {
    port: 3721
  }
}

exports.logger = {
  mode: 'combined'
}

exports.redis = {
  host: '127.0.0.1',
  port: 6379,
  password: ''
}

exports.session = {
  secret: 'my secret'
}

exports.sequelize = {
  username: 'postgres',
  password: 'libragy',
  database: 'syms',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres'
}

exports.jwt = {
  secret: 'callofduty',
  expires: '30 days'
}

exports.influx = {
  host: '127.0.0.1',
  port: 3021,
  username: 'admin',
  password: 'yt123456',
  db: 'ytos'
}

exports.localization = 'zh-cn'

exports.api = {
  location: 'http://39.153.160.229:8070'
}
