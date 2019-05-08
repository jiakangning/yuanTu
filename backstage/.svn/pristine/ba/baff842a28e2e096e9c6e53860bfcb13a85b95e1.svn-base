module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('data_station', {
      objectId: {
        type: Sequelize.TEXT,
        primaryKey: true,
        allowNull: false
      },
      tag: {
        type: Sequelize.FLOAT
      },
      serial: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.TEXT
      },
      tunnel: {
        type: Sequelize.TEXT
      },
      coordinates: {
        type: Sequelize.JSONB
      },
      spaceLocation: {
        type: Sequelize.TEXT
      },
      code: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.STRING
      },
      leftnumber: {
        type: Sequelize.TEXT
      },
      rightnumber: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('data_station')
  }
}
