<template>
  <basic
    :options="options"
    :column="column"
    :label="column.label"
    :prop="column.field"
    v-bind="currentOption"/>
</template>

<script type="text/ecmascript-6">
  import { BasicListColumn } from './basic'

  export default {
    extends: BasicListColumn,
    computed: {
      currentOption() {
        return {
          formatter: this.formatter,
          ...this.currentRawOption
        }
      }
    },
    methods: {
      formatter(a, b, c) {
        return c ? '是' : '否'
      }
    }
  }
</script>
