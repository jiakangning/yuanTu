<template>
  <div class='main-body'>
    <!-- 地图 -->
    <div class='map-container'>
      <router-view></router-view>
    </div>
    <!-- 右下角信息工具条 -->
    <MessageTable/>
    <!-- 右下角地图切换 -->
    <ToggleTool v-if="isInUnity" @changeMap="changeMap"/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ToggleTool from "./tools/ToggleMapTool";
import MessageTable from "./tools/MessageTable";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isInUnity: state => state.unity.isInUnity,
      currentMap: state => state.map.currentMap,
      // 当前地图中心点坐标
      currentCenter: state => state.map.currentCenter,
      // 当前缩放级别
      currentZoom: state => state.map.currentZoom
    })
  },
  components: {
    ToggleTool,
    MessageTable
  },
  methods: {
    changeMap(mapInfo) {
      this.$router.push({name: mapInfo.routeName, params: {}})
    }
  }
};
</script>

<style lang='less'>
.main-body {
  position: relative;
  height: 100%;
  overflow: hidden;
  .map-container {
    width: 100%;
    height: 100%;
  }
}

</style>
