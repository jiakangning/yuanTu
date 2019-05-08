<template>
  <el-date-picker
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script type="text/ecmascript-6">
  import { BasicSearchColumn } from "./basic"

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentListener() {
        return this.currentRawListener
      },
      currentOption() {
        const { visible, width = visible ? "360px" : "360px" } = this.column
        return {
          style: { width },
          type: 'datetimerange',
          rangeSeparator: '至',
          startPlaceholder: '开始日期时间',
          endPlaceholder: '结束日期时间',
          format: 'yyyy-MM-dd HH:mm',
          valueFormat: 'yyyy-MM-dd HH:mm',
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
