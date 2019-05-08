
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    paranoid: true,
    underscored: true,
    tableName: 'membership_user'
  })
  User.associate = function (models) {
    // associations can be defined here
  }
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 12)
        .then(hashedPwd => {
          user.password = hashedPwd
        })
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
