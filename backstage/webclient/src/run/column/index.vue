<script type="text/jsx">
  import Column from '../model/Column'

  export default {
    name: "run-column",
    props: {
      position: {
        type: String
      },
      after: {
        type: String
      }
    },
    render(h) {
      if (Column.POSITION.list.indexOf(this.position) > -1) {
        return h("el-table-column", {
          props: {
            headerAlign: "center",
            align: "center",
            minWidth: "120px",
            ...this.$attrs
          },
          scopedSlots: this.$scopedSlots
        })
      } else if (Column.POSITION.form.indexOf(this.position) > -1) {
        const { label, ...raw } = this.$attrs
        let children = []
        if (label) {
          children = [(
            <el-form-item label={ label }>
              { this.$slots.default }
            </el-form-item>
          )]
        } else {
          children = this.$slots.default
        }
        return h("el-col", { props: { span: 24, ...raw } }, children)
      } else if (Column.POSITION.chart.indexOf(this.position) > -1) {
        let { cols = 24, title } = this.$attrs
        let header = this.$slots.header || title
        return (
          <el-col span={ parseInt(cols) }>
            <el-card class="run-column-card">
              {
                !header ? null : (
                  <div
                    class="run-column-card-title"
                    slot="header">
                    { header }
                  </div>
                )
              }
              { this.$slots.default }
            </el-card>
          </el-col>
        )
      } else if (Column.POSITION.layer.indexOf(this.position) > -1) {
        return h('run-layer', {
          props: this.$attrs,
          on: this.$listeners
        }, this.$slots.default)
      } else {
        return null
      }
    }
  }
</script>

<style
  scoped
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-column-card
    margin-top: 20px

    >>> .el-card__header
      padding: 8px 20px

    &-title
      font-size: 14px
      color: #333
      font-weight: bold
      padding: 3px 0
</style>
