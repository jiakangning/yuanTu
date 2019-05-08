class StationManager {
  constructor (stationRepo) {
    this.stationRepo = stationRepo || require('../../model').Station
  }
  findAll (callback) {
    this.stationRepo.findAll()
      .then(stations => callback(null, stations))
      .catch(err => callback(err))
  }
}

module.exports = StationManager
