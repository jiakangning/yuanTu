<template>
  <el-row class="columnNumber">
    <el-input-number
      class="columnNumber-input"
      :class="{'is-readonly': currentOption.readonly}"
      v-on="currentListener"
      v-bind="currentOption"
      v-model="currentValue"/>
    <el-tag
      class="columnNumber-tag"
      :type="currentOption.unitType"
      v-if="currentOption.unit">
      {{ currentOption.unit }}
    </el-tag>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        return {
          unitType: 'info',
          ...this.currentRawOption
        }
      },
      currentListener() {
        return this.currentRawListener
      },
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus"
  scoped>
  .columnNumber
    display: flex
    align-items: center

    &-input
      flex: 1

      &.el-input-number.is-readonly
        .el-input__inner
          cursor: inherit
          color: #606266
          background-color: #FFFFFF

    &-tag
      margin-left: 10px
</style>
