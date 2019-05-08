class TunnelManager {
  constructor (tunnelRepo) {
    this.tunnelRepo = tunnelRepo || require('../../model').Tunnel
  }
  hasStation (callback) {
    this.tunnelRepo.hasStation(callback)
  }
}

module.exports = TunnelManager
