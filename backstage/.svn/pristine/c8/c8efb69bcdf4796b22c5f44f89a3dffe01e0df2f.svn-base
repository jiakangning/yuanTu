<template>
  <el-input
    v-on="currentListener"
    v-bind="currentOption"
    v-model.trim="currentValue"/>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        return {
          clearable: true,
          type: 'textarea',
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
