<template>
  <div class="column-popup">
    <h3 class="column-popup-title">{{ column.label }}</h3>
    <div class="column-popup-content">
      <component
        style="width: 100%;"
        @search="onSearch"
        @input="onInput"
        :options="options"
        :column="column"
        :is="componentName"
        v-model="currentForm"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import components from './index.js'
  import Search from '../../model/Search.js'

  export default {
    components,
    props: {
      options: {},
      column: {}
    },
    computed: {
      componentName() {
        let layout = this.column.layout
        return typeof layout === "object" ? layout : `column-${ layout }`
      },
      currentField() {
        return this.column.field
      },
      currentForm: {
        get() {
          return this.options.getParams(this.currentField)
        },
        set(val) {
          return this.options.setParams(val, this.currentField)
        }
      }
    },
    methods: {
      onSearch() {
        this.$emit(Search.EVENTS.search)
      },
      onInput() {
        this.$emit(Search.EVENTS.input)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus"
  scoped>
  .column-popup
    >>> .el-input__inner
      height: 36px

    &-title
      margin: 10px 0
      font-size: 14px
      color: rgba(0, 0, 0, 0.85)
      line-height: 22px

    &-content
      padding: 12px 10px
</style>
