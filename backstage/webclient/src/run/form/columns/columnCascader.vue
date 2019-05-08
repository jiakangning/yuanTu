<template>
  <run-cascader
    :options="currentSource"
    v-bind="currentOptions"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script type="text/ecmascript-6">
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOptions() {
        return {
          placeholder: '搜索...',
          filterable: true,
          showAllLevels: true,
          expandTrigger: 'click',
          ...this.currentRawOption
        }
      },
      currentListener() {
        return this.currentRawListener
      },
      currentValue: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
