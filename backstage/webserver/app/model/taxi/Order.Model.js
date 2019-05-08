const { OrderMode, OrderState } = require('./OrderEnum')

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    // 用车类型
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: OrderMode.Crew
    },
    // 用车人编号
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id'
    },
    // 用车人姓名
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_name'
    },
    // 用车人电话
    userMobile: {
      type: DataTypes.STRING,
      field: 'user_mobile'
    },
    // 用车部门
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 出发地点
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 目的地点
    to: DataTypes.STRING,
    // 乘车人数
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // 是否包车
    advanced: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // 上车坐标
    startPoint: {
      type: DataTypes.FLOAT,
      field: 'start_point'
    },
    // 下车坐标
    endPoint: {
      type: DataTypes.FLOAT,
      field: 'end_point'
    },
    // 上车时间
    startedAt: {
      type: DataTypes.DATE,
      field: 'started_at'
    },
    // 下车时间
    arrivedAt: {
      type: DataTypes.DATE,
      field: 'arrived_at'
    },
    // 司机编号
    driverId: {
      type: DataTypes.STRING,
      field: 'driver_id'
    },
    // 司机姓名
    driverName: {
      type: DataTypes.STRING,
      field: 'driver_name'
    },
    // 司机电话
    driverMobile: {
      type: DataTypes.STRING,
      field: 'driver_mobile'
    },
    // 车牌号码
    license: {
      type: DataTypes.STRING
    },
    // 车辆种类
    category: {
      type: DataTypes.STRING
    },
    // 车辆名称
    vehicle: {
      type: DataTypes.STRING
    },
    // 订单状态
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: OrderState.Pending
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
      field: 'auditor_id'
    },
    // 调度员姓名
    auditorName: {
      type: DataTypes.STRING,
      field: 'auditor_name'
    },
    // 派单时间
    assignedAt: {
      type: DataTypes.DATE,
      field: 'assigned_at'
    }
  }, {
    // 启用软删除
    paranoid: true,
    // 启用连字符命名
    underscored: true,
    // 映射表名
    tableName: 'taxi_order'
  })
  Order.associate = function (models) {
    // associations can be defined here
  }
  return Order
}
