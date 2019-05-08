const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const morgan = require('morgan')
const cors = require('cors')
const passportSocketIo = require('passport.socketio')

const config = require('./config/config.loader').load()
const redisCtx = require('./config/plugin.redis')
const dbCtx = require('./app/model')
const passport = require('./config/plugin.passport')

const AuthRoute = require('./app/router/auth')

const app = express()
const csrfProtection = csrf()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'app', 'public')))

const sessionStore = new RedisStore({ client: redisCtx })

app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(csrfProtection)

app.use('/auth', AuthRoute)

const server = app.listen(config.server.http.port, () => {
  console.log(`已正常开启Http服务，使用端口：${config.server.http.port}`)
  if (process.env.NODE_ENV === 'production') {
    dbCtx.sequelize.authenticate()
      .then(() => {
        console.log('已正常连接数据库')
      })
      .catch(err => {
        console.log('无法连接数据库，故障描述：', err)
      })
  } else if (process.env.NODE_ENV === 'development') {
    dbCtx.sequelize.sync()
      .then(_ => {
        console.log('已同步更新数据库结构')
      })
      .catch(err => {
        console.log('无法同步更新数据库结构，故障描述：', err)
      })
  }
})
const io = require('./config/plugin.socket').init(server)
io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: config.session.secret,
  store: sessionStore,
  success: (data, accept) => {
    console.log('successful connection to socket.io')
    accept(null, true)
  },
  fail: (data, message, error, accept) => {
    console.log('failed connection to socket.io:', message)
    accept(new Error(message))
  }
}))
io.on('connect', socket => {
  console.log('已正常连接实时推送客户端')
  io.emit('message', { type: 'add', payload: { subject: '通知', body: '欢迎回来' } })
})
setInterval(() => {
  io.clients((_, clients) => {
    clients.forEach(key => {
      console.log(io.sockets.connected[key].request)
    })
  })
}, 5000)
