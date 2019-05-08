<template>
  <el-table-column
    :label="column.label"
    :prop="column.field"
    v-bind="currentOption">
    <template slot-scope="scope">
      <a
        class="file"
        v-for="(file, index) in getFile(scope)"
        :key="index"
        target="_blank"
        :href="file.url">
        <span v-if="getFile(scope).length > 1">{{index + 1}}：</span>{{file.name}}
      </a>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
  import { BasicListColumn } from "./basic.js"
  import _ from 'lodash'

  export default {
    extends: BasicListColumn,
    computed: {
      currentOption() {
        return {
          width: '260px',
          align: 'center',
          ...this.currentRawOption
        }
      }
    },
    methods: {
      getFile(scope) {
        return _.get(scope, `row.${ this.column.field }`, [])
      }
    }
  }
</script>

<style scoped>
  .file {
    text-align: left;
    display: block;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
