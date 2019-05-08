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
        const { visible, width = visible ? "200px" : "200px" } = this.column
        return {
          style: { width },
          type: 'month',
          format: 'yyyy-MM',
          valueFormat: 'yyyy-MM',
          placeholder: `选择月份`,
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
