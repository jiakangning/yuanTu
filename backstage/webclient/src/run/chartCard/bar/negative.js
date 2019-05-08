import _ from 'lodash'

const translateSource = (source) => {
  const getValue = (source = [], data = []) => {
    return source.map(item => {
      let obj = data.find(v => v.name === item)
      return obj ? (obj.value < 0 ? {value: obj.value, label: {normal:{position: 'left'}}} : obj.value ) : 0
    })
  }

  const isMultiple = source.filter(item => Array.isArray(item.value)).length > 0
  const legendData = isMultiple ? source.map(item => item.name) : []
  const yAxisData = source.reduce((results, item) => {
    return isMultiple
      ? Array.from(new Set(results.concat(item.value.map(v => v.name))))
      : results.concat(item.name)
  }, [])
  const series = isMultiple
    ? source.map(item => ({ type: "bar", label: { normal: { show: true, position: 'inside' } }, name: item.name, data: getValue(yAxisData, item.value) }))
    : [{ type: "bar", label: { normal: { show: true, position: 'inside' } }, data: getValue(yAxisData, source) }]
  return {
    legendData,
    yAxisData,
    series
  }
}

const GRID_DEFAULT = {
  left: '8%',
  right: '8%',
  top: '70',
  bottom: '50'
}

export default function (option, source) {
  const data = translateSource(source)
  const { grid = {}, color = [] } = option

  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
    },
    legend: {
        data: data.legendData,
        top: '25'
    },
    grid: _.merge(GRID_DEFAULT, grid),
    xAxis: [
      {
        type: 'value',
        axisLine: {
          symbol: ['arrow', 'arrow'],
          symbolSize: [5, 5]
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: data.yAxisData
      }
    ],
    
    series: data.series
  }
}