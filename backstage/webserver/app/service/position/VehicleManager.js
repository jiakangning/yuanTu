const async = require('async')
const Vehicle = require('../../model/position/Vehicle')
const locale = require('../../locale').load()

class VehicleManager {
  constructor (positionRepo, vehicleRepo) {
    if (positionRepo) {
      this.positionRepo = positionRepo
    } else {
      const PositionRepo = require('../../model/position/PositionRepo')
      this.positionRepo = new PositionRepo()
    }
    if (vehicleRepo) {
      this.vehicleRepo = vehicleRepo
    } else {
      const VehicleRepo = require('../../model/position/VehicleRepo')
      this.vehicleRepo = new VehicleRepo()
    }
  }

  undergrounds (callback) {
    async.auto({
      position: this.positionRepo.fetch.bind(this.positionRepo, Vehicle.Code),
      vehicle: this.vehicleRepo.findAll.bind(this.vehicleRepo)
    }, (err, { position, vehicle }) => {
      if (err) {
        const ex = new Error(locale.location.vehicle.exception)
        ex.error = err
        return callback(ex)
      }
      return callback(null, position.filter(item => item.underground).map(item => {
        const truck = vehicle.find(v => v.CardNum === item.cardnum) || {}
        return new Vehicle({ ...item, ...truck })
      }))
    })
  }
}

module.exports = VehicleManager
