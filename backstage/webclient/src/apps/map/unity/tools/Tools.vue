<template>
  <ul class="survey">
    <!-- 浏览工具 -->
    <li class="pane">
      <div class="pane_title">
        <i class="iconfont icon-browse"></i> 浏览方式
      </div>
      <div class="pane_body">
        <ul class="tools">
          <li v-for="item in viewTools" :key="item.name" @click="browseChange(item.name)" :class="{active: activeBrowse === item.name}">
            <i :class="item.icon"></i>{{item.text}}
          </li>
        </ul>
      </div>
    </li>
    <!-- 测绘工具 -->
    <li class="pane">
      <div class="pane_title">
        <i class="iconfont icon-crop"></i> 测量工具
      </div>
      <div class="pane_body">
        <ul class="tools">
          <li v-for="item in measureTools" :key="item.name" @click="measure(item.name)" :class="{active: activeTool === item.name}">
            <i :class="item.icon"></i>{{item.text}}
          </li>
        </ul>
      </div>
    </li>
    <!-- 空间分析 -->
    <li class="pane">
      <div class="pane_title">
        <i class="iconfont icon-kongjian"></i> 空间分析
      </div>
      <div class="pane_body">
        <ul class="tools">
          <li v-for="item in spaceTools" :key="item.name" @click="measure(item.name)" :class="{active: activeTool === item.name}">
            <i :class="item.icon"></i>{{item.text}}
          </li>
        </ul>
      </div>
    </li>
    <!-- 绘制工具 -->
    <li class="pane">
      <div class="pane_title">
        <i class="iconfont icon-edit"></i> 绘制工具
      </div>
      <div class="pane_body">
        <ul class="tools">
          <li v-for="item in drawTools" :key="item.name" @click="measure(item.name)" :class="{active: activeTool === item.name}">
            <i :class="item.icon"></i>{{item.text}}
          </li>
        </ul>
      </div>
    </li>
    <!-- 控制开关 -->
    <li class="pane">
      <div class="pane_title">
        <i class="iconfont icon-edit"></i> 控制工具
      </div>
      <div class="pane_body">
        <ul class="tools">
          <li v-for="item in controlTools" :key="item.name" @click="toggleBoundary(item.name)" :class="{active: activeControl === item.name}">
            <i :class="item.icon"></i>{{item.text}}
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      viewTools: [
        {name: 'Free', text: '自由浏览', icon: 'iconfont icon-third-browse'},
        {name: 'First', text: '步行浏览', icon: 'iconfont icon-first-browse'}
      ],
      measureTools: [
        {name: 'HDistanceTool', text: '水平距离', icon: 'iconfont icon-straighten'},
        {name: 'SDistanceTool', text: '直线距离', icon: 'iconfont icon-straighten'},
        {name: 'SpaceMeasureTool', text: '间距测量', icon: 'iconfont icon-straighten'},
        {name: 'VDistanceTool', text: '高度', icon: 'iconfont icon-straighten rotate90'},
        {name: 'AreaMeasureTool', text: '面积', icon: 'iconfont icon-mianji'}
      ],
      spaceTools: [
        {name: 'SectionAnalysisTool', text: '剖面分析', icon: 'iconfont icon-ditu'},
        {name: 'floodingTool', text: '水淹分析', icon: 'iconfont icon-fill'},
        {name: 'CoalQueryTool', text: '地层查询', icon: 'iconfont icon-chaxun'},
        {name: 'CoalHoleTool', text: '开窗分析', icon: 'iconfont icon-vector-rectangle'}
      ],
      drawTools: [
        {name: 'CircleTool', text: '圆形绘制', icon: 'iconfont icon-yuan'},
        {name: 'LineTool', text: '线绘制', icon: 'iconfont icon-line'},
        {name: 'PolygonTool', text: '多边形绘制', icon: 'iconfont icon-duobianxing'},
        {name: 'DrawTroughBeltTool', text: '皮带绘制', icon: 'iconfont icon-gistunnel'},
        {name: 'DrawAirDoorTool', text: '风门绘制', icon: 'iconfont icon-juejinji'},
        {name: 'addMarkTool', text: '添加标记', icon: 'iconfont icon-biaoji'}
      ],
      controlTools: [
        {name: 'BoundaryTool', text: '边界显隐', icon: 'iconfont icon-hide'}
      ]
    }
  },
  computed: {
    ...mapState({
      activeTool: state => state.unity.currentToolType,
      activeBrowse: state => state.unity.currentBrowserStyle,
      activeControl: state => state.unity.currnetControlSwitch
    })
  },
  methods: {
    measure(tool) {
      this.$store.dispatch('unity/changeCurrentTool', tool === this.activeTool ? '' : tool)
    },
    browseChange(type) {
      this.$store.dispatch('unity/changeBrowseStyle', type === this.activeBrowse ? '' : type)
    },
    toggleBoundary(type) {
      this.$store.dispatch('unity/changeControlSwitch', type === this.activeControl ? '' : type)
      
    }
  }
}
</script>

<style lang="less" scoped>
  .survey {
    width: 100%;
    height: 500px;
    overflow: auto;
    // 块
    li.pane {
      display: block;
      .pane_title {
        height: 40px;
        background: rgb(255, 255, 255);
        line-height: 40px;
        padding-left: 10px;
        font-size: 14px;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Pingfang SC", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
      }
      .pane_body {
        min-height: 60px;
        background: rgba(242, 242, 242, 1);
        ul.tools {
          width: 100%;
          li {
            width: 60px;
            text-align: center;
            height: 60px;
            display: inline-block;
            color: rgba(102, 102, 102, 1);
            font-size: 12px;
            cursor: pointer;
            i {
              font-size: 25px;
              color: rgba(102, 102, 102, 1);
              display: block;
              line-height: 30px;
              margin-top: 8px;
              &.rotate90 {
                transform: rotate(90deg);
              }
              &.rotate45 {
                transform: rotate(45deg);
              }
            }
          }
          li.active {
            color: #409EFF;
            & > i {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
</style>
