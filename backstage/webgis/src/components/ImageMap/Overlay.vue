<template>
  <div @click="$emit('click')">
    <slot/>
  </div>
</template>
<script>
  import Overlay from 'ol/Overlay'
  import DragPan from 'ol/interaction/DragPan'
  export default {
    name: 'Overlay',
    data() {
      return {
        loaded: false,
        marker: null,
        markerPosition: this.position.concat([])
      }
    },
    props: {
      /**
       * 坐标
       */
      position: {
        type: [Array],
        required: true
      },
      /**
       * 布局，默认：top-left
       */
      positioning: {
        type: String,
        default: () => {
          return 'top-left'
        }
      },
      /**
       * 覆盖特偏移
       */
      offset: {
        type: Array,
        default: () => {
          return [0, 0]
        }
      },
      /**
       * 是否可拖放
       */
      draggable: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      /**
       * 阻止冒泡
       */
      stopEvent: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.init()
    },
    inject: {
      mapCtx: {
        default () {
          return null
        }
      }
    },
    watch: {
      parentMap() {
        this.addToMap()
      },
      /**
       * 坐标变换时重新设置
       */
      position (value) {
        this.markerPosition = value
        if (this.marker) {
          this.marker.setPosition(value)
        }
      }
    },
    computed: {
      parentMap() {
        return this.mapCtx && this.mapCtx.map
      }
    },
    methods: {
      init() {
        if (this.parentMap) {
          this.addToMap()
        }
      },
      addToMap() {
        if (!this.loaded) {
          var marker = (this.marker = new Overlay({
            position: this.markerPosition,
            positioning: this.positioning,
            element: this.$el,
            offset: this.offset,
            stopEvent: this.stopEvent
          }))
          this.parentMap.addOverlay(marker)
          if (this.draggable) {
            this.enableDrag()
          }
        }
        this.loaded = true
      },
      /**
       * @public
       * 获取坐标
       */
      getPosition() {
        return this.markerPosition
      },
      /**
       * @public
       * 启用拖放
       * @event drop 拖动完成事件 参数(marker,evt)
       */
      enableDrag() {
        var dragPan
        let map = this.parentMap
        let marker = this.marker
        let markerEl = this.$el
        let self = this
        map.getInteractions().forEach(function(interaction) {
          if (interaction instanceof DragPan) {
            dragPan = interaction
          }
        })

        markerEl.addEventListener("mousedown", function() {
          dragPan.setActive(false)
          marker.set("dragging", true)
        })

        map.on("pointermove", function(evt) {
          if (marker.get("dragging") === true) {
            marker.setPosition(evt.coordinate)
          }
        })

        map.on("pointerup", function(evt) {
          if (marker.get("dragging") === true) {
            dragPan.setActive(true)
            marker.set("dragging", false)
            self.markerPosition = evt.coordinate
            // drop放下事件
            self.$emit('drop', marker, evt)
          }
        })
      },
      /**
       * @public
       * @description
       * 定位为中心点
       */
      locateToCenter() {
        let map = this.parentMap
        let view = map.getView()
        view.animate({ center: this.markerPosition, duration: 1000 })
      },
      /**
       * @public
       * 定位到中心点并闪烁
       */
      centerAndFlash() {
        this.locateToCenter()
        setTimeout(this.flash, 1000)
      },
      /**
       * @public
       * 闪烁
       * @param {Number} timeout 闪烁时间，0不停止
       */
      flash(timeout = 1500) {
        let marker = this.$el
        let flashClass = ' animated flash' + (!timeout ? ' infinite' : '')
        if (marker.className.indexOf(flashClass) < 0) {
          marker.className = marker.className + flashClass
        }
        if (timeout) {
          setTimeout(this.stopFlash, timeout)
        }
      },
      /**
       * @public
       * 停止闪烁
       */
      stopFlash() {
        let marker = this.$el
        marker.className = marker.className
          .replace(/animated flash/g, "")
          .replace(/infinite/g, "")
      },
      /**
       * 刷新数据展示
       */
      refresh () {
        let marker = this.marker
        this.$nextTick(() => {
          marker && marker.setElement(this.$el)
        })
      }
    },
    /**
     * 组件销毁钩子
     */
    destroyed() {
      if (this.loaded && this.marker) {
        this.parentMap && this.parentMap.removeOverlay(this.marker)
      }
    }
  }
</script>
