<template>
  <div class="olBindMap">
    <div class="left">
      <image-list :data="comData" :activeImg="activeImg"></image-list>
      <!-- @svgClick="itemClick" -->
    </div>
    <div class="content">
      <image-container :backgroundImg="backgroundImg" :isBackground="true" @onDrop="onDrop">
        <vue-draggable-resizable
          v-for="(item, index) in bindedPositions"
          :minHeight="150"
          :minWidth="360"
          :x="item.x"
          :y="item.y"
          :w="item.width"
          :h="item.height"
          :key="index"
          :active="item.active"
          :preventDeactivation="true"
          @resizestop="(l, t, w, h) => onResizestop(l, t, w, h, item)"
          @dragstop="(x, y) => onDragstop(x, y, item)"
        >
        <component :data="item" v-if="item.type=== 'component'" :is="item.target" @click.native="e => showDrawer(e, item)"></component>
        </vue-draggable-resizable>
      </image-container>
    </div>
    <a-drawer
      :title="drawerTitle"
      placement="right"
      :mask="false"
      :visible="drawerVisible"
      @close.stop="updateItem"
    >
      <device-info
        :info="activeImg" :sysList="sysList"
        @updateItem="saveItem"
      ></device-info>
    </a-drawer>
  </div>
</template>
<script>
import Vue from 'vue'
import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop)

import { mapGetters } from 'vuex'
import ImageList from '../bindPositions/ImageList.vue'
import comData from '@/assets/data/components.js'
import ImageContainer from '@/components/ImageContainer/Main.vue'
import DeviceInfo from '../bindPositions/DeviceInfo.vue'
import One from './components/one.vue'
import Two from './components/two.vue'
// 命名空间名称
let namespaceName = 'bindPositions'
export default {
  components: {
    ImageList,
    ImageContainer,
    DeviceInfo,
    one: One,
    two: Two
  },
  data () {
    return {
      backgroundImg: '/images/fengji.png',
      comData,
      drawerTitle: '设备配置信息',
      // drawerVisible: false,   
      childDrawerTitle: '设备数据',
      sysList: [
        {
          value: 'pressures',
          text: '矿压系统'
        }, {
          value: 'flows',
          text: '主煤流系统'
        }, {
          value: 'fans',
          text: '主风机系统'
        }, {
          value: 'drainages',
          text: '主排水系统'
        }, {
          value: 'safties',
          text: '安全监控系统'
        }]
    }
  },
  computed: {
    ...mapGetters({
      flows: 'flow/flowList',
      pressures: 'pressure/pressureList',
      fans: 'fan/fanList',
      drainages: 'drainage/drainageList',
      safties: 'safe/safeList'
    }),
    // 绑定数据
    bindedPositions () {
      return this.$store.getters[`${namespaceName}/getConfigDesign`]
    },
    activeImg () {
      return this.$store.getters[`${namespaceName}/getActiveItem`]
    },
    drawerVisible () {
      return this.activeImg ? true : false
    }
  },
  methods: {
    // 改变大小
    onResizestop (x, y, w, h, item) {
      this.saveItem(Object.assign({}, item, { x, y, width: w, height: h }))
    },
    // 拖动
    onDragstop (x, y, item) {
      if(this.activeImg === item && (this.activeImg.x !== x || this.activeImg.y !== y)) {
        this.saveItem(Object.assign({}, item, { x, y }))
      }
    },
    // 左侧放到右侧放下
    onDrop (item, evt) {
      if (!item) {
        return
      }
      let { offsetX, offsetY } = evt
      let nitem = Object.assign({
        scale: 1,
        anchor: [0.5, 0.5],
        x: offsetX,
        y: offsetY,
        width: 50,
        height: 50,
        animationState: true,
        active: true,
        bindSystem: null,
        bindGuid: null
      }, item)
      
      this.addNewItem(nitem)
    },
    showDrawer (e, item) {
      e.stopPropagation();
      this.updateItem(item)
    },
    addNewItem (nitem) {
      this.$store.dispatch(`${namespaceName}/addPosition`, nitem)
    },
    updateItem (data, flag = true) {
      this.$store.commit(`${namespaceName}/updatePosition`, Object.assign(data, {flag}))
    },
    saveItem (data, flag = true) {
      this.$store.dispatch(`${namespaceName}/updatePosition`, Object.assign(data, {flag}))
    }
  }
}
</script>
<style lang="less" scoped>
.olBindMap {
  display: flex;
  text-align: center;
  height: 100%;
  overflow: hidden;
  div.left {
    min-width: 180px;
    width: 180px;
    border: 1px solid #ccc;
  }
  .content {
    flex: 1;
    background: #ccc;
    overflow: auto;
  }
}
</style>

<style lang="less">
.vdr {
  border: 0px dashed #000;
}
.ant-drawer-header {
  padding: 10px 15px;
}
.ant-drawer-close-x {
  width: 42px;
  height: 42px;
  line-height: 42px;
}
.ant-drawer-body {
  padding: 15px;
}
</style>
