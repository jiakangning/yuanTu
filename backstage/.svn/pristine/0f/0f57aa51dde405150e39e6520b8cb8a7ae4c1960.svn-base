module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gis_position', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(20)
      },
      x: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      y: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
      },
      target: {
        type: Sequelize.STRING(200)
      },
      bindSystem: {
        type: Sequelize.STRING(200)
      },
      bindGuid: {
        type: Sequelize.STRING(200)
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
    return queryInterface.dropTable('gis_position')
  }
}
