<template>
  <div class="drop img-container">
    <img :src="backgroundImg" alt="" draggable="false">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'ImageContainer',
  props: {
    backgroundImg: {
      type: String,
      default() {
        return '/images/mdl_map_1920x1080.jpg'
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
  }
</style>
