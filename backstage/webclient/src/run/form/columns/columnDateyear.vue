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
          type: 'year',
          placeholder: '选择年份',
          format: 'yyyy',
          valueFormat: 'yyyy',
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
