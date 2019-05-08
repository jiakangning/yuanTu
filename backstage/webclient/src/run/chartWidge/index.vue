<template>
  <el-card
    class="run-chartWidge"
    v-if="currentSource.length">
    <div
      class="run-chartWidge-wrap"
      :class="{ 'is-hasBtn': currentText }">
      <component
        :is="options.layout"
        :options="options"
        :source="currentSource"/>
    </div>
    <div
      class="run-chartWidge-button"
      v-if="currentText"
      @click="onClick">
      {{ currentText }}
    </div>
  </el-card>
</template>

<script>
  import components from './columns'
  import ChartWidge from '../model/ChartWidge'

  export default {
    name: "run-chart-widge",
    components: components,
    props: {
      options: {
        default() {
          return new ChartWidge({})
        }
      }
    },
    computed: {
      currentSource() {
        let source = this.options.source
        return source ? this.options.getSources(source) : []
      },
      currentText() {
        return this.options.btnText
      }
    },
    methods: {
      onClick() {
        this.$emit(ChartWidge.EVENTS.screen)
        this.options.emit(ChartWidge.EVENTS.screen)
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-chartWidge
    width: 100%

    .el-card__body
      position: relative
      padding: 0
      display: flex

    &-button
      position: absolute
      right: 0
      top: 50%
      color: #ffffff
      font-size: 12px
      font-weight: bold
      height: 30px
      line-height: 30px
      padding: 0 20px 0 18px
      border-top-left-radius: 15px
      border-bottom-left-radius: 15px
      background-color: #409EFF
      transform: translate3d(0, -50%, 0)
      cursor: pointer
      user-select: none

    &-wrap
      flex: 1
      overflow: hidden

      &.is-hasBtn
        margin-right: 60px

</style>
