<template>
  <el-date-picker
    v-on="currentListener"
    v-bind="currentOption"
    v-model="currentValue"/>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        return {
          type: 'month',
          placeholder: '选择月份',
          format: 'yyyy-MM',
          valueFormat: 'yyyy-MM',
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