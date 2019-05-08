import _ from 'lodash'

export default function (option, source) {
  const {
    grid,
    hasLimit = false,
    minLimit = 50,
    maxLimit = 600
  } = option
  return {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    grid: _.merge({
      left: '5%',
      right: '5%'
    }, grid),
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    },
    series: [{
      name: '模拟数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: source,
      markLine: hasLimit || (minLimit && maxLimit) ? {
        data: [{
          name: '报警下限值',
          yAxis: minLimit,
          lineStyle: {
            normal: {
              color: 'rgb(255,51,51)'
            }
          }
        }, {
          name: '报警下限值',
          yAxis: maxLimit,
          lineStyle: {
            normal: {
              color: 'rgb(255,51,51)'
            }
          }
        }],
      } : null
    }]
  }
}