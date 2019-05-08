<template>
  <div class="panel">
    <div class="panel-header">
      <p class="panel-header-title">{{ title }}</p>
      <slot></slot>
    </div>
    <div
      class="panel-body"
      :style="marquee ? 'overflow-y: hidden' : 'overflow-y: scroll'">
        <div
          class="panel-body-list"
          @mouseenter="onMouseenter"
          @mouseleave="onMouseleave"
          ref="marquee">
          <slot name="list"></slot>
        </div>
    </div>
  </div>
</template>

<script>
  const getY = (matrix) => {
    let after = matrix.slice(7, matrix.length - 1).split(',')[5]
    return parseFloat(after) || 0
  }
  export default {
    name: 'panel',
    props: {
      marquee: {
        type: Boolean,
        default: false
      },
      title: String,
      content: {
        type: Array,
        default: () => []
      },
      height: {
        type: Number,
        default: 300
      }
    },
    data () {
      return {
        animateObj: null

      }
    },
    watch: {
      content (val, oldVal) {
        this.onAnimate()
      }
    },
    mounted() {
      this.onAnimate()
    },
    methods: {
      onMouseenter() {
        return this.animateObj ? this.animateObj.pause() : null
      },
      onMouseleave() {
        return this.animateObj ? this.animateObj.play() : null
      },
      onAnimate() {
        let currentHeight = this.$refs.marquee.offsetHeight
        let matrix = document.defaultView.getComputedStyle(this.$refs.marquee).transform
        let translateY = getY(matrix)
        if (this.marquee && currentHeight > 300) {
          this.animateObj = this.$refs.marquee.animate([
            { transform: `translate(0, ${translateY}px)`, offset: 0 },
            { transform: `translate(0, -${currentHeight}px)` }
          ], {
            duration: (translateY + currentHeight) / 30 * 1000,
            iterations: Infinity
          })
        }
      }
    }
  }
</script>

<style
  type="text/stylus"
  rel="stylesheet/stylus"
  lang="stylus">
    .panel
      display flex
      flex-direction column
      height 100%
      background-color #fff
      color rgba(0, 0, 0, .45)
      &-header
        flex 0 0 30px
        text-align center
        background-color #fafafa
        &-title
          padding 10px 0
      &-body
        flex auto
        overflow-y: scroll
</style>
