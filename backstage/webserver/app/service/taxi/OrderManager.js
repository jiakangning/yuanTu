class OrderManager {
  create (order) {
    /*
      获取当前用户的标识与任职部门
      校验包含用车类型、用车时间、用车人姓名、用车部门、出发地点、目的地点、乘车人数的约车订单的各填写项的完整性与合法性
      新建并保存约车订单
    */
  }
  dispatch (order) {
    /*
      获取特定约车订单
      校验约车订单是否暂未指派司机
      校验接驾司机的合法性
      设定接驾司机并将订单状态设定为已接单
      如车辆已在井下，同时设定订单接驾车辆牌
      更新并保存约车订单
    */
  }
  cancel (order) {
    /*
      获取当前用户的特定约车订单
      校验约车订单是否暂未指派司机
      将约车订单的状态设定为已取消
      更新并保存约车订单
    */
  }
  refuse (order) {
    // 拒绝叫车订单
  }
  start (order) {
    // 开启订单旅程
  }
  finish (order) {
    // 完结订单旅程
  }
  getMy (input) {
    // 获取我的叫车订单
  }
  getAll (input) {
    // 获取全部叫车订单
  }
}

module.exports = OrderManager
