export const BasicFormColumn = {
  props: {
    options: {},
    column: {},
    value: {}
  },
  computed: {
    currentRawOption() {
      return this.column.rawOption
    },
    currentRawListener() {
      return this.column.rawListener
    },
    currentSource() {
      let source = this.column.source
      return source ? (this.options.getSources(source) || []) : []
    }
  }
}