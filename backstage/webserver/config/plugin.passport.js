const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserManager = require('../app/service/membership/UserManager')

passport.serializeUser(
  function (user, done) {
    done(null, user.id)
  }
)

passport.deserializeUser(
  function (id, done) {
    new UserManager().findByPk(id, done)
  }
)

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    new UserManager().login({ name: username, password }, done)
  }
))

module.exports = passport
