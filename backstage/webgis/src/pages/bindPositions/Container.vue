<template>
  <div class="olBindMap">
    <div class="left">
      <image-list :data="svgData" :activeImg="activeImg"></image-list>
      <!-- @svgClick="itemClick" -->
    </div>
    <div class="content">
      <image-container @onDrop="onDrop">
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
          <ImageMarker v-else-if="item.type === 'img'" :data="item" @click.native="e => showDrawer(e, item)" />
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
</template>
<script>
import Vue from 'vue'
import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop)

import { mapGetters } from 'vuex'
import ImageList from './ImageList.vue'
import svgData from '@/assets/data/svg.js'
import ImageContainer from '@/components/ImageContainer/Main.vue'
import SVGMarker from '@/components/SVGMarker/Main.vue'
import ImageMarker from './ImageMarker.vue'
import DeviceInfo from './DeviceInfo.vue'
import LiveData from './LiveData.vue'
import { getAllEquipment } from '@/service/definingData'
import { belongsTo } from '../../store/bindPositions'
// 命名空间名称
let namespaceName = 'bindPositions'
export default {
  components: {
    ImageList,
    ImageContainer,
    'svg-marker': SVGMarker,
    ImageMarker,
    DeviceInfo,
    LiveData
  },
  data () {
    return {
      svgData,
      drawerTitle: '设备配置信息',
      // drawerVisible: false,   
      childDrawerTitle: '设备数据',
      liveShow: false,
      liveSystem: {
        system: '',
        name: ''
      },
      sysList: [{
          value: '压风机监控系统',
          text: '压风机监控系统'
        },
        {
          value: '安全监控系统',
          text: '安全监控系统'
        }
      ],
      dataSource: [],
      allEquipmentData: {}
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
      return this.$store.getters[`${namespaceName}/getBaseBindedPositions`]
    },
    activeImg () {
      return this.$store.getters[`${namespaceName}/getActiveItem`]
    },
    drawerVisible () {
      return this.activeImg ? true : false
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 获取定义数据
      getAllEquipment()
        .then(res => {
          let data = res.data
          // 获取定义数据系统
          this.sysList = data.map(item => {
            return {text: item.key, value: item.key}
          })
          // 转换为对象
          this.allEquipmentData = data.reduce((result, item) => {
            result[item.key] = item.items
            return result
          }, {})
        })
        .catch(() => {
          this.$store.commit('showErrorMsg', '获取定义数据失败!')
        })
    },
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
      this.$store.dispatch(`${namespaceName}/addPosition`, Object.assign({rotate: 0, belongsTo: belongsTo.BINDPOSITIONS}, nitem))
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
      this.dataSource = systemInfo ? this.allEquipmentData[systemInfo.text] : []
    },
    selectData (data) {
      if (data) {
        this.matchingData(data)
      }
      this.liveShow = false
    },
    matchingData(activeData) {
      let obj = {}
      let data = this.allEquipmentData[this.activeImg.bindSystem]
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
