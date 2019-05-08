<template>
  <div class="run-search-multiple">
    <column-single
      v-for="(column, index) in currentColumns"
      @search="onSearch"
      @input="onInput"
      :options="options"
      :column="column"
      :key="index"/>
    <el-button
      icon="el-icon-search"
      type="primary"
      @click="onSearch">查询
    </el-button>
  </div>
</template>

<script>
  import basic from './basic.vue'

  export default {
    extends: basic
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-search-multiple
    display: inline-flex
</style>
