import _ from 'lodash'

const translateSource = (source) => {
  const getValue = (source = [], data = []) => {
    return source.map(item => {
      let obj = data.find(v => v.name === item)
      return obj ? obj.value : 0
    })
  }

  const isMultiple = source.filter(item => Array.isArray(item.value)).length > 0
  const legendData = isMultiple ? source.map(item => item.name) : []
  const yAxisData = source.reduce((resaults, item) => {
    return isMultiple ?
      Array.from(new Set(resaults.concat(item.value.map(v => v.name)))) :
      resaults.concat(item.name)
  }, [])
  const series = isMultiple ?
    source.map(item => ({
      type: "bar",
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      name: item.name,
      data: getValue(yAxisData, item.value)
    })) :
    [{
      type: "bar",
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
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
  const data = translateSource(source)
  const {
    grid,
    color = []
  } = option

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
    xAxis: {
      type: 'value',
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    },
    yAxis: {
      type: 'category',
      data: data.yAxisData
    },
    series: data.series
  }
}