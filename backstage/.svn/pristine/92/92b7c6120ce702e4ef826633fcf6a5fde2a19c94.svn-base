<script type="text/jsx">
  import basic from './basic.vue'
  import _ from 'lodash'
  import match from '../../common/match.js'

  export default {
    extends: basic,
    render(h) {
      return (
        <div class="run-list-treegrid">
          { this.renderTable(h) }
        </div>
      )
    },
    computed: {
      currentGridOptions() {
        let primaryKey = this.options.getConfig("primaryKey")
        let primaryCode = this.options.getConfig("primaryCode")
        let referenceCode = this.options.getConfig("referenceCode")
        let nodeOrder = this.options.getConfig("nodeOrder")
        return {
          primaryKey,
          primaryCode,
          referenceCode,
          nodeOrder
        }
      },
      currentTableOptions() {
        return {
          data: this.tableData,
          emptyText: this.currentEmptyText,
          fit: true,
          stripe: false,
          border: true,
          highlightCurrentRow: true,
          height: this.currentHeight,
          size: "small",
          rowStyle: ({ row }) => this.getStyleByRow(row),
          rowKey: this.currentGridOptions.primaryKey,
          ...this.currentRawOption
        }
      },
      currentTableEvents() {
        return {
          "row-click": this.onToggleRow,
          "current-change": this.onCurrentChange,
          "selection-change": this.onSelectionChange,
          "sort-change": this.onSortChange,
          ...this.currentRawListener
        }
      },
      currentParams() {
        return Object.assign({}, { pagination: false }, this.sort)
      },
      currentExpandAll() {
        return this.options.getConfig("expandAll")
      }
    },
    data() {
      return {
        tableData: [],
        stateStore: {},
        stateTree: []
      }
    },
    methods: {
      renderTable(h) {
        return h("el-table", {
          props: this.currentTableOptions,
          on: this.currentTableEvents,
          ref: "table"
        }, [
          this.renderColumns(h)
        ])
      },
      renderColumns(h) {
        let columns = this.getColumns(h)
        columns.unshift(this.getSerialColumn(h))
        return columns
      },
      onToggleRow(row) {
        this.buildTreeByRow(row)
        this.buildDataState()
      },
      onRefreshRow() {
        if (!this.row) return
        const { primaryKey } = this.currentGridOptions
        const row = this.currentSource.find(v => v[primaryKey] === this.row[primaryKey])
        this.row = row ? row : this.row
      },
      buildTree(expandAll) {
        let { primaryKey, primaryCode, referenceCode, nodeOrder } = this.currentGridOptions
        const sortOrder = (children) => {
          return children.sort((a, b) => {
            let _a = a.data[nodeOrder] || 999
            let _b = b.data[nodeOrder] || 999
            return Number(_a) - Number(_b)
          })
        }
        const BuildTree = (data, parentValue, level, parentSerial, parentIsOpen) => {
          let _serial = 1
          return data.reduce((results, item) => {
            if (item[referenceCode] === parentValue || (!parentValue && !item[referenceCode])) {
              let serial = [].concat(parentSerial, [_serial])
              if (expandAll) {
                let children = BuildTree(data, item[primaryCode], level + 1, serial, true)
                sortOrder(children)
                let state = {
                  parentIsOpen: true,
                  level: level,
                  isLeaf: !children.length,
                  serial: serial.join('-'),
                  isCreated: true,
                  isShow: true,
                  isOpen: true,
                  children: children
                }
                results.push({
                  data: item,
                  children: children,
                  state: state
                })
              } else {
                let oldStore = this.stateStore[item[primaryKey]]
                let isOpen = oldStore ? (parentIsOpen && oldStore.isOpen) : false
                let children = BuildTree(data, item[primaryCode], level + 1, serial, isOpen)
                sortOrder(children)
                let state = {
                  parentIsOpen: parentIsOpen,
                  level: level,
                  isLeaf: !children.length,
                  serial: serial.join('-'),
                  children: children
                }
                if (oldStore) {
                  Object.assign(state, {
                    isCreated: oldStore.isCreated,
                    isShow: oldStore.isShow,
                    isOpen: oldStore.isOpen
                  })
                } else {
                  Object.assign(state, {
                    isCreated: parentIsOpen,
                    isShow: parentIsOpen,
                    isOpen: false
                  })
                }
                results.push({
                  data: item,
                  children: children,
                  state: state
                })
              }
              _serial++
            }
            return results
          }, [])
        }
        this.stateTree = BuildTree(this.currentSource, null, 1, [], true)
      },
      buildTreeByRow(row) {
        const findNode = (tree, nodeId) => {
          let node = null
          tree.forEach(item => {
            if (item.data[primaryKey] === nodeId) {
              node = item
            } else if (!node) {
              node = findNode(item.children, nodeId)
            }
          })
          return node
        }
        const updateState = (children, parentIsOpen, isFirst) => {
          children.forEach(item => {
            if (isFirst) {
              item.state.isCreated = true
              item.state.isShow = parentIsOpen
            }
            item.state.parentIsOpen = parentIsOpen
            updateState(item.children, parentIsOpen ? item.state.isOpen : parentIsOpen)
          })
        }
        const { primaryKey } = this.currentGridOptions
        const id = row[primaryKey]
        const { isLeaf, isOpen } = this.stateStore[id]
        if (isLeaf) return
        let node = findNode(this.stateTree, id)
        node.state.isOpen = !isOpen
        updateState(node.children, !isOpen, true)
      },
      buildDataState() {
        const build = (tree, key) => {
          let data = []
          let state = {}
          tree.forEach(item => {
            !item.state.isCreated || data.push(item.data)
            state[_.get(item.data, key)] = item.state
            let { data: childData, state: childState } = build(item.children, key)
            data = data.concat(childData)
            state = Object.assign(state, childState)
          })
          return { data, state }
        }
        let { state, data } = build(this.stateTree, this.currentGridOptions.primaryKey)
        this.stateStore = state
        this.tableData = data
      },
      getStyleByRow(row) {
        let state = this.getStateByRow(row)
        return (state.isShow && state.parentIsOpen) ? {} : { display: "none" }
      },
      getStateByRow(row) {
        let id = _.get(row, this.currentGridOptions.primaryKey)
        return _.get(this.stateStore, id)
      },
      getDeleteRows() {
        if (!this.row) return []
        const store = this.stateStore[this.row[this.currentGridOptions.primaryKey]]
        const findChidren = (children) => {
          return children.reduce((results, item) => {
            let child = findChidren(item.children)
            results = results.concat(child, [item.data])
            return results
          }, [])
        }
        const children = findChidren(store.children)
        return [this.row].concat(children)
      },
      getSerialColumn(h) {
        if (!this.currentSerial) return null
        let serial = {
          fixed: true,
          type: "index",
          label: "序号",
          width: "80px",
          align: "left",
          headerAlign: "left",
          className: "run-treegrid-serial-cell",
          labelClassName: "run-treegrid-serial-label",
          index: (index) => {
            let id = this.tableData[index].id
            return this.stateStore[id].serial
          }
        }
        match(this.currentSerial)
          .string(val => (serial.label = val))
          .function(val => (serial.index = val))
          .object(val => Object.assign(serial, val))
        return h("el-table-column", { props: serial })
      }
    },
    watch: {
      currentSource: {
        immediate: true,
        handler() {
          this.buildTree(this.currentExpandAll)
          this.buildDataState()
          this.onRefreshRow()
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-list-treegrid
    width: 100%
    height: 100%
    padding-bottom: 20px
    box-sizing: border-box

  .run-treegrid-serial-cell
    .cell
      text-indent: 10px

  .run-treegrid-serial-label
    text-indent: 10px

</style>
