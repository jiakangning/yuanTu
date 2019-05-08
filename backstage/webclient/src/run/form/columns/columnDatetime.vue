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
          type: 'datetime',
          placeholder: '选择时间',
          valueFormat: 'yyyy-MM-dd HH:mm',
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
