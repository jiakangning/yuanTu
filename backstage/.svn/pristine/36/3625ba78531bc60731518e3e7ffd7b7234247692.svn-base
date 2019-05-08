<template>
  <el-date-picker
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script type="text/ecmascript-6">
  import { BasicSearchColumn } from "./basic"
  import moment from 'moment'

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentListener() {
        return this.currentRawListener
      },
      currentOption() {
        const { visible, width = visible ? "300px" : "300px" } = this.column
        return {
          style: { width },
          type: 'daterange',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          ...this.currentRawOption
        }
      },
      currentValue: {
        get() {
          return this.value
        },
        set(value) {
          if (value) {
            let [start, end] = value
            if (start && start === end) {
              end = moment(end).add(1, "days").format("YYYY-MM-DD")
              value = [start, end]
            }
          }
          this.$emit('input', value)
        }
      }
    }
  }
</script>
