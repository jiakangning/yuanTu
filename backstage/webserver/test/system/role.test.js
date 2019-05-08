/*
  creator: 贾康宁
  date: 2019-03-15
  description: 角色测试
*/
const dbCtx = require('../../database/dbCtx')
const RoleManager = require('../../app/service/system/RoleManager')

before((done) => {
  require('../../app/model/system/index')
  dbCtx.sync()
    .then(_ => done())
    .catch(error => done(error))
})
describe('授权测试', function () {
  it('#RoleManager.getCommands', function (done) {
    const roleManager = new RoleManager()
    const input = {
      roleId: 1
    }
    roleManager.getCommands(input, (err, effectRows) => {
      console.log("1111111111111111111", effectRows)
      if (err) done(err)
      else done()
    })
  })
  it('#RoleManager.authorizeMobile', function (done) {
    const roleManager = new RoleManager()
    const input = {
      roleId: 1,
      mobileIds: [3]
    }
    roleManager.authorizeMobile(input, (err, effectRows) => {
      console.log("1111111111111111111", effectRows)
      if (err) done(err)
      else done()
    })
  })
})