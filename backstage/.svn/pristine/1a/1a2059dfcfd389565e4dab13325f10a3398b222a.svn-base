<template>
  <div class="hello">
    <div class="container">
      <img src="/images/mdl_map_1920X1080.png" alt="">
      <vue-draggable-resizable>
        <img src="/images/svg/局扇_1.png" alt="" class="fit">
      </vue-draggable-resizable>
    </div>
    <!-- <div style="height: 600px;">
      <image-map>
        <vector-layer :editable="editable" :draw-type="drawType" @drawend="onDrawEnd"></vector-layer>
        <overlay :position="item.position" positioning="bottom-center" draggable v-for="(item, index) in overlays" :key="index">
          <img src="./../assets/logo.png" style="width: 50px; height: 50px;"/>
        </overlay>
      </image-map>
    </div> -->
    <!-- <a-checkbox :checked="editable" size="small" @change="toggleEditable">启用绘制</a-checkbox> -->
    <!-- Box/Square/Polygon/Point/Circle/LineString -->
    <!-- <a-select :defaultValue="drawType" @change="drawTypeChange">
      <a-select-option value="Box">Box</a-select-option>
      <a-select-option value="Square">Square</a-select-option>
      <a-select-option value="Point">Point</a-select-option>
      <a-select-option value="LineString">LineString</a-select-option>
      <a-select-option value="Polygon">Polygon</a-select-option>
    </a-select> -->
  </div>
</template>

<script>
  // import ImageMap from './../components/ImageMap/Map'
  // import VectorLayer from './../components/ImageMap/VectorLayer'
  // import Overlay from './../components/ImageMap/Overlay'
  // import svgImg from './../assets/采煤机_轮.svg'
  // import Style from 'ol/style/Style'
  // import Icon from 'ol/style/Icon'
  import Vue from 'vue'
  import VueDraggableResizable from 'vue-draggable-resizable'

  // optionally import default styles
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

  Vue.component('vue-draggable-resizable', VueDraggableResizable)
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    components: {
      // ImageMap,
      // VectorLayer,
      // Overlay
    },
    data () {
      return {
        editable: true,
        drawType: 'Point',

        overlays: []
      }
    },
    methods: {
      toggleEditable () {
        this.editable = !this.editable
      },
      drawTypeChange (value) {
        this.drawType = value
      },
      onDrawEnd (event) {
        let { feature } = event
        this.overlays.push({
          position: feature.getGeometry().getCoordinates()
        })
        // source.removeFeature(feature)
        // 设置feature
        // var svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+
        //   '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
        //   '<circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>';
        //
        // var mysvg = new Image();
        // mysvg.src = 'data:image/svg+xml,' + escape(svg);
        //
        // feature.setStyle(new Style({
        //   image: new Icon({
        //     img: mysvg,    // 设置Image对象
        //     imgSize: [30, 30]    // 及图标大小
        //   })
        // }));
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 600px;
    margin-bottom: 10px;
    border: 1px solid #cccccc;
    overflow: auto;
    position: relative;
    .fit {
      width: 100%;
      height: 100%;
    }
  }
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
