import _ from 'lodash'
import Base from './Base'
import Config from './Config'

class ListConfig {

  static LAYOUT = {
    table: "table",
    treegrid: "treegrid"
  }

  static DEFAULT = {
    layout: "table",
    rows: "rows",
    count: "count",
    height: "100%",
    serial: true,
    selection: true,
    pagination: true,
    paginationOptions: {},
    primaryField: "name",
    primaryKey: "id",
    primaryCode: "id",
    referenceCode: "parentId",
    nodeOrder: "order",
    expandAll: false
  }

  constructor(options) {
    this.rawOption = Config.GetOptionsByStartKey(options, Config.RAWKEY.option)
    this.rawListener = Config.GetOptionsByStartKey(options, Config.RAWKEY.listener)
    this.layout = _.get(options, "layout", ListConfig.DEFAULT.layout)
    this.rows = _.get(options, "rows", ListConfig.DEFAULT.rows)
    this.serial = _.get(options, "serial", ListConfig.DEFAULT.serial)
    this.height = _.get(options, "height", ListConfig.DEFAULT.height)

    switch (this.layout) {
      case ListConfig.LAYOUT.table:
        this.count = _.get(options, "count", ListConfig.DEFAULT.count)
        this.selection = _.get(options, "selection", ListConfig.DEFAULT.selection)
        this.pagination = _.get(options, "pagination", ListConfig.DEFAULT.pagination)
        this.paginationOptions = _.get(options, "paginationOptions", ListConfig.DEFAULT.paginationOptions)
        break
      case ListConfig.LAYOUT.treegrid:
        this.primaryField = _.get(options, "primaryField", ListConfig.DEFAULT.primaryField)
        this.primaryKey = _.get(options, "primaryKey", ListConfig.DEFAULT.primaryKey)
        this.primaryCode = _.get(options, "primaryCode", ListConfig.DEFAULT.primaryCode)
        this.referenceCode = _.get(options, "referenceCode", ListConfig.DEFAULT.referenceCode)
        this.nodeOrder = _.get(options, "nodeOrder", ListConfig.DEFAULT.nodeOrder)
        this.expandAll = _.get(options, "expandAll", ListConfig.DEFAULT.expandAll)
        break
    }
  }

  get(field) {
    return field ? this[field] : this
  }
}

class ListColumn {

  static DEFAULT = {
    layout: "text"
  }

  constructor(options) {
    this.rawOption = Config.GetOptionsByStartKey(options, Config.RAWKEY.option)
    this.rawListener = Config.GetOptionsByStartKey(options, Config.RAWKEY.listener)
    this.layout = _.get(options, "layout", ListColumn.DEFAULT.layout)
    this.label = _.get(options, "label")
    this.field = _.get(options, "field")
    this.source = _.get(options, "source")
  }
}

class List extends Base {

  static EVENTS = {
    search: "search"
  }

  constructor({ columns = [], events = {}, config = {}, sources = {} }) {
    super({ events, sources })
    this.initConfig(config)
    this.initColumns(columns)
  }

  initColumns(columns) {
    this.columns = columns.map(column => column instanceof ListColumn ? column : new ListColumn(column))
  }

  initConfig(config) {
    this.config = config instanceof ListConfig ? config : new ListConfig(config)
  }

  initContext(context) {
    this.context = context
  }

  getColumns() {
    return this.columns || []
  }

  getConfig(field) {
    return this.config.get(field)
  }

  getStateByRow(row) {
    if (!this.context) return null
    return this.context.getStateByRow(row)
  }

  getDeleteRows() {
    if (!this.context) return []
    return this.context.getDeleteRows()
  }

  getParams() {
    return this.params
  }

  getRow() {
    return this.row
  }

  getSelection() {
    return this.selection
  }

  setParams(params = {}) {
    this.params = params
  }

  setRow(row) {
    this.row = row
  }

  setSelection(selection) {
    this.selection = selection
  }
}

export default List