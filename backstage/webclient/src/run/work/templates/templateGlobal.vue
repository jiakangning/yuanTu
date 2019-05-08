<script type="text/jsx">
  import childActions from '../components/childActions.vue'
  import childTitle from '../components/childTitle.vue'
  import childTabs from '../components/childTabs.vue'
  import WorkAction from '../../model/WorkAction'
  import Column from '../../model/Column'
  import Work from '../../model/Work'
  import _ from 'lodash'

  export default {
    components: { childTitle, childTabs, childActions },
    props: {
      options: {}
    },
    computed: {
      currentLoaded() {
        return this.options && this.options.loaded
      },
      currentTabsOptions() {
        return this.options.getTabs()
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
      return (
        <div class="run-work-global">
          { this.currentLoaded ? this.renderChildren(h) : this.renderLoading(h) }
        </div>
      )
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
          class: "run-work-global-wrap",
          directives: [{ name: 'loading', value: !this.currentLoaded }]
        })
      },
      renderChildren(h) {
        return (
          <div class="run-work-global-wrap">
            { this.renderTitle(h) }
            { this.renderHeader(h) }
            { this.renderList(h) }
            { this.renderForm(h) }
            { this.renderLayer(h) }
          </div>
        )
      },
      renderTitle(h) {
        const title = this.options.getConfig("title")
        const tabs = this.currentTabsOptions.getTabs()
        if (!title && !tabs.length) return null
        return (
          <div class="run-work-global-title">
            <child-title
              options={ this.options }/>
            <child-tabs
              onSearch={ this.onSearch }
              options={ this.currentTabsOptions }/>
          </div>
        )
      },
      renderHeader(h) {
        let action = this.options.getActions()
        let search = this.currentSearchOptions.getColumns()
        if (!action.length && !search.length) return null
        return (
          <div class="run-work-global-header">
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
          <div class="run-work-global-list">
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
        const row = this.currentListOptions.getRow()
        const selection = this.currentListOptions.getSelection()
        const rows = (row ? [row] : []).concat(selection)
        btn.click.call(this, {
          row,
          selection,
          rows: rows,
          select: !!rows.length
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
  .run-work-global
    display: flex
    width: 100%
    height: 100%
    padding: 20px
    justify-content: center
    align-items: center
    box-sizing: border-box

    &-wrap
      display: flex
      flex-direction: column
      width: 100%
      height: 100%
      box-sizing: border-box
      background: #ffffff
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
      border-radius: 4px

    &-title
      display: flex
      justify-content: space-between
      align-items: center
      padding: 8px 20px
      border-bottom: 1px solid #ebeef5

    &-header
      display: flex
      justify-content: space-between
      align-items: center
      padding: 20px

    &-list
      padding: 0 20px
      position: relative
      flex: 1
      overflow: hidden

</style>