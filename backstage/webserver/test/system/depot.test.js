/*
  creator: 贾康宁
  date: 2019-03-15
  description: 部门测试
*/
const dbCtx = require('../../database/dbCtx')
const DepotManage = require('../../app/service/system/DepartmentManager')
const assert = require('assert')

before((done) => {
  require('../../app/model/system/index')
  dbCtx.sync()
    .then(_ => done())
    .catch(error => done(error))
})

describe('数组测试', function () {
  it('#Array.include', function (done) {
    const arr = [1,2,3]
    assert.equal('arr.include(3)', true)
    done()
  })
})

describe('删除部门测试', function () {
  it('#DepotManage.delte', function (done) {
    const depot = new DepotManage()
    depot.delete(6, (err, effectRows) => {
      done(err, effectRows)
    })
  })
})

describe('新增部门测试', function () {
  it('#DepotManage.create', function (done) {
    const depot = new DepotManage()
    const input = {
      name: '二十八处',
      status: 1,
      telphone: '18495698688',
      address: '华清池',
      description: '测试新增',
      sl_index: 4,
      parent_id: '14'
    }
    depot.create(input, (err, effectRows) => {
      done(err, effectRows)
    })
  })
})

describe('修改部门测试', function () {
  it('#DepotManage.update', function (done) {
    const depot = new DepotManage()
    const input = {
      id: 4,
      name: '掘金研发',
      status: 1,
      telphone: '18495698688',
      address: '未知的',
      description: '测试修改'
    }
    depot.update(input, (err, effectRows) => {
      done(err, effectRows)
    })
  })
})

describe('获取部门测试', function () {
  it('#DepotManage.showAllDepot', function (done) {
    const depot = new DepotManage()
    let input = {}
    depot.showAllDepot(input, (err, effectRows) => {
      done(err, effectRows)
    })
  })
})

describe('部门人员测试', function () {
  it('#Department.setDepotPerson', function (done) {
    const depot = new DepotManage()
    let input = {
      id: 1,
      contacts: [1, 2]
    }
    depot.setDepotPerson(input, (err, effectRows) => {
      done(err, effectRows)
    })
  })
  it('#Department.getContactsIdsById', function (done) {
    const depot = new DepotManage()
    let input = {
      id: 1
    }
    depot.getContactsIdsById(input, (err, datas) => {
      console.log('1111111111111111111111111', datas)
      done(err, datas)
    })
  })
})