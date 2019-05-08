<template>
  <el-popover
    style="display: block;"
    transition="el-zoom-in-top"
    placement="bottom-start"
    popperClass="workTreeSelect"
    v-model="visible"
    ref="popover">
    <el-tree
      class="workTreeSelect-tree"
      v-on="currentListener"
      v-bind="_tree"
      :data="currentSource"
      @check="onCheck"
      @current-change="currentChange"
      ref="tree">
    </el-tree>
    <template
      v-if="!_tree.multiple"
      slot="reference">
      <div class="workTreeSelect-wrap">
        <el-input
          @compositionend.native="onComposition"
          @compositionstart.native="onComposition"
          :placeholder="currentLabel ? '' : '请输入...'"
          v-model="input"
          ref="input">
        </el-input>
        <span
          class="workTreeSelect-tree__label">
          <template v-if="!_tree.multiple && !input && !isOnComposition">
            {{currentLabel}}
          </template>
        </span>
      </div>
    </template>
    <template
      v-else
      slot="reference">
      <div
        class="workTreeSelect-wrap"
        ref="reference">
        <el-input
          readonly
          placeholder=""
          ref="inputWrap">
        </el-input>
        <span
          class="workTreeSelect-tree__label"
          ref="tags">
          <template>
            <el-tag
              disableTransitions
              size="small"
              type="info"
              v-for="(item, index) in currentTags"
              :key="index"
              closable
              @close="onCloseTag(item, index)">
              {{item.label}}
            </el-tag>
          </template>
          <input
            @keydown="resetInputState"
            @compositionend="onComposition"
            @compositionstart="onComposition"
            v-model="input"
            type="text"
            autocomplete="off"
            debounce="0"
            class="workTreeSelect-tree__input"
            :style="inputStyle"
            ref="input">
        </span>
      </div>
    </template>
  </el-popover>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"
  import throttle from '../../common/throttle.js'
  import match from '../../common/match.js'

  const pinyinMatch = require('pinyin-match')

  export default {
    extends: BasicFormColumn,
    computed: {
      _tree() {
        let {
          props = {
            label: 'label',
            value: 'value',
            children: 'children'
          },
          multiple = false,
          filterNodeMethod = null,
          expandOnClickNode,
          checkOnClickNode,
          panelHeight: maxHeight = '300px',
          ...obj
        } = this.currentRawOption
        expandOnClickNode = match(expandOnClickNode)
          .boolean()
          .fail(!multiple)
          .build()
        checkOnClickNode = match(checkOnClickNode)
          .boolean()
          .fail(multiple)
          .build()
        return {
          style: { maxHeight },
          multiple: multiple,
          expandOnClickNode: expandOnClickNode,
          checkOnClickNode: checkOnClickNode,
          showCheckbox: multiple,
          highlightCurrent: !multiple,
          accordion: true,
          data: this.currentSource,
          showAllLevels: true,
          changeOnSelect: false,
          checkStrictly: false,
          leafOnly: false,
          nodeKey: props.value,
          props: props,
          filterNodeMethod: filterNodeMethod || this.filterNodeMethod,
          ...obj
        }
      },
      currentLabel() {
        if (!this.currentNode) return ''
        if (this._tree.showAllLevels) {
          let results = []
          const fn = (node) => {
            if (node.parent) {
              results.unshift(node)
              fn(node.parent)
            }
          }
          fn(this.currentNode)
          return results.map(item => item.label).join(' / ')
        }
        return this.currentNode.label
      },
      currentTags() {
        if (!this.currentCheckNodes) return []
        if (this._tree.checkStrictly || this._tree.leafOnly) return this.currentCheckNodes
        return this.currentCheckNodes.filter(item => item && !item.parent.checked)
      },
      currentValue: {
        get() {
          return !this._tree.multiple ? this.value : (this.value || [])
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      currentListener() {
        return this.currentRawListener
      },
      inputStyle() {
        return {
          width: this.inputLength + 'px',
          maxWidth: (this.$refs.reference ? this.$refs.reference.getBoundingClientRect().width : 200) + 'px'
        }
      }
    },
    data() {
      return {
        inputLength: 20,
        visible: false,
        input: '',
        currentNode: null,
        currentCheckNodes: null,
        isOnComposition: false
      }
    },
    created() {
      this.setValue()
    },
    methods: {
      resetInputHeight() {
        if (!this._tree.multiple) return
        const fn = () => {
          this.$nextTick(() => {
            let height = this.$refs.tags.clientHeight
            let inputChildNodes = this.$refs.inputWrap.$el.childNodes
            let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
            if (input) input.style.height = height + 'px'
          })
        }
        if (!this._throttleInstance) {
          this._throttleInstance = throttle(fn, 100)
        }
        this._throttleInstance()
      },
      resetInputState(e) {
        this.inputLength = this.$refs.input.value.length * 15 + 20
      },
      filterNodeMethod(value, data, node) {
        if (!value) return true
        const canShow = (node) => {
          if (!node.label) return false
          return pinyinMatch.match(node.label + '', value + '') || (node.parent && canShow(node.parent))
        }
        return canShow(node)
      },
      onCloseTag(item) {
        this.$refs.tree.setChecked(item.key, false, true)
        let node = this.$refs.tree.getNode(item.key)
        const fn = (node) => {
          let index = this.currentCheckNodes.findIndex(v => v.key === node.key)
          if (index > -1) {
            this.currentCheckNodes.splice(index, 1)
          }
          node.childNodes.forEach(fn)
        }
        fn(node)
        this.currentValue = this.currentCheckNodes.map(v => v.key)
        this.resetInputHeight()
      },
      onComposition(event) {
        this.isOnComposition = event.type !== 'compositionend'
      },
      onFocus() {
        this.$refs.input.focus()
        this.visible = true
        if (this._tree.multiple) {
          this.$refs.inputWrap.focus()
        }
      },
      onClear() {
        this.input = ''
        this.visible = true
        this.resetInputHeight()
      },
      onCheck(data, { checkedNodes }) {
        if (this._tree.multiple) {
          this.input = ''
          this.onFocus()
          let { children, value } = this._tree.props
          let nodes = []
          nodes = checkedNodes.reduce((results, item) => {
            if (this._tree.leafOnly) {
              if (!item[children]) {
                results.push(item[value])
              }
            } else {
              results.push(item[value])
            }
            return results
          }, [])
          this.currentValue = nodes
          this.currentCheckNodes = nodes.map(item => this.$refs.tree.getNode(item))
          this.resetInputHeight()
        }
      },
      currentChange(data, node) {
        if (!this._tree.multiple) {
          if (this._tree.changeOnSelect || node.isLeaf) {
            this.input = ''
            this.onFocus()
            this.currentNode = node
            this.currentValue = node.key
          }
          if (node.isLeaf) {
            this.visible = false
          }
        }
      },
      setValue() {
        this.$nextTick(() => {
          if (this._tree.multiple) {
            this.$refs.tree.setCheckedKeys(this.currentValue || [], this._tree.leafOnly)
            if (this.currentValue) {
              this.currentCheckNodes = this.currentValue.map(item => this.$refs.tree.getNode(item))
            }
            this.resetInputHeight()
          } else {
            this.$refs.tree.setCurrentKey(this.currentValue)
            if (this.currentValue) {
              this.currentNode = this.$refs.tree.getNode(this.currentValue)
            }
          }
        })
      }
    },
    watch: {
      currentValue() {
        this.setValue()
        this.resetInputHeight()
      },
      input(val) {
        this.resetInputState()
        this.resetInputHeight()
        this.$refs.tree.filter(val)
      }
    }
  }
</script>

<style lang="stylus">
  .workTreeSelect.el-popover
    min-width: 220px
    padding: 12px 0

    .popper__arrow
      left: 20px !important

  .workTreeSelect-tree
    overflow: auto
    min-height: 200px

    &::-webkit-scrollbar
      display: none

    .el-tree-node__expand-icon
      font-size: 16px

    .el-tree-node__content
      padding: 4px 0

  .workTreeSelect-wrap
    position: relative
    width: 100%

  .workTreeSelect-tree__label
    position: absolute
    left: 0
    top: 0
    padding: 0 25px 0 15px
    color: #666666
    width: 100%
    box-sizing: border-box
    cursor: pointer
    text-align: left
    font-size: inherit

    .el-tag
      margin: 2px 6px 2px 0

    .workTreeSelect-tree__input
      border: none
      outline: 0
      padding: 0
      margin-left: 5px
      color: #666
      font-size: 14px
      -webkit-appearance: none
      -moz-appearance: none
      appearance: none
      height: 28px
      background-color: transparent
</style>
