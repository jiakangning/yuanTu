module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('laneway', {
      gid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laneway_data: {
        type: Sequelize.JSONB
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('laneway')
  }
}
