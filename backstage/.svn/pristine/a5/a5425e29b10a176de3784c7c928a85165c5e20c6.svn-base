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
          type: 'year',
          format: 'yyyy',
          valueFormat: 'yyyy',
          placeholder: `选择年度`,
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
