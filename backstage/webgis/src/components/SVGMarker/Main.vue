<template>
    <div :style="style" ref="lavContainer" @click="onClick"></div>
</template>

<script>
  import lottie from 'lottie-web';
  import { getSvgData } from '@/service/bindPositions'
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      height: Number,
      width: Number,
    },

    data () {
      return {
        style: {
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%',
          overflow: 'hidden',
          margin: '0 auto'
        }
      }
    },

    mounted () {
      this.init()
    },
    watch: {
      'data.animationState': {
        handler(val) {
          if (val) {
            this.playAnimate()
          } else {
            this.stopAnimate()
          }
        }
      }
    },
    methods: {
      init() {
        getSvgData(this.data.target).then(({data}) => {
          this.anim = lottie.loadAnimation({
            container: this.$refs.lavContainer,
            renderer: 'svg',
            loop: this.data.loop !== false,
            autoplay: this.data.autoplay !== false,
            animationData: data,
            rendererSettings: this.data.rendererSettings
          });
          if (this.data.animationState) 
            this.playAnimate()
          else 
            this.stopAnimate()
        }).catch(() => {
          this.$message.error('暂无SVG数据');
        })
      },
      playAnimate() {
        this.anim.play()
      },
      stopAnimate() {
        this.anim.stop()
      },
      setAnimateSpeed(speed = 1) {
        this.anim.setSpeed(speed)
      },
      onClick(e) {
        this.$emit('click', e)
      }
    },
  }
</script>
