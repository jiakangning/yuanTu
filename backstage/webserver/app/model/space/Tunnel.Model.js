const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Tunnel = sequelize.define('Tunnel', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'gid'
    },
    laneway_data: {
      type: Sequelize.JSONB
    }
  }, {
    timestamps: false,
    tableName: 'laneway'
  })
  Tunnel.associate = function (models) {
    // associations can be defined here
  }
  Tunnel.hasStation = function (callback) {
    sequelize.query(
      `SELECT laneway_data ->> 'laneway_name' AS name, laneway_data -> 'traverse_point_array' AS value FROM laneway
      WHERE laneway_data ->> 'laneway_name' IN (SELECT DISTINCT name FROM data_station)`,
      { type: Sequelize.QueryTypes.SELECT }
    )
      .then(items => {
        const tunnels = items.map(item => ({
          name: item.name,
          coords: item.value.map(p => p.space_coordinateX)
        }))
        callback(null, tunnels)
      })
      .catch(err => callback(err, { message: '巷道信息获取失败', err }))
  }
  return Tunnel
}
