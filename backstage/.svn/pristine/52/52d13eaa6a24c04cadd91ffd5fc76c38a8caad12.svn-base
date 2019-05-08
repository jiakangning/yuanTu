<template>
  <el-time-picker
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script type="text/ecmascript-6">
  import { BasicSearchColumn } from "./basic.js"

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentListener() {
        return this.currentRawListener
      },
      currentOption() {
        const { visible, width = visible ? "260px" : "260px" } = this.column
        return {
          style: { width },
          isRange: true,
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          placeholder: '选择时间范围',
          format: 'HH:mm',
          valueFormat: 'HH:mm',
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
