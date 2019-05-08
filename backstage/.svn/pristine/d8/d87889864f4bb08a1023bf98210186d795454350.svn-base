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
        return this.currentRawOption
      }
    }
  }
</script>
