<template>
  <div class="map">
    <div class="mouse-position" ref="mousePosition"></div>
    <slot />
  </div>
</template>
<script>
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { getCenter } from 'ol/extent.js'
import ImageLayer from 'ol/layer/Image.js'
import Projection from 'ol/proj/Projection.js'
import Static from 'ol/source/ImageStatic.js'
import { defaults as defaultControls } from 'ol/control'
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate'
export default {
  props: {
    backgroundImg: {
      type: String,
      default: '/images/mdl_map_1920X1080.png'
    },
    extent: {
      type: Array,
      default: () => [0, 0, 1920, 1080]
    },
    initialZoom: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.initMap()
  },
  provide () {
    return {
      mapCtx: this
    }
  },
  methods: {
    initMap () {
      var projection = new Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: this.extent
      })

      this.map = new Map({
        controls: this.getControls(),
        layers: [
          new ImageLayer({
            source: new Static({
              // attributions: '© <a href="###">Copyright YT</a>',
              url: this.backgroundImg,
              projection: projection,
              imageExtent: this.extent
            })
          })
        ],
        target: this.$el,
        view: new View({
          projection: projection,
          center: getCenter(this.extent),
          zoom: this.initialZoom,
          maxZoom: 5
        })
      })
    },
    getControls () {
      // 坐标
      var mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'xkcd-image',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: "custom-mouse-position",
        target: this.$refs.mousePosition,
        undefinedHTML: "&nbsp;"
      })
      return defaultControls({ attributionOptions: { collapsible: false } })
        .extend([mousePositionControl])
    }
  }
}
</script>
<style lang="less" scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
.mouse-position {
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: #fff;
  z-index: 1;
  font-size: 12px;
}
</style>
