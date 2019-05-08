<template>
  <div class="container">
    <span class="left" v-text="data.value || '???'"></span>
    <span class="right" v-text="data.unit || '?'"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  color: #00FF02;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
</style>
