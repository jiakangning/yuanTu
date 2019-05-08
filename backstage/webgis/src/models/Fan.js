// 风机监测信息类
export class Fan {
  constructor(args) {
    let temp = {}
    if (args) {
      Object.assign(temp, args)
    }
    // 输出电流
    this.outElectricity = (temp.electricity && temp.electricity.value) || 0
    this.outElectricityState =
      (temp.electricity && temp.electricity.state && temp.electricity.state) ===
      '1'
        ? true
        : false
    // 输出电压
    this.outVoltage = (temp.voltage && temp.voltage.value) || 0
    this.outVoltageState =
      temp.voltage && temp.voltage.state && temp.voltage.state === '1'
        ? true
        : false
    // 输出功率
    this.outPower = (temp.power && temp.power.value) || 0
    this.outPowerState =
      temp.power && temp.power.state && temp.power.state === '1' ? true : false
    // 运行频率
    this.runRate = (temp.runRate && temp.runRate.value) || 0
    this.runRateState =
      temp.runRate && temp.runRate.state && temp.runRate.state === '1'
        ? true
        : false
    // 设定频率
    this.designRate = (temp.designRate && temp.designRate.value) || 0
    this.designRateState =
      (temp.designRate && temp.designRate.state && temp.designRate.state) ===
      '1'
        ? true
        : false
    // 定子温度A
    this.temperatureA = (temp.temperatureA && temp.temperatureA.value) || 0
    this.temperatureAState =
      temp.temperatureA &&
      temp.temperatureA.state &&
      temp.temperatureA.state === '1'
        ? true
        : false
    //定子温度B
    this.temperatureB = (temp.temperatureB && temp.temperatureB.value) || 0
    this.temperatureBState =
      temp.temperatureB &&
      temp.temperatureB.state &&
      temp.temperatureB.state === '1'
        ? true
        : false
    //定子温度C
    this.temperatureC = (temp.temperatureC && temp.temperatureC.value) || 0
    this.temperatureCState =
      temp.temperatureC &&
      temp.temperatureC.state &&
      temp.temperatureC.state === '1'
        ? true
        : false
    // 前轴温度
    this.temperatureFront =
      (temp.temperatureFront && temp.temperatureFront.value) || 0
    this.temperatureFrontState =
      temp.temperatureFront &&
      temp.temperatureFront.state &&
      temp.temperatureFront.state === '1'
        ? true
        : false
    // 后轴温度
    this.temperatureBack =
      (temp.temperatureBack && temp.temperatureBack.value) || 0
    this.temperatureBackState =
      temp.temperatureBack &&
      temp.temperatureBack.state &&
      temp.temperatureBack.state === '1'
        ? true
        : false
    // 水平风门状态
    this.horizontalFan = temp.horizontalFan &&
      temp.horizontalFan.value &&
      temp.horizontalFan.value === 'true'
      ? true
      : false
    this.horizontalFanState =
      temp.horizontalFan &&
      temp.horizontalFan.state &&
      temp.horizontalFan.state === '1'
        ? true
        : false
    this.horizontalFanDes =
      temp.horizontalFan &&
      temp.horizontalFan.value &&
      temp.horizontalFan.value === 'true'
        ? '开到位'
        : '开不到位'
    // 垂直风门1#状态
    this.verticalFan1 = temp.verticalFan1 && temp.verticalFan1.value
    this.verticalFan1Des = this.verticalFan1 ? '开到位' : '开不到位'
    // 垂直风门2#状态
    this.verticalFan2 = temp.verticalFan2 && temp.verticalFan2.value
    this.verticalFan2Des = this.verticalFan2 ? '开到位' : '开不到位'
  }
}

// 组织Fan对象数据
export const buildFan = (list, fanNo = '1', fanLevel = '1') => {
  let fanInfo
  if (list && list.length) {
    // 根据风机号及等级筛选传感器
    const fanList = list.filter(item => {
      return (
        item.tag.indexOf(`FJ${fanNo}_${fanLevel}`) > -1 ||
        item.tag.indexOf(`BP${fanNo}_${fanLevel}`) > -1
      )
    })
    const info = {}
    if (fanList && fanList.length) {
      let type = ''
      fanList.forEach(item => {
        type = item.tag.substring(item.tag.lastIndexOf('_') + 2)
        switch (type) {
          case 'YXDL': // 运行电流
            info.electricity = item
            break
          case 'YXDY': // 运行电压
            info.volity = item
            break
          case 'YXGL': // 运行功率
            info.power = item
            break
          case 'YXPLSD': // 运行频率设定
            info.designRate = item
            break
          case 'YXSD': // 运行速度
            info.runRate = item
            break
          case 'DW1': // 定温1
            info.temperatureA = item
            break
          case 'DW2': // 定温2
            info.temperatureB = item
            break
          case 'DW3': // 定温3
            info.temperatureC = item
            break
          case 'ZWQ': // 轴温前
            info.temperatureFront = item
            break
          case 'ZWH': // 轴温后
            info.temperatureBack = item
            break
          default:
            break
        }
      })
    }
    info.horizontalFan =
      list.find(item => item.tag.indexOf(`SPFM${fanNo}`)) > -1
    fanInfo = new Fan({ ...info })
  }
  return fanInfo
}
