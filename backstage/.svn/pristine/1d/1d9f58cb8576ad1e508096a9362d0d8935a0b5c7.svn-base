module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('taxi_registration', {
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
      // 出发地点
      from: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 司机编号
      driver_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 司机姓名
      driver_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 司机电话
      driver_mobile: {
        type: Sequelize.STRING
      },
      // 车牌号码
      license: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 车辆种类
      category: {
        type: Sequelize.STRING
      },
      // 车辆名称
      vehicle: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING,
        allowNull: false
      },
      // 调度员姓名
      auditor_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      check_in: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      in_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      out_time: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taxi_registration')
  }
}
