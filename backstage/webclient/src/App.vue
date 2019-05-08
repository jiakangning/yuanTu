<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "app"
  }
</script>

<style
  type="text/stylus"
  lang="stylus"
  rel="stylesheet/stylus">
  @import "./style/index.styl"
</style>

<style
  type="text/stylus"
  lang="stylus"
  rel="stylesheet/stylus">
  #app
    width: 100%
    height: 100%
</style>
