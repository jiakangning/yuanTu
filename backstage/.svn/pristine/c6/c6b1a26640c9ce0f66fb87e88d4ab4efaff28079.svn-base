<script type="text/jsx">
  import childActions from '../components/childActions.vue'
  import WorkAction from '../../model/WorkAction'
  import Column from '../../model/Column'
  import Work from '../../model/Work'
  import _ from 'lodash'

  export default {
    components: { childActions },
    props: {
      options: {}
    },
    computed: {
      currentLoaded() {
        return this.options && this.options.loaded
      },
      currentSearchOptions() {
        return this.options.getSearch()
      },
      currentListOptions() {
        return this.options.getList()
      },
      currentLayerOption() {
        return this.options.getLayer()
      },
      currentFormOptions() {
        return this.options.getForm()
      }
    },
    render(h) {
      return this.currentLoaded ? this.renderChildren(h) : this.renderLoading(h)
    },
    data() {
      return {
        currentLayer: false,
        currentLayerTitle: ""
      }
    },
    methods: {
      renderLoading(h) {
        return h('div', {
          class: "run-work-inline",
          directives: [{ name: 'loading', value: !this.currentLoaded }]
        })
      },
      renderChildren(h) {
        return (
          <div class="run-work-inline">
            { this.renderHeader(h) }
            { this.renderList(h) }
            { this.renderForm(h) }
            { this.renderLayer(h) }
          </div>
        )
      },
      renderHeader(h) {
        let action = this.options.getActions()
        let search = this.currentSearchOptions.getColumns()
        if (!action.length && !search.length) return null
        return (
          <div class="run-work-inline-header">
            <child-actions
              onAction={ this.onAction }
              options={ this.options }/>
            <run-search
              onSearch={ this.onSearch }
              options={ this.currentSearchOptions }/>
          </div>
        )
      },
      renderList(h) {
        return (
          <div class="run-work-inline-list">
            <run-list
              onSearch={ this.onSearch }
              options={ this.currentListOptions }>
              { this.$slots.default }
            </run-list>
          </div>
        )
      },
      renderForm(h) {
        return (
          <run-layer
            value={ this.currentLayer }
            title={ this.currentLayerTitle }
            option={ this.currentLayerOption }
            onInput={ (val) => this.currentLayer = val }>
            <run-form
              onCancel={ this.onCancel }
              onSubmit={ this.onSubmit }
              onSuccess={ this.onSuccess }
              options={ this.currentFormOptions }>
              { this.$slots.default }
            </run-form>
          </run-layer>
        )
      },
      renderLayer(h) {
        let layer = Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.layer)
        return layer.map(v => v.vNode)
      },
      onCancel() {
        this.currentLayer = false
        this.options.emit(Work.EVENTS.cancel)
      },
      onSubmit(form, done) {
        this.options.emit(Work.EVENTS.submit, form, done)
      },
      onSuccess() {
        this.currentLayer = false
        this.onSearch()
      },
      onAction(btn) {
        switch (btn.action) {
          case WorkAction.DEFAULT.create.action:
            this.onCreate(btn)
            break
          case WorkAction.DEFAULT.update.action:
            this.onUpdate(btn)
            break
          case WorkAction.DEFAULT.delete.action:
            this.onDelete()
            break
          default:
            this.onCustom(btn)
            break
        }
      },
      onCreate(btn) {
        this.currentLayer = true
        this.currentLayerTitle = btn.text
        this.currentFormOptions.create()
        this.options.emit(Work.EVENTS.create, this.currentFormOptions.form, this.currentFormOptions)
        this.options.emit(Work.EVENTS.edit, this.currentFormOptions.form, this.currentFormOptions)
      },
      onUpdate(btn) {
        const row = this.currentListOptions.getRow()
        if (!row) return this.$message.error('请先选中一行数据！!')
        this.currentLayer = true
        this.currentLayerTitle = btn.text
        this.currentFormOptions.update(row)
        this.options.emit(Work.EVENTS.update, this.currentFormOptions.form, this.currentFormOptions)
        this.options.emit(Work.EVENTS.edit, this.currentFormOptions.form, this.currentFormOptions)
      },
      onDelete() {
        const rows = this.currentListOptions.getDeleteRows()
        if (rows.length === 0) return this.$message.error("请选择要删除的数据！")
        const text = `此操作将永久删除所选中行,共计${ rows.length }条数据。是否继续?`
        const title = '提示'
        const options = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
        this.$confirm(text, title, options).then(() => {
          this.options.emit(Work.EVENTS.delete, rows, (err) => {
            if (err) return
            this.$message.success("删除成功！！")
            this.onSearch()
          })
        })
      },
      onCustom(btn) {
        if (!btn || !btn.click) return
        btn.click.call(this, {
          row: this.currentListOptions.getRow(),
          selection: this.currentListOptions.getSelection()
        })
      },
      onSearch() {
        const tabsParams = this.options.getTabs().getParams()
        const listParams = this.options.getList().getParams()
        const searchParams = this.options.getSearch().getParams()
        const params = _.merge({}, listParams, tabsParams, searchParams)
        this.options.emit(Work.EVENTS.search, params)
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .run-work-inline

    &-header
      display: flex
      justify-content: space-between
      align-items: center
      padding-bottom: 20px

    &-list
      padding: 0
      line-height: 1

</style>