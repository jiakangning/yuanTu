const Op = require('sequelize').Op

module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { args: false, message: '名称不能为空' }
      }
    },
    type: DataTypes.STRING(20),
    x: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    /**
     * 旋转角度
     */
    rotate: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    /**
     * 所属组态/系统
     */
    belongsTo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: false, message: '所属系统不能为空' }
      }
    },
    target: DataTypes.STRING(200),
    bindSystem: DataTypes.STRING(200),
    bindGuid: DataTypes.STRING(200)
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'gis_position',
    underscored: true
  })
  Position.associate = function (models) {
    // associations can be defined here
  }
  Position.getList = (args, callback) => {
    const query = {}
    if (args) {
      for (const key in args) {
        if (args.hasOwnProperty(key)) {
          query[key] = { [Op.and]: args[key] }
        }
      }
    }
    Position.findAll({
      where: query
    })
      .then(result => {
        callback(null, result)
      })
      .catch(err => {
        let error = { error: true, message: '绑定信息查询失败', err }
        callback(error)
      })
  }
  return Position
}
