<template>
  <div class="content" @contextmenu.prevent>
    <image-container>
      <vue-draggable-resizable
        v-for="(item, index) in bindedPositions"
        :x="item.x"
        :y="item.y"
        :w="item.width"
        :h="item.height"
        :key="index"
        :bindData="item"
        :draggable="false"
        :resizable="false"
        :style="{ transform: 'rotate(' + item.rotate + 'deg)' }"
        v-contextmenu:contextmenu
      >
        <svg-marker v-if="item.type === 'svg'" :data="item"></svg-marker>
        <ImageMarker v-else-if="item.type === 'img'" :data="item" />
      </vue-draggable-resizable>
    </image-container>
    <!-- 右键菜单 -->
    <v-contextmenu
      ref="contextmenu"
      :autoPlacement="true"
      @contextmenu="rightClick"
    >
      <!-- <template v-if="selectType==='svg'">
        
      </template> -->
      <!-- <v-contextmenu-item @click="onMenuClick('details')"
        >详细信息</v-contextmenu-item
      >
      <v-contextmenu-item @click="onMenuClick('real')"
        >实时曲线</v-contextmenu-item
      > -->
      <v-contextmenu-item @click="onMenuClick('history')"
        >历史曲线</v-contextmenu-item
      >
    </v-contextmenu>
    <!-- 弹框 -->
    <Dialog
      v-if="showDialog"
      :title="dialogTitle"
      :width="dialogWidth"
      :data="selectInfo"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu)

import ImageContainer from './ImageContainer.vue'
import SVGMarker from '@/components/SVGMarker/Main.vue'
import ImageMarker from '../bindPositions/ImageMarker.vue'
import Dialog from './Dialog.vue'

export default {
  components: {
    ImageContainer,
    'svg-marker': SVGMarker,
    ImageMarker,
    Dialog
  },
  data () {
    return {
      selectInfo: null,
      showDialog: false,
      dialogTitle: '',
      dialogWidth: '520px'
    }
  },
  computed: {
    // 绑定数据
    bindedPositions () {
      return this.$store.state.bindPositions.bindedPositions
    }
  },
  mounted () {
    if(!this.bindedPositions || this.bindedPositions.length === 0) {
      this.$store.dispatch('bindPositions/initPositions')
    }
  },
  methods: {
    onMenuClick (type) {
      if (type === 'details') {
        this.dialogTitle = this.selectInfo.name + '详细信息'
      } else if (type === 'history') {
        this.dialogTitle = this.selectInfo.name + '历史曲线'
      } else if (type === 'real') {
        this.dialogTitle = this.selectInfo.name + '实时曲线'
      }
      this.dialogWidth = '1080px'
      this.showDialog = true
    },
    rightClick (vNode) {
      this.selectInfo = this.bindedPositions.find(item => item.bindGuid === vNode.data.attrs.bindData.bindGuid)
    },
    closeDialog () {
      this.showDialog = false
    }
  },
}
</script>

<style>
.vdr {
  border: 0px dashed #000;
}
</style>
