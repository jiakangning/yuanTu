<template>
  <div
    class="run-search-single"
    :style="currentStyle">
    <column-group
      class="run-search-single-basic"
      @search="onSearch"
      @input="onInput"
      :options="options"
      :columns="currentColumns"/>
    <el-button
      class="run-search-single-button"
      icon="el-icon-search"
      @click="onSearch"/>
  </div>
</template>

<script>
  import basic from './basic.vue'

  export default {
    extends: basic,
    computed: {
      currentStyle() {
        return { width: this.options.getConfig("width") }
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-search-single
    display: inline-flex

    &-basic
      flex: 1

    &-button.el-button
      background-color: #f5f7fa
      border-top-left-radius: 0
      border-bottom-left-radius: 0
</style>
