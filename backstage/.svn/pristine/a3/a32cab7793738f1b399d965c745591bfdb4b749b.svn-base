module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('taxi_order', {
      // 唯一自增主键
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // 用车类型
      mode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'crew'
      },
      // 用车人编号
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 用车人姓名
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 用车人电话
      user_mobile: {
        type: Sequelize.STRING
      },
      // 用车部门
      department: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 出发地点
      from: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 目的地点
      to: {
        type: Sequelize.STRING
      },
      // 乘车人数
      seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // 是否包车
      advanced: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      // 上车坐标
      start_point: {
        type: Sequelize.FLOAT
      },
      // 下车坐标
      end_point: {
        type: Sequelize.FLOAT
      },
      // 上车时间
      started_at: {
        type: Sequelize.DATE
      },
      // 下车时间
      arrived_at: {
        type: Sequelize.DATE
      },
      // 司机编号
      driver_id: {
        type: Sequelize.STRING
      },
      // 司机姓名
      driver_name: {
        type: Sequelize.STRING
      },
      // 司机电话
      driver_mobile: {
        type: Sequelize.STRING
      },
      // 车牌号码
      license: {
        type: Sequelize.STRING
      },
      // 车辆种类
      category: {
        type: Sequelize.STRING
      },
      // 车辆名称
      vehicle: {
        type: Sequelize.STRING
      },
      // 订单状态
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      // 行驶里程
      miles: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      // 月份
      month: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 季度
      quarter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 调度员编号
      auditor_id: {
        type: Sequelize.STRING
      },
      // 调度员姓名
      auditor_name: {
        type: Sequelize.STRING
      },
      // 派单时间
      assigned_at: {
        type: Sequelize.DATE
      },
      // 记录创建时间
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // 最后更新时间
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // 标记删除时间
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taxi_order')
  }
}
