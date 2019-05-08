// 绑点信息类
export class Position {
  constructor(args) {
    let temp = {}
    if (args) {
      Object.assign(temp, args)
    }
    // 数据库对应主键
    this.id = temp.id || ''
    // 显示名称
    this.name = temp.name || ''
    // 坐标x——相对于容器左上角
    this.x = temp.x || 0
    // 坐标y——相对于容器左上角
    this.y = temp.y || 0
    // 宽
    this.width = temp.width || 50
    // 高
    this.height = temp.height || 50
    // 角度
    this.rotate = temp.rotate || 0
    // 类型：img、svg、component
    this.type = temp.type || 'img'
    // 目标src：imgSrc、svgName、componentType
    this.target = temp.target || ''
    // 绑定的系统
    this.bindSystem = temp.bindSystem || ''
    // 绑定的传感器唯一标识
    this.bindGuid = temp.bindGuid || ''
    // 所属系统
    this.belongsTo = temp.belongsTo
  }
}
