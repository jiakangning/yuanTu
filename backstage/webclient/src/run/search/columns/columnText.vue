<template>
  <el-input
    @keyup.enter.native="onSearch"
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script type="text/ecmascript-6">
  import { BasicSearchColumn } from './basic.js'

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentListener() {
        return this.currentRawListener
      },
      currentOption() {
        const { label = "", visible, width = visible ? "200px" : "200px" } = this.column
        return {
          style: { width },
          clearable: true,
          placeholder: `搜索${ label }`,
          ...this.currentRawOption
        }
      },
      currentValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
