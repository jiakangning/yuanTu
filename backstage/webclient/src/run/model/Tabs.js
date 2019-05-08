import Base from './Base'

class Tab {
  constructor(tab) {
    this.label = tab.label
    this.params = tab.params
  }
}

class Tabs extends Base {

  static EVENTS = {
    search: "search"
  }

  constructor({ sources = {}, events = {}, config = {} }) {
    super({ sources, events })
    this.config = config
    this.params = {}
  }

  getTabs() {
    let tabs = []
    if (typeof this.config === "string") {
      tabs = this.getSources(this.config) || []
    } else if (Array.isArray(this.config)) {
      tabs = this.config
    }
    return tabs.map(tab => tab instanceof Tab ? tab : new Tab(tab))
  }

  getParams() {
    return this.params
  }

  setParams(val) {
    this.params = val
  }
}

export default Tabs