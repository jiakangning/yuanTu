<template>
  <basic
    :options="options"
    :column="column"
    :label="column.label"
    :prop="column.field"
    v-bind="currentOption"/>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import { BasicListColumn } from './basic'

  export default {
    extends: BasicListColumn,
    computed: {
      currentOption() {
        return {
          format: 'YYYY-MM-DD',
          formatter: this.formatter,
          ...this.currentRawOption
        }
      }
    },
    methods: {
      formatter(a, b, c) {
        if (!c) return ''
        return moment(c).format(this.currentOption.format)
      }
    }
  }
</script>
