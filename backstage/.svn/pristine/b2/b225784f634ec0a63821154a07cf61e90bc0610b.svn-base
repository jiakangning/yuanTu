const Sequelize = require('sequelize')
const Op = Sequelize.Op
const dbCtx = require('../../../database/dbCtx')
const {
  phoneNum
} = require('../../util/validator.regex')
const bcrypt = require('bcryptjs')
const buildDefaultOption = require('../../util/buildDefaultOption')
const User = dbCtx.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      is: phoneNum
    }
  },
  lastLoginTime: {
    type: Sequelize.DATE,
    field: 'last_login_time'
  },
  isLocked: {
    type: Sequelize.BOOLEAN,
    field: 'is_locked'
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'system_user'
})

User.beforeSave((user, options) => {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, 12)
      .then(hashedPwd => {
        user.password = hashedPwd
      })
  }
})
/**
 * 判断用户名是否存在
 */
User.isExist = async function (name) {
  try {
    let flag = await User.count({
      where: {
        name
      }
    })
    return flag > 0
  } catch (err) {
    throw new Error(err)
  }
}
User.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

User.buildOptions = function ({ keywords = '', ...raw } = {}) {
  let result = buildDefaultOption(raw)
  // 查询相关列
  keywords && (result.where = {
    [Op.or]: [
      { username: { [Op.like]: `%${keywords}%` } },
      { email: { [Op.like]: `%${keywords}%` } },
      { mobile: { [Op.like]: `%${keywords}%` } }
    ]
  })
  return result
}

User.updateUserAndContact = function ({ user, contact }, { User, Contact }) {
  return dbCtx
    .transaction((t) => {
      return Promise.all([
        Contact
          .update(contact, {
            where: {
              id: contact.id
            },
            transaction: t
          }),
        User
          .update(user, {
            where: {
              id: user.id
            },
            transaction: t,
            individualHooks: true
          })
      ])
    })
}

/**
 * 关联创建
 */
User.createUserAndContact = function (input, { User, Contact }) {
  return dbCtx
    .transaction((t) => {
      return User
        .create(input, { include: [Contact], transaction: t })
    })
}

module.exports = User
