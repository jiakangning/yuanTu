import _ from 'lodash'
import Base from './Base'
import Search from './Search'
import List from './List'
import Form from './Form'
import Tabs from './Tabs'
import WorkAction from './WorkAction'

class WorkConfig {

  static DEFAULT = {
    layout: "global"
  }

  constructor(options) {
    this.title = _.get(options, "title")
    this.describe = _.get(options, "describe")
    this.layout = _.get(options, "layout", WorkConfig.DEFAULT.layout)
  }

  get(field) {
    return field ? this[field] : this
  }
}

class Work extends Base {

  static EVENTS = {
    loading: "loading",
    search: "search",
    delete: "delete",
    cancel: "cancel",
    submit: "submit",
    create: "create",
    update: "update",
    edit: "edit"
  }

  constructor({ events = {}, sources = {}, config = {}, form = {}, search = {}, list = {}, columns = [], layer = {}, actions = [], tabs }) {
    super({ events, sources })
    this.initConfig(config)
    this.initColumns(columns)
    this.initSearch(search)
    this.initList(list)
    this.initForm(form)
    this.initLayer(layer)
    this.initActions(actions)
    this.initTabs(tabs)
    this.initLoaded()
  }

  initLoaded() {
    const loading = this.getEvent(Work.EVENTS.loading)
    this.loaded = !loading
    if (this.loaded) return
    this.emit(Work.EVENTS.loading, this, () => this.loaded = true)
  }

  initConfig(config) {
    this.config = config instanceof WorkConfig ? config : new WorkConfig(config)
  }

  initSearch(search) {
    const { columns, config } = this.transform(search)
    this.search = new Search({ columns: this.mergeColumns(columns), sources: this.sources, config })
  }

  initList(list) {
    const { columns, config } = this.transform(list)
    this.list = new List({ columns: this.mergeColumns(columns), sources: this.sources, config })
  }

  initForm(form) {
    const { columns, config } = this.transform(form)
    this.form = new Form({ columns: this.mergeColumns(columns), sources: this.sources, config })
  }

  initTabs(tabs) {
    this.tabs = tabs instanceof Tabs ? tabs : new Tabs({ config: tabs, sources: this.sources })
  }

  initColumns(columns) {
    this.columns = columns
  }

  initLayer(layer) {
    this.layer = layer
  }

  initActions(actions) {
    this.actions = actions.map(item => item instanceof WorkAction ? item : new WorkAction(item))
  }

  getConfig(field) {
    return this.config.get(field)
  }

  getSearch() {
    return this.search
  }

  getList() {
    return this.list
  }

  getForm() {
    return this.form
  }

  getActions() {
    return this.actions
  }

  getTabs() {
    return this.tabs
  }

  getLayer() {
    return this.layer
  }

  transform(options) {
    if (Array.isArray(options)) {
      return { columns: options, config: {} }
    } else {
      const { columns, ...config } = options
      return { columns, config }
    }
  }

  mergeColumns(columns = []) {
    return columns.map(column => {
      if (typeof column === "string") {
        const [field, layout] = column.split(':')
        column = { field, layout }
      }
      let obj = this.columns.find(v => v.field === column.field)
      return _.merge({}, obj, column)
    })
  }
}

export default Work