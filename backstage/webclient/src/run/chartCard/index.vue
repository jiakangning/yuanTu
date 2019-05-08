<template>
  <el-col :span="options.cols">
    <el-card class="run-chartCard">
      <div
        class="run-chartCard-header"
        slot="header">
        <span class="run-chartCard-title">
          {{ options.title }}
        </span>
        <span class="run-chartCard-btn">
          <el-tooltip
            v-if="currentChartList.length > 1"
            effect="dark"
            :content="currentSwitchText"
            placement="top">
            <i
              class="run-chartCard-icon el-icon-refresh"
              @click="onSwitch"/>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            placement="top"
            :content="currentDownload.desc"
            v-if="currentDownload">
            <i
              class="run-chartCard-icon"
              :class="currentDownload.icon"
              @click="onDownload"/>
          </el-tooltip>
        </span>
      </div>
      <div
        class="run-chartCard-content"
        ref="chart"
        :style="{ height: currentHeight }"/>
    </el-card>
  </el-col>
</template>

<script>
  import 'echarts/theme/macarons'
  import echarts from 'echarts/lib/echarts'
  import ChartCard from '../model/ChartCard'
  import getOption from './main.js'
  import throttle from '../common/throttle.js'

  export default {
    name: "run-chart-card",
    props: {
      options: {}
    },
    data() {
      return {
        chartObj: null,
        currentChart: null
      }
    },
    computed: {
      currentHeight() {
        return parseFloat(this.options.height) + 'px'
      },
      currentChartList() {
        return this.options.charts || []
      },
      currentSource() {
        let source = this.options.source
        return source ? this.options.getSources(this.options.source) : []
      },
      currentDownload() {
        return this.options.download
      },
      currentNextChart() {
        let next = this.currentChartList.indexOf(this.currentChart) + 1
        next = next >= this.currentChartList.length ? 0 : next
        return this.currentChartList[next]
      },
      currentSwitchText() {
        let text = ChartCard.CHARTS[this.currentNextChart]
        return `切换为${ text }`
      }
    },
    methods: {
      onSwitch() {
        this.currentChart = this.currentNextChart
      },
      onDownload() {
        let { options, click } = this.currentDownload
        let src = this.chartObj.getDataURL(options)
        if (click) {
          click.call(this, src)
        } else {
          let a = document.createElement('a')
          a.setAttribute("href", src)
          a.setAttribute("download", this.options.title)
          a.click()
        }
      },
      onResize() {
        this.chartObj && this.chartObj.resize()
      },
      onRender() {
        if (!this.chartObj) this.chartObj = echarts.init(this.$refs.chart, 'macarons')
        this.chartObj.clear()
        const option = getOption(this.currentChart, this.options[this.currentChart], [].concat(this.currentSource))
        this.chartObj.setOption(option)
      }
    },
    mounted() {
      this.currentChart = this.currentChartList[0]
      this.throttle = throttle(this.onResize, 200)
      window.addEventListener("resize", this.throttle)
    },
    watch: {
      currentChart() {
        this.onRender()
      },
      currentSource() {
        this.onRender()
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-chartCard
    margin-top: 20px

    .el-card__header
      padding: 8px 20px

    .el-card__body
      padding: 0

    &-header
      display: flex
      align-items: center
      justify-content: space-between
      padding: 2px 0

    &-title
      font-size: 14px
      color: #333333
      font-weight: bold

    &-icon
      font-size: 16px
      cursor: pointer
      font-weight: bold
      color: #c3c8ce

      + .run-chartCard-icon
        margin-left: 6px

      &:hover
        color: #666666

    &-content
      height: 300px
</style>
