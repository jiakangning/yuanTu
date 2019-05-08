module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
      field: 'objectId'
    },
    tag: DataTypes.FLOAT,
    serial: DataTypes.TEXT,
    location: DataTypes.TEXT,
    tunnel: DataTypes.TEXT,
    coordinates: DataTypes.JSONB,
    space: {
      type: DataTypes.TEXT,
      field: 'spaceLocation'
    },
    sn: {
      type: DataTypes.TEXT,
      field: 'code'
    },
    name: DataTypes.STRING,
    left: {
      type: DataTypes.TEXT,
      field: 'leftnumber'
    },
    right: {
      type: DataTypes.TEXT,
      field: 'rightnumber'
    }
  }, {
    tableName: 'data_station'
  })
  Station.associate = function (models) {
    // associations can be defined here
  }
  return Station
}
