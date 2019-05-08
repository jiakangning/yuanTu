import _ from 'lodash'

const translateSource = (source, option) => {
  const  { hasLable = true } = option

  const getValue = (source = [], data = []) => {
    return source.map(item => {
      let obj = data.find(v => v.name === item)
      return obj ? obj.value : 0
    })
  }
  const isMultiple = source.filter(item => Array.isArray(item.value)).length > 0
  const legendData = isMultiple ? source.map(item => item.name) : []
  const yAxisData = source.reduce((results, item) => {
    return isMultiple ?
      Array.from(new Set(results.concat(item.value.map(v => v.name)))) :
      results.concat(item.name)
  }, [])
  yAxisData.reverse()
  const series = isMultiple ?
    source.map(item => ({
      type: "bar",
      name: item.name,
      label: hasLable ? {
        show: true,
        position: 'insideRight'
      } : null,
      data: getValue(yAxisData, item.value)
    })) :
    [{
      type: "bar",
      label: hasLable ? {
        show: true,
        position: 'insideRight'
      } : null,
      data: getValue(yAxisData, source)
    }]
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
  const data = translateSource(source, option)
  const {
    xAxisName,
    yAxisName,
    color = [],
    grid = {}
  } = option
  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: _.merge(GRID_DEFAULT, grid),
    legend: {
      data: data.legendData,
      top: "25",
      align: 'right'
    },
    xAxis: [{
      name: xAxisName,
      type: 'value',
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    }],
    yAxis: [{
      name: yAxisName,
      nameLocation: 'end',
      type: 'category',
      data: data.yAxisData,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0
      }
    }],
    series: data.series
  }
}