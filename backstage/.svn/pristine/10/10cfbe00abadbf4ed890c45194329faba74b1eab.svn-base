'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.addColumn('gis_position', 'rotate', {
              type: Sequelize.FLOAT
          }, { transaction: t }),
          queryInterface.addColumn('gis_position', 'belongsTo', {
              type: Sequelize.STRING,
          }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('gis_position', 'rotate', { transaction: t }),
          queryInterface.removeColumn('gis_position', 'belongsTo', { transaction: t })
      ])
    })
  }
};
