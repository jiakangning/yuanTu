<template>
  <div
    class="work-title"
    :class="{'no-describe': !describe}">
    <div class="work-title-text">
      {{ title }}
    </div>
    <div class="work-title-describe">
      {{ describe }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      options: {}
    },
    computed: {
      title() {
        return this.options.getConfig("title")
      },
      describe() {
        return this.options.getConfig("describe")
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
