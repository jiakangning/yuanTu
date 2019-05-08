<template>
  <div class="olBindMap">
    <div class="left">
      <image-list
        :data="imgData"
        :activeImg="activeImg"
        @svgClick="itemClick"
      ></image-list>
    </div>
    <image-map>
      <VectorLayer :activeIcon="activeImg" drawType="Point" @drawend="drawend">
        <OpMarker
          v-for="(marker, index) in markerList"
          :key="index"
          :markerInfo="marker"
        />
      </VectorLayer>
    </image-map>
  </div>
</template>

<script>
import ImageMap from '@/components/ImageMap/Map'
import ImageList from './ImageList.vue'
import VectorLayer from '@/components/ImageMap/VectorLayer'
import OpMarker from '@/components/ImageMap/Marker'

import SvgData from '@/assets/data/svg.js'
export default {
  name: 'mapContainer',
  components: {
    ImageMap,
    VectorLayer,
    OpMarker,
    ImageList
  },
  data () {
    return {
      imgData: [],
      activeImg: null,
      markerList: [
        // { name: '1', position: [500, 500], icon: { src: '/images/icon_default.png', size: [36, 36] } },
        // { name: '1', position: [400, 600], icon: { src: '/images/icon_highlight.png', size: [36, 36] } }
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.imgData = SvgData
    },
    itemClick (item) {
      // imgSrc 为显示图片的url, 用于列表显示
      // svgSrc 为svg的url
      this.activeImg = {
        src: item.imgSrc,
        anchor: [0.5, 30]
      }
    },
    drawend (event) {
      this.markerList = [].concat(this.markerList, [{
        position: event.feature.values_.geometry.flatCoordinates,
        name: '',
        type: event.target.type_,
        icon: this.activeImg,
        source: event.target.source_,
        pointFeature: event.feature
      }])
    }
  },
  watch: {
    // markerList (value) {
      
    // }
  },
}
</script>

<style lang="less">
.olBindMap {
  display: flex;
  text-align: center;
  height: 100%;
  div.left {
    width: 210px;
    border: 1px solid #ccc;
  }
}
</style>