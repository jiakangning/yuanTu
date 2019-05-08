const async = require('async')
const StationManager = require('./StationManager')
const TunnelManager = require('./TunnelManager')

class TraceManager {
  constructor (stationManager, tunnelManager) {
    this.stationManager = stationManager || new StationManager()
    this.tunnelManager = tunnelManager || new TunnelManager()
  }
  compose (callback) {
    async.auto(
      {
        'stations': this.stationManager.findAll.bind(this.stationManager),
        'tunnels': this.tunnelManager.hasStation.bind(this.tunnelManager),
        'compose': ['stations', 'tunnels', ({ stations, tunnels }, cb) => {
          process.nextTick(() => {
            cb(null, tunnels.map(tunnel => ({
              ...tunnel,
              stations: stations.filter(station => station.name === tunnel.name)
            })))
          })
        }]
      },
      (err, { compose }) => {
        if (err) return callback(err)
        callback(null, compose)
      }
    )
  }
}

module.exports = TraceManager
