import basic from './basic.vue'

export const BasicListColumn = {
  components: { basic },
  props: {
    options: {},
    column: {}
  },
  computed: {
    currentRawOption() {
      const label = this.column.label
      const width = Math.max((label ? label.length : 0) * 18 + 20, 120)
      return Object.assign({ minWidth: width }, this.column.rawOption)
    },
    currentSource() {
      let source = this.column.source
      return source ? (this.options.getSources(source) || []) : []
    }
  }
}