<template>
  <div>
    <drop @drop="onDrop" class="drop img-container">
      <div
        v-if="isBackground"
        draggable="false"
        class="backContainer"
        :style="{ 'background-image': 'url(' + backgroundImg + ')' }"
      ></div>
      <img v-else :src="backgroundImg" alt="" draggable="false" />
      <slot />
    </drop>
  </div>
</template>
<script>
export default {
  name: 'ImageContainer',
  props: {
    backgroundImg: {
      type: String,
      default () {
        return '/images/mdl_map_1920x1080.jpg'
      }
    },
    isBackground: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    onDrop (data, evt) {
      this.$emit('onDrop', data, evt)
    }
  }
}
</script>

<style lang="less" scoped>
.img-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .backContainer {
    height: 100vh;
    background: no-repeat center center #008877;
    background-size: contain;
  }
}
</style>
