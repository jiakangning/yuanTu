module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    /*
      用车类型
      乘运 crew
      货运 cargo
    */
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'crew'
    },
    // 出发地点
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 司机编号
    driverId: {
      type: DataTypes.STRING,
      field: 'driver_id',
      allowNull: false
    },
    // 司机姓名
    driverName: {
      type: DataTypes.STRING,
      field: 'driver_name',
      allowNull: false
    },
    // 司机电话
    driverMobile: {
      type: DataTypes.STRING,
      field: 'driver_mobile'
    },
    // 车牌号码
    license: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 车辆种类
    category: {
      type: DataTypes.STRING
    },
    // 车辆名称
    vehicle: {
      type: DataTypes.STRING
    },
    // 行驶里程
    miles: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    // 月份
    month: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 季度
    quarter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 调度员编号
    auditorId: {
      type: DataTypes.STRING,
      field: 'auditor_id',
      allowNull: false
    },
    // 调度员姓名
    auditorName: {
      type: DataTypes.STRING,
      field: 'auditor_name',
      allowNull: false
    },
    checkIn: {
      type: DataTypes.BOOLEAN,
      field: 'check_in',
      allowNull: false,
      defaultValue: true
    },
    inTime: {
      type: DataTypes.DATE,
      field: 'in_time',
      allowNull: false
    },
    outTime: {
      type: DataTypes.DATE,
      field: 'out_time'
    }
  }, {
    // 启用软删除
    paranoid: true,
    // 启用连字符命名
    underscored: true,
    // 映射表名
    tableName: 'taxi_registration'
  })
  Registration.associate = function (models) {
    // associations can be defined here
  }
  return Registration
}
