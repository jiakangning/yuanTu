export const BasicSearchColumn = {
  props: {
    options: {},
    column: {},
    value: {}
  },
  computed: {
    currentSource() {
      const source = this.column.source
      return source ? (this.options.getSources(source) || []) : []
    },
    currentRawListener() {
      return this.column.rawListener
    },
    currentRawOption() {
      return this.column.rawOption
    }
  },
  methods: {
    onSearch() {
      this.$emit('search')
    }
  }
}