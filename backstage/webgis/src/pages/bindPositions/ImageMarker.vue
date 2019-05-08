<template>
  <div class="sensor-comp">
    <img :src="images[data.isAlarm ? 'alarm' : 'normal']" alt="" />
    <span class="sensor-type" v-html="data.target"></span>
    <span class="sensor-data" v-html="(data.value || '--') + (data.unit || '')"></span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      images: {
        alarm: '/images/sensor/hong.png',
        normal: '/images/sensor/lv.png',
        offline: '/images/sensor/lan.png',
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sensor-comp {
  width: 80px;
  height: 26px;
  position: relative;

  .sensor-type {
    position: absolute;
    left: 1px;
    top: 0;
    width: 25px;
    display: block;
    text-align: center;
    line-height: 20px;
    font-size: 50%;
    color: white;
  }

  .sensor-data {
    position: absolute;
    left: 26px;
    top: 0;
    font-size: 10px;
    line-height: 20px;
    display: block;
    text-align: left;
    color: #3567da;
  }
}
</style>
