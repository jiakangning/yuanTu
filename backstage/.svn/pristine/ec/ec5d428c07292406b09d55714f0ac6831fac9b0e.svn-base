<template>
  <el-button-group v-if="currentActions.length">
    <el-button
      v-for="(item, index) in currentActions"
      @click="onClick(item)"
      :type="item.type"
      :icon="item.icon"
      :key="index">
      {{ item.text }}
    </el-button>
</el-button-group>
</template>

<script>
  export default {
    props: {
      options: {}
    },
    computed: {
      currentActions() {
        return this.options.getActions()
      }
    },
    methods: {
      onClick(item) {
        this.$emit("action", item)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus"
  scoped>
  .work-title
    display: inline-block

    &.no-describe

      .work-title-text
        font-size: 16px
        line-height: 40px

      .work-title-describe
        display: none

    &-text
      font-size: 14px
      font-weight: bold
      color: #333333
      line-height: 30px

    &-describe
      font-size: 12px
      color: #999999
      line-height: 16px

</style>
