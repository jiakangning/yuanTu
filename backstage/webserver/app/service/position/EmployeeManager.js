const async = require('async')
const Employee = require('../../model/position/Employee')
const locale = require('../../locale').load()

class EmployeeManager {
  constructor (positionRepo, employeeRepo) {
    if (positionRepo) {
      this.positionRepo = positionRepo
    } else {
      const PositionRepo = require('../../model/position/PositionRepo')
      this.positionRepo = new PositionRepo()
    }
    if (employeeRepo) {
      this.employeeRepo = employeeRepo
    } else {
      const EmployeeRepo = require('../../model/position/EmployeeRepo')
      this.employeeRepo = new EmployeeRepo()
    }
  }
  undergrounds (callback) {
    async.auto({
      position: this.positionRepo.fetch.bind(this.positionRepo, Employee.Code),
      employee: this.employeeRepo.findAll.bind(this.employeeRepo)
    }, (err, { position, employee }) => {
      if (err) {
        const ex = new Error(locale.location.employee.exception)
        ex.error = err
        return callback(ex)
      }
      return callback(null, position.filter(item => item.underground).map(item => {
        const person = employee.find(pm => pm.cardNumber === item.cardnum) || {}
        return new Employee({ ...item, ...person })
      }))
    })
  }
}

module.exports = EmployeeManager
