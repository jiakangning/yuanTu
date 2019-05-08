const EmployeeManager = require('../service/position/EmployeeManager')
const locale = require('../locale').load()
const { subscribe } = require('../../config/plugin.subscribe')
const socket = require('../../config/plugin.socket')

exports.subscribe = () => {
  const io = socket.singleton()
  const staffChannel = io.of('/location/staffs')
  const employeeManager = new EmployeeManager()
  subscribe('RTP.Position.Staff', null, (error, channel, message) => {
    if (error) return socket.emit(staffChannel, 'error', error.message || locale.location.employee.exception)
    employeeManager.undergrounds((err, staffs) => {
      if (err) return socket.emit(staffChannel, 'error', err)
      return socket.emit(staffChannel, 'data', { type: 'show', payload: staffs })
    })
  })
}

exports.undergrounds = (req, res, next) => {
  const employeeManager = new EmployeeManager()
  employeeManager.undergrounds((err, staffs) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(staffs)
  })
}
