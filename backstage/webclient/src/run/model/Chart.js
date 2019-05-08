import Base from './Base'
import ChartWidge from './ChartWidge'
import ChartCard from './ChartCard'
import PopupSearch from "./PopupSearch.js"

class Chart extends Base {

  static EVENTS = {
    screen: "screen",
    search: "search",
    reset: "reset"
  }

  constructor({ columns = [], search, widge = {}, events = {}, sources = {} }) {
    super({ events, sources })
    this.initSearch(search)
    this.initWidge(widge)
    this.initColumns(columns)
  }

  initSearch(search) {
    const { columns, config } = this.transform(search)
    this.search = new PopupSearch({ columns, config, sources: this.sources })
  }

  initWidge(widge) {
    this.widge = new ChartWidge({ config: widge, sources: this.sources })
  }

  initColumns(columns) {
    this.columns = columns.map(column => {
      return column instanceof ChartCard ? column : new ChartCard({ config: column, sources: this.sources })
    })
  }

  getSearch() {
    return this.search
  }

  getWidge() {
    return this.widge
  }

  getColumns() {
    return this.columns || []
  }

  transform(options) {
    if (Array.isArray(options)) {
      return { columns: options, config: {} }
    } else {
      const { columns, ...config } = options
      return { columns, config }
    }
  }
}

export default Chart