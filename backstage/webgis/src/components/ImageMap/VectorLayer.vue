<template>
  <div style="display: none;">
    <slot></slot>
  </div>
</template>

<script>
import { Style, Fill, Stroke, Icon, Circle } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Draw, Modify, Snap } from 'ol/interaction.js'
import { createBox, createRegularPolygon } from 'ol/interaction/Draw'
export default {
  name: "VectorLayer",
  props: {
    /**
     * 默认图层样式
     */
    activeIcon: {
      type: [Object, Function],
      default () {
        return {
          src: '',
          size: []
        }
      }
    },
    /**
     * 是否启用编辑
     */
    editable: {
      type: Boolean,
      default () {
        return false
      }
    },
    /**
     * 绘制类型 Box/Square/Polygon/Point/Circle/LineString
     */
    drawType: {
      type: String
    }
  },
  data () {
    return {
      source: null,
      vector: null
    }
  },
  mounted () {
    // this.addVectorLayer()
  },
  provide () {
    return {
      vectorCtx: this
    }
  },
  inject: {
    mapCtx: {
      default () {
        return null
      }
    }
  },
  watch: {
    activeIcon: {
      handler: function (value) {
        this.removeInterations()
        if (value) {
          this.addInterations()
        }
      },
      deep: true
    },
    map (value) {
      if (value) {
        this.addVectorLayer()
      }
    },
    editable (value) {
      if (value) {
        this.addInterations()
      } else {
        this.removeInterations()
      }
    },
  },
  computed: {
    map () {
      return this.mapCtx && this.mapCtx.map
    },
    styles () {
      if (this.activeIcon) {
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new Icon({
            crossOrigin: 'anonymous',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: this.activeIcon.src
          })
        })
      } else {
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        })
      }
    }
  },
  methods: {
    // 添加图层
    addVectorLayer () {
      let map = this.map
      if (map && !this.source) {
        this.source = new VectorSource()
        this.vector = new VectorLayer({
          source: this.source,
          style: this.styles
        })
        map.addLayer(this.vector)
        // 是否可编辑
        if (this.editable) {
          let modify = this.modify = new Modify({ source: this.source })
          map.addInteraction(modify)
          this.addInterations()
        }
      }
    },
    removeInterations () {
      let map = this.map
      if (map && this.draw) {
        map.removeInteraction(this.draw)
        map.removeInteraction(this.snap)
      }
    },
    addInterations () {
      if (!this.map) {
        return
      }
      // 方框
      if (['Box', 'Square'].indexOf(this.drawType) >= 0) {
        let geometryFunction = {
          Box: createBox(),
          Square: createRegularPolygon(4)
        }
        this.draw = new Draw({
          source: this.source,
          type: 'Circle',
          geometryFunction: geometryFunction[this.drawType],
          stopClick: true
        })
      } else {
        this.draw = new Draw({
          source: this.source,
          type: this.drawType
        })
      }
      this.map.addInteraction(this.draw)
      let snap = new Snap({ source: this.source })
      this.map.addInteraction(snap)
      this.draw.on('drawend', (event) => {
        this.map.removeInteraction(this.draw)
        this.$emit('drawend', event)
      })
    }
  },
  beforeDestroy () {
    let map = this.map
    if (map) {
      this.removeInterations()
      map.removeLayer(this.vector)
    }
  }
}
</script>

<style scoped>
</style>
