<template>
  <div style="display:none;">
    <slot></slot>
  </div>
</template>

<script>
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import { Icon, Style } from 'ol/style.js'
export default {
  name: 'OMarker',
  inject: {
    mapCtx: {
      default () {
        return null
      }
    },
    vectorCtx: {
      default () {
        return null
      }
    }
  },
  props: {
    markerInfo: {
      type: Object,
      default: () => {
        return {
          name: 'icon',
          position: [0, 0],
          icon: {
            src: '/images/icon_default.png',
            size: [36, 36],
            anchor: [0.5, 0.5],
            scale: 1
          }
        }
      }
    }
  },
  computed: {
    vectorSource () {
      return this.vectorCtx && this.vectorCtx.source
    },
    iconFeature () {
      return new Feature({
        geometry: new Point(this.markerInfo.position),
        name: this.markerInfo.name
      })
    },
    iconStyle () {
      return new Style({
        image: new Icon({
          anchor: this.markerInfo.icon.anchor,
          src: this.markerInfo.icon.src,
          scale: this.markerInfo.icon.scale,
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels'
        })
      })
    }
  },
  watch: {
    vectorSource (val) {
      if (val) {
        this.addFeature()
      }
    }
  },
  mounted () {
    this.addFeature()
  },
  destroyed () {
    if (this.vectorSource) {
      this.vectorSource.removeFeature(this.iconFeature)
    }
  },
  methods: {
    addFeature () {
      this.iconFeature.setStyle(this.iconStyle)
      if (this.vectorSource) {
        // 移除通过draw绘制的点feature
        if (this.markerInfo.pointFeature && this.vectorSource.getFeatures().find(item => item == this.markerInfo.pointFeature)) this.vectorSource.removeFeature(this.markerInfo.pointFeature)
        // 移除与绘制点相同的feature
        if (this.vectorSource.getFeatures().find(item => item == this.iconFeature)) this.vectorSource.removeFeature(this.iconFeature)
        this.vectorSource.addFeature(this.iconFeature)
      }
    }
  },
}
</script>

<style>
</style>
