class Position {
  constructor (args) {
    Object.assign(this, args)
    this.cardNum = this.cardmum || ''
    this.devNum = this.devNum || ''
    this.underground = this.isinwell || false
    this.inTime = this.intime || null
    this.outTime = this.outtime || null
    this.cardType = this.cardType || 0
    this.x = this.x || 0.0
    this.y = this.y || 0.0
    this.devTime = this.devTime || null
    this.distance = this.distance || 0.0
    this.description = this.description || ''
    this.direction = this.direction || 0
  }
}

module.exports = Position
