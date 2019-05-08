<script type="text/jsx">
  import Column from '../../model/Column'
  import columnBasic from '../columns/index.vue'

  export default {
    components: { columnBasic },
    props: {
      options: {}
    },
    methods: {
      getColumns(h) {
        let columns = this.options.getColumns().map(item => {
          return {
            field: item.field,
            vNode: (
              <column-basic
                options={ this.options }
                column={ item }
              />
            )
          }
        })
        return {
          config: columns,
          slot: Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.form)
        }
      }
    }
  }
</script>
