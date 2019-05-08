class Vehicle {
  constructor (args) {
    Object.assign(this, args)
    this.id = this.Id || 0
    this.vehicleNum = this.VehicleNum || ''
    this.vehiclePhone = this.VehiclePhone || ''
    this.cardNum = this.CardNum || ''
    this.speeds = this.Speeds || ''
    this.addTime = this.AddTime || null
    this.vehicleNo = this.VehicleNo || ''
    this.maxSpeed = this.MaxSpeed || ''
    this.departmentName = this.DepartmentName || ''
    this.typeName = this.TypeName || ''
    this.districtTeamName = this.DistrictTeamName || ''
    this.companyUnitName = this.CompanyUnitName || ''
    this.iconName = this.IconName || ''
  }
}

Vehicle.Code = 3

module.exports = Vehicle
