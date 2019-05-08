<template>
  <basic
    :options="options"
    :column="column"
    :label="column.label"
    :prop="column.field"
    v-bind="currentOption">
    <el-rate
      disabled
      slot-scope="scope"
      :value="getValue(scope)"/>
  </basic>
</template>

<script type="text/ecmascript-6">
  import { BasicListColumn } from './basic'
  import _ from 'lodash'

  export default {
    extends: BasicListColumn,
    computed: {
      currentOption() {
        return {
          ...this.currentRawOption,
          minWidth: "150px"
        }
      }
    },
    methods: {
      getValue(scope) {
        return _.get(scope, `row.${ this.column.field }`)
      }
    }
  }
</script>
