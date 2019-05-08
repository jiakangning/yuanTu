class Employee {
  constructor (args) {
    Object.assign(this, args)
    this.cardNumber = this.cardNumber || ''
    this.empNo = this.empNo || ''
    this.sex = this.sex || ''
    this.department = this.department || ''
    this.typeOfWork = this.typeOfWork || ''
    this.officePosition = this.officePosition || ''
    this.id = this.Id || 0
    this.isCadres = this.isCadres || 0
  }
}

Employee.Code = 1

module.exports = Employee
