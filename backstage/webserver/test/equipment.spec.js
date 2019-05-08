const assert = require('assert')
const EquipmentManager = require('../app/service/monitor/EquipmentManager')

describe('设备描述信息管理', function () {
  it('可以获取全部设备描述信息', function (done) {
    const equipmentManager = new EquipmentManager()
    equipmentManager.getByKeys(
      [
        '陕西陕煤曹家滩矿业有限公司:排水自动化系统',
        '陕西陕煤曹家滩矿业有限公司:煤流自动化子系统',
        '陕西陕煤曹家滩矿业有限公司:主扇风机监测系统',
        '陕西陕煤曹家滩矿业有限公司:矿压监测系统',
        '陕西陕煤曹家滩矿业有限公司:安全监控系统'
      ],
      { limit: 20 },
      (err, result) => {
        if (err) {
          return done(err)
        }
        console.log(result)
        return done()
      }
    )
  })
})
