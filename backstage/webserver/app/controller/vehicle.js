const VehicleManager = require('../service/position/VehicleManager')
const locale = require('../locale').load()
const { subscribe } = require('../../config/plugin.subscribe')
const socket = require('../../config/plugin.socket')

exports.subscribe = () => {
  const io = socket.singleton()
  const vehicleChannel = io.of('/location/vehicles')
  const vehicleManager = new VehicleManager()
  subscribe('RTP.Position.Vehicle', null, (error, channel, message) => {
    if (error) return socket.emit(vehicleChannel, 'error', error.message || locale.location.vehicle.exception)
    vehicleManager.undergrounds((err, staffs) => {
      if (err) return socket.emit(vehicleChannel, 'error', err)
      return socket.emit(vehicleChannel, 'data', { type: 'show', payload: staffs })
    })
  })
}

exports.undergrounds = (req, res, next) => {
  const vehicleManager = new VehicleManager()
  vehicleManager.undergrounds((err, vehicles) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(vehicles)
  })
}
