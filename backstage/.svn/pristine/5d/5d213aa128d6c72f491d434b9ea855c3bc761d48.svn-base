import _ from 'lodash'
import Base from './Base'
import Config from './Config'

class ChartCard extends Base {

  static DEFAULT = {
    cols: 24,
    height: 300,
    download: {
      icon: "el-icon-download",
      desc: "导出为图片",
      options: { pixelRatio: 3 }
    },
    charts: []
  }

  static CHARTS = {
    bar: "柱形图",
    line: "折线图",
    pie: "饼状图"
  }

  constructor({ config = {}, sources = {}, events = {} }) {
    super({ events, sources })
    this.download = _.get(config, "download", ChartCard.DEFAULT.download)
    this.cols = _.get(config, "cols", ChartCard.DEFAULT.cols)
    this.height = _.get(config, "height", ChartCard.DEFAULT.height)
    this.charts = _.get(config, "charts", ChartCard.DEFAULT.charts)
    this.title = _.get(config, "title")
    this.source = _.get(config, "source")
    let rawOption = Config.GetOptionsByStartKey(config, Config.RAWKEY.option)
    this.bar = _.merge({}, rawOption, _.get(config, "bar"))
    this.pie = _.merge({}, rawOption, _.get(config, "pie"))
    this.line = _.merge({}, rawOption, _.get(config, "line"))
  }
}

export default ChartCard