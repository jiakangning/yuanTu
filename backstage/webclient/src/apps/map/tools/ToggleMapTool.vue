<template>
  <div class="toggle-map-panel" @mouseleave="toggleMiniMap = false">
    <label
      @mouseenter="toggleMiniMap = true"
      class="img-radio whole-map-bg"
      :class="{active: this.toggledMap == 'photo'}"
    >
      <input type="radio" value="photo" v-model="toggledMap">
      <span :class="{active: this.toggledMap == 'photo'}">影像</span>
    </label>
    <transition name="show">
      <div class="show-mini-map" v-show="toggleMiniMap">
        <label class="img-radio two-map-bg" :class="{active: this.toggledMap == 'gis'}">
          <input type="radio" value="gis" v-model="toggledMap">
          <span :class="{active: this.toggledMap == 'gis'}">二维</span>
        </label>
        <label class="img-radio three-map-bg" :class="{active: this.toggledMap == 'unity'}">
          <input type="radio" value="unity" v-model="toggledMap">
          <span :class="{active: this.toggledMap == 'unity'}">三维</span>
        </label>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      toggledMap: "gis",
      toggleMiniMap: false,
    };
  },
  computed: {
    ...mapState({
      mapList: state => state.map.mapList
    })
  },
  watch: {
    toggledMap: function(value) {
      this.$emit('changeMap', this.mapList[value])
    }
  },
};
</script>

<style lang='less'>
.toggle-map-panel {
  width: 106px;
  height: 70px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10000;
  input {
    display: none;
  }
  .img-radio {
    width: 86px;
    height: 60px;
    position: relative;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 3px;
    span {
      color: #fff;
      position: absolute;
      right: 2px;
      bottom: 2px;
      display: inline-block;
      width: 40px;
      height: 20px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
    }
    span.active {
      background: #409eff;
    }
  }
  .img-radio.active {
    border: 1px solid #409eff;
  }
  .whole-map-bg {
    position: absolute;
    right: 5px;
    bottom: 5px;
    z-index: 1;
    background: url(/static/images/wholeD.png) no-repeat center center;
  }
  .show-mini-map {
    width: 278px;
    height: 70px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    .two-map-bg {
      background: url(/static/images/twoD.png) no-repeat center center;
    }
    .three-map-bg {
      background: url(/static/images/threeD.png) no-repeat center center;
    }
  }
  .show-enter-active,
  .show-leave-active {
    transition: all 0.3s;
    text-align: right;
  }
  .show-enter,
  .show-leave-to {
    width: 106px;
  }
  .show-enter-to,
  .show-leave {
    width: 278px;
  }
}
</style>
