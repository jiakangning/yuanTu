<script type="text/jsx">
  import Chart from '../model/Chart'
  import Column from '../model/Column'

  export default {
    name: "run-chart",
    props: {
      options: {}
    },
    computed: {
      currentSearchOptions() {
        return this.options.getSearch()
      },
      currentWidgeOptions() {
        return this.options.getWidge()
      },
      currentColumns() {
        return this.options.getColumns()
      }
    },
    data() {
      return {
        show: false
      }
    },
    render(h) {
      return (
        <div class="run-chart">
          <run-chart-widge
            options={ this.currentWidgeOptions }
            onScreen={ this.onScreen }/>
          <el-row gutter={ 20 }>
            { this.getColumns(h) }
          </el-row>
          <run-popup-search
            options={ this.currentSearchOptions }
            value={ this.show }
            onInput={ () => this.show = !this.show }
            onReset={ this.onReset }
            onSearch={ this.onSearch }/>
        </div>
      )
    },
    methods: {
      getColumns(h) {
        let _columns = Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.chart)
        let columns = this.currentColumns.map((column, index) => {
          return {
            field: index + "",
            vNode: (
              <run-chart-card options={ column }/>
            )
          }
        })
        _columns.forEach((column) => {
          let index = columns.findIndex(item => item.field === column.field)
          if (index === -1) {
            columns.unshift(column)
          } else {
            columns.splice(index + 1, 0, column)
          }
        })
        return columns.map(item => item.vNode)
      },
      onScreen() {
        this.show = !this.show
        this.$emit(Chart.EVENTS.screen)
        this.options.emit(Chart.EVENTS.screen)
      },
      onReset() {
        this.$emit(Chart.EVENTS.reset)
        this.options.emit(Chart.EVENTS.reset)
      },
      onSearch() {
        this.$emit(Chart.EVENTS.search)
        this.options.emit(Chart.EVENTS.search)
      }
    }
  }
</script>

<style
  type="text/stylus"
  rel="stylesheet/stylus"
  lang="stylus">
  .run-chart
    width: 100%
    height: 100%
    padding: 20px
    overflow: auto
    box-sizing: border-box
</style>
