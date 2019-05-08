<template>
  <horizontal>
    <image-list :data="svgData" :activeImg="activeImg" slot="left"></image-list>
    <div slot="content">
      <image-container background-img="/images/mdl_pressureFan_1920X1080.png" @onDrop="onDrop">
        <vue-draggable-resizable
          v-for="(item, index) in bindedPositions"
          :style="{ transform: 'rotate('+ item.rotate + 'deg)'}"
          :x="item.x"
          :y="item.y"
          :w="item.width"
          :h="item.height"
          :key="index"
          :active="item.active"
          :preventDeactivation="true"
          :parent='true'
          @resizestop="(l, t, w, h) => onResizestop(l, t, w, h, item)"
          @dragstop="(x, y) => onDragstop(x, y, item)"
        >
          <svg-marker
            v-if="item.type === 'svg'"
            :data="item"
            @click="e => showDrawer(e, item)"
          ></svg-marker>
          <image-marker v-else-if="item.type === 'img'" :data="item" @click.native="e => showDrawer(e, item)" />
          <sensor-label v-else-if="item.type === 'label-sensor'" :data="item" @click.native="e => showDrawer(e, item)" />
        </vue-draggable-resizable>
      </image-container>
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
          @selectSystem="showLiveData"
        ></device-info>
          <live-data
            v-if="liveShow"
            :visible="liveShow"
            :liveSystem="liveSystem"
            :dataSource= "dataSource"
            @selectData="selectData"
          ></live-data>
      </a-drawer>
    </div>
  </horizontal>
</template>
<script>
import Vue from 'vue'
import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop)

import { mapGetters } from 'vuex'
import Horizontal from '../../layout/Horizontal'
import ImageList from '../bindPositions/ImageList'
import svgData from '@/assets/data/svg.js'
import ImageContainer from '@/components/ImageContainer/Main.vue'
import SVGMarker from '@/components/SVGMarker/Main.vue'
import ImageMarker from './../bindPositions/ImageMarker.vue'
import DeviceInfo from './../bindPositions/DeviceInfo.vue'
import LiveData from './../bindPositions/LiveData.vue'
import { belongsTo } from '../../store/bindPositions'
import SensorLabel from '@/components/Label/Sensor'

let namespaceName = 'bindPositions'

export default {
  components: {
    Horizontal,
    ImageList,
    ImageContainer,
    'svg-marker': SVGMarker,
    ImageMarker,
    DeviceInfo,
    LiveData,
    SensorLabel
  },
  data () {
    return {
      svgData,
      drawerTitle: '设备配置信息',
      childDrawerTitle: '设备数据',
      liveShow: false,
      liveSystem: {
        system: '',
        name: ''
      },
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
          text: '排水自动化系统'
        }, {
          value: 'safties',
          text: '安全监控系统'
        }
      ],
      dataSource: []
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
      return this.$store.getters[`${namespaceName}/getPressureFanPositions`]
    },
    activeImg () {
      return this.$store.getters[`${namespaceName}/getActivePressureFan`]
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
        animationState: false,
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
      this.$store.dispatch(`${namespaceName}/addPosition`, Object.assign({rotate: 0, belongsTo: belongsTo.PRESSUREFAN}, nitem))
    },
    updateItem (data, flag = true) {
      this.$store.commit(`${namespaceName}/updatePosition`, Object.assign(data, {flag}))
    },
    saveItem (data, flag = true) {
      this.$store.dispatch(`${namespaceName}/updatePosition`, Object.assign(data, {flag}))
    },
    showLiveData (sys) {
      this.liveShow = true
      let systemInfo = this.sysList.find(item => item.value == sys)
      this.liveSystem = {
        system: sys,
        name: systemInfo ? systemInfo.text : ''
      }
    },
    selectData (data) {
      if (data) {
        this.matchingData(data)
      }
      this.liveShow = false
    },
    matchingData(activeData) {
      let obj = {}
      let data = this[this.activeImg.bindSystem]
      let info = data.find(item => item.tag === activeData.tag)
      if (info) {
        obj.value = info.value
        obj.unit = info.unit || ''
        obj.animationState = info.value && info.value !== 'false' ? true : false
        obj.isAlarm = info.state === '正常' ? false : true
      }
      this.saveItem(Object.assign(this.activeImg, obj, { bindGuid: activeData.tag || '' }))
    }
  }
}
</script>
<style lang="less" scoped>

</style>
