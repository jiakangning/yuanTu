<script type="text/jsx">
  import basic from './basic.vue'

  export default {
    extends: basic,
    render(h) {
      return (
        <el-row gutter={ 10 }>
          { this.renderColumns(h) }
        </el-row>
      )
    },
    methods: {
      renderColumns(h) {
        let { config: columns, slot: _columns } = this.getColumns(h)
        _columns.forEach((column) => {
          let index = columns.findIndex(item => item.field === column.field)
          if (index === -1) {
            columns.unshift(column)
          } else {
            columns.splice(index + 1, 0, column)
          }
        })
        return columns.map(item => item.vNode)
      }
    }
  }
</script>
