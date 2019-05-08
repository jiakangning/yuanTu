class UserManager {
  constructor (userRepo) {
    this.userRepo = userRepo || require('../../model').User
  }
  create (input, callback) {
    const { name, password, email, mobile } = input
    this.userRepo.create({ name, password, email, mobile })
      .then(user => { callback(null, user.get({ plain: true })) })
      .catch(err => { callback(err) })
  }
  login (input, callback) {
    const { name, password } = input
    this.userRepo.findOne({ where: { name } })
      .then(user => {
        if (user) {
          if (user.comparePassword(password)) {
            return callback(null, user.get({ plain: true }))
          }
          return callback(new Error('用户名或密码错误'), false)
        }
        return callback(new Error('用户名不存在'), false)
      })
      .catch(err => { callback(err) })
  }
  findByPk (id, callback) {
    this.userRepo.findByPk(id)
      .then(user => {
        callback(null, user.get({ plain: true }))
      })
      .catch(err => {
        callback(err)
      })
  }
  update (input, callback) {
    const { id, name, password } = input
    this.userRepo.findByPk(id)
      .then(user => {
        if (user) {
          user.name = name
          if (password) {
            user.password = password
          }
          user.save()
            .then(() => callback(null, user))
            .catch(err => callback(err))
        } else {
          callback(new Error('用户账户不存在'))
        }
      })
      .catch(err => callback(err))
  }
}

module.exports = UserManager
