export default class WorkAction {

  static DEFAULT = {
    see: {
      action: 'see',
      type: 'default',
      text: '查看',
      icon: 'el-icon-view'
    },
    create: {
      action: 'create',
      type: 'default',
      text: '新增',
      icon: 'el-icon-plus'
    },
    update: {
      action: 'update',
      type: 'default',
      text: '修改',
      icon: 'el-icon-edit'
    },
    import: {
      action: 'import',
      type: 'default',
      text: '导入',
      icon: 'el-icon-upload2'
    },
    export: {
      action: 'export',
      type: 'default',
      text: '导出',
      icon: 'el-icon-download'
    },
    delete: {
      action: 'delete',
      type: 'danger',
      text: '删除',
      icon: 'el-icon-delete'
    }
  }

  constructor(action) {
    if (typeof action === 'string') {
      let [key, text] = action.split(":")
      let obj = WorkAction.DEFAULT[key]
      text = text || obj.text
      Object.assign(this, obj, { text })
    } else if (typeof action === "object") {
      Object.assign(this, action)
    }
  }

}