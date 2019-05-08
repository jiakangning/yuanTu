<template>
  <el-date-picker
    class="columnDate"
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
          type: 'date',
          placeholder: '选择日期',
          valueFormat: 'yyyy-MM-dd',
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
