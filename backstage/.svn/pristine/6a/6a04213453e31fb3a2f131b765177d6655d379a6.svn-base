const StaffManager = require('../service/location/StaffManager')
const VehicleManager = require('../service/location/VehicleManager')
const { subscribe } = require('../../config/plugin.subscribe')
const locale = require('../locale').load()
const socket = require('../../config/plugin.socket')

exports.getAllStaffs = (req, res, next) => {
  const staffManager = new StaffManager()
  staffManager.getAll({}, (error, staffs) => {
    if (error) {
      next(error)
    } else {
      res.json(staffs)
    }
  })
}

exports.pushAllStaffs = () => {
  const io = socket.singleton()
  const staffChannel = io.of('/location/staffs')
  const staffManager = new StaffManager()
  subscribe(StaffManager.Subscribe, null, (error, channel, message) => {
    if (error) return socket.emit(staffChannel, 'error', error.message || locale.location.employee.exception)
    return staffManager.find(message, { limit: 30 }, (err, staffs) => {
      if (err) return socket.emit(staffChannel, 'error', err.message || locale.location.employee.none)
      return socket.emit(staffChannel, 'data', { type: 'show', payload: staffs })
    })
  })
}

/** 车辆 */

exports.getAllVehicles = (req, res, next) => {
  const vehicleManager = new VehicleManager()
  vehicleManager.getAll({}, (error, vehicles) => {
    if (error) {
      next(error)
    } else {
      res.json(vehicles)
    }
  })
}

exports.pushAllVehicles = () => {
  const io = socket.singleton()
  const vehicleChannel = io.of('/location/vehicles')
  const vehicleManager = new VehicleManager()
  subscribe(VehicleManager.Subscribe, null, (error, channel, message) => {
    if (error) return socket.emit(vehicleChannel, 'error', error.message || locale.location.vehicle.exception)
    return vehicleManager.find(message, { limit: 30 }, (err, vehicles) => {
      if (err) return socket.emit(vehicleChannel, 'error', err.message || locale.location.vehicle.none)
      return socket.emit(vehicleChannel, 'data', { type: 'show', payload: vehicles })
    })
  })
}
