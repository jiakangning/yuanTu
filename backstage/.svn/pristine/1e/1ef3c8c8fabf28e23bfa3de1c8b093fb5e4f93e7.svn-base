<template>
  <div style="width: 100%;height: 100%;position: relative">
    <div
      ref="unityBackground"
      class="unity-map-background"
      @click.stop="clickUnityMap"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mouseenter="openUnityEvent"
      @mouseleave="mouseLeave"
    >
      <!-- 场景中手动绘制的图标 -->
      <img
        :src="iconSrc"
        v-show="showIconImg"
        :style="{left: iconPosition.x + 'px', top: iconPosition.y + 'px'}"
      >
    </div>
    <!-- 场景右键菜单 -->
    <right-menu
      v-if="showMenu"
      @itemClick="menuItemClick"
      :menuList="menuList"
      :position="menuPosition"
    ></right-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { WINDOWFUNCS as windowFuncs } from "./constant";
import RightMenu from "./tools/RightMenu";
export default {
  props: {
    loaded: {
      type: Boolean,
      default: false,
      required: false
    },
    // 需要加载的三维模型
    modelList: {
      type: Array,
      default: () => [],
      required: false
    },
    // 是否显示右键菜单
    showMapMenu: {
      type: Boolean,
      default: false,
      required: false
    },
    // 右键菜单
    menuList: {
      type: Array,
      default: null,
      required: false
    },
    // 手动绘制图标的src
    iconSrc: {
      type: String,
      required: false,
      default: "/static/images/unityMark/椭圆高亮.png"
    },
    // 是否显示手动绘制的图标
    showIconImg: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    RightMenu
  },
  data() {
    return {
      // 图标相对于屏幕的位置
      iconPosition: {
        x: 0,
        y: 0
      },
      menuPosition: {
        left: 0,
        top: 0
      },
      isMouseMove: false,
      // 是否处于任意查询状态
      isAnyQuery: true,
      showPropertyMenu: false
    };
  },
  computed: {
    ...mapState({
      currentModel: state => state.unity.currentModel,
      currentToolType: state => state.unity.currentToolType,
      currentBrowserStyle: state => state.unity.currentBrowserStyle,
      currnetControlSwitch: state => state.unity.currnetControlSwitch
    }),
    showMenu() {
      return this.showMapMenu && this.showPropertyMenu;
    }
  },
  mounted() {
    this.registerWindowFuncs();
    if (!this.loaded) {
      // 初始化
      this.initMap();
    } else {
      const config = {
        center: JSON.stringify(this.$store.state.map.currentCenter),
        level: this.$store.state.map.currentZoom,
        angle: this.$store.state.map.currentAngle
      };
      // 更新
      // unityUpdateCameraPos(JSON.stringify(config));
    }
    this.$emit("onMapReady");
  },
  beforeDestroy() {
    unitySaveViewport();
    unitySaveScene();
    unitySaveSensors('{"CallBack": "saveSensors"}');
    // unityQuit();
    this.removeWindowFuncs();
  },
  methods: {
    registerWindowFuncs() {
      const self = this;
      // 注册三维场景初始化完成事件
      window[windowFuncs.LOADCOMPLETED] = () => {
        self.$emit("onMapReady");
      };
      // 注册保存传感器事件
      window[windowFuncs.SAVESENSORS] = async data => {
        self.$emit("saveSensors", data);
      };
      // 注册显示右键菜单事件
      window[windowFuncs.SHOWENTITYMENU] = (flag, result) => {
        if (flag) {
          this.showPropertyMenu = true;
          let entity = JSON.parse(result.entity);
          this.$emit("getMenus", {
            type: entity.EntityType,
            payload: { ...result, entity: entity }
          });
        }
      };
      // 三维工具返回结果
      window[windowFuncs.GETQUERYDATA] = result => {
        let tool = JSON.parse(result);
        self.$emit("showToolResult", { type: tool.ToolType, payload: tool });
      };
      // 确定起止点坐标和所在巷道
      window[windowFuncs.CHOOSEPOSITION] = type => {
        return (flag, result) => {
          if (flag) {
            self.$emit("showSelectPosition", { type: type, payload: result });
          } else {
            if (type === "start") {
              self.$message("起点没有在巷道上面，为无效起点");
            } else if (type === "end") {
              self.$message("终点没有在巷道上面，为无效终点");
            }
          }
        };
      };
      // 添加标记
      window[windowFuncs.CREATEMARKER] = type => {
        return (flag, result) => {
          self.$emit("createMark", {
            type: type,
            valid: flag,
            payload: result
          });
        };
      };
      // 显示搜索到的详细信息面板
      window[windowFuncs.SHOWSENSORINFO] = serial => {
        return (flag, result) => {
          if (flag && serial === result.guid) {
            self.$emit("showSearchDialog", { payload: result });
          }
        };
      };
      // 获取中心点及缩放级别
      window[windowFuncs.GETCENTERZOOM] = result => {
        const { center, zoom } = result;
        this.$store.dispatch("map/changeCenterZoom", {
          center: JSON.parse(center),
          zoom
        });
      };
    },
    removeWindowFuncs() {
      Object.keys(windowFuncs).forEach(key => {
        if (window[key]) {
          delete window[key];
        }
      });
    },
    // 初始化地图
    initMap() {
      // 设置地图位置以及宽高 ,加载三维场景, 并判断是否在unity中
      let clientHeight = Number(document.documentElement.clientHeight);
      let clientWidth = Number(document.documentElement.clientWidth);
      let xStart = 0;
      let yStart = 0;
      let xWidth = 1 - xStart;
      let yWidth = 1 - 105 / clientHeight;
      try {
        unityLoadScene();
        unitySetEventIntercept(false);
        unitySetViewportRect(xStart, yStart, xWidth, yWidth);
        this.modelList && this.initUnityModel(this.modelList);
        console.log("unity loaded success");
      } catch (err) {
        if (err) {
          console.log("unity loaded faild" + err);
        }
      }
    },
    // 加载三维模型库配置的模型
    initUnityModel(unityList) {
      // let unityModel = await commonApi.find(
      //   "monitor_unityModelPositionCollection"
      // );
      let unityModel = unityList.map(val => {
        return {
          Name: val.Name || "",
          Type: val.Type || "",
          GUID: val.GUID || "",
          subSystem: val.SubSystem ? JSON.stringify(val.SubSystem) : "",
          Forward: val.Forward || {},
          Position: val.Position || {},
          Scale: val.Scale || {},
          BindObjectGUID: val.BindObjectGUID || ""
        };
      });
      unityModel = JSON.stringify(unityModel);
      unityLoadSensors(unityModel);
    },
    // 点击三维地图图层的事件
    clickUnityMap() {
      this.showPropertyMenu = false;
      let e = window.event;
    },
    // 区分左右键点击事件
    mouseup() {
      let e = window.event;
      this.showPropertyMenu = false;
      if (
        e.button === 2 &&
        this.isMouseMove === false &&
        this.isAnyQuery === true
      ) {
        let y = window.screen.height - e.screenY;
        this.menuPosition.left = e.layerX;
        this.menuPosition.top = e.layerY;
        unityRaycast(e.screenX, y, windowFuncs.SHOWENTITYMENU);
      }
    },
    mousedown() {
      this.isMouseMove = false;
    },
    // 鼠标移动，显示图标
    mousemove() {
      this.isMouseMove = true;
      if (this.isStartMove) {
        this.showIconByType();
      }
    },
    openUnityEvent() {
      unitySetEventIntercept(false);
    },
    mouseLeave() {
      // 获取当前中心点及缩放级别
      // unityGetCameraPos(windowFuncs.GETCENTERZOOM);
      // 离开三维场景的交互
      unitySetEventIntercept(true);
    },
    menuItemClick(item) {
      this.$emit("clickMenu", item);
    }
  },
  watch: {
    currentModel: function(value) {
      if (value && value.guid && value.type !== "ImageServer") {
        unityLocationEntity(value.guid);
      }
    },
    currentToolType: function(value) {
      unityEnableTool(value);
    },
    currentBrowserStyle: function(value) {
      unityEnableNavigate(value);
    },
    currnetControlSwitch: function(value) {
      unityUpdateBoundary(value.length ? true : false);
    }
  }
};
</script>

<style scoped lang="less">
div {
  width: 100%;
  height: 100%;
  .unity-map-background {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 36px;
      height: 36px;
      margin-left: -18px;
      margin-top: -36px;
      position: fixed;
    }
    .clickMenu {
      width: 80px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0;
      // padding: 5px;
      position: absolute;
      li {
        width: 80px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        font-size: 14px;
        cursor: pointer;
        margin: 0px !important;
        border-radius: 2px;
      }
      li:hover {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .mark-card {
    z-index: 100;
    width: 400px;
    height: 240px;
    position: absolute;
    left: 0px;
    top: 0px;
    margin-left: -200px;
    margin-top: -400px;
    img {
      width: 36px;
      height: 36px;
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .selectColor {
      position: absolute;
      top: 0;
      right: -205px;
    }
  }
}
</style>
