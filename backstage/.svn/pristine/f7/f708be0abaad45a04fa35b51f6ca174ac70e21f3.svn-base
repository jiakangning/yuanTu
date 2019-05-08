const translateSource = (source, option) => {
  const { hasMarkPoint = true } = option

  const getValue = (source = [], data = []) => {
    return source.map(item => {
      let obj = data.find(v => v.name === item)
      return obj ? obj.value : 0
    })
  }
  const isMultiple = source.filter(item => Array.isArray(item.value)).length > 0
  const legendData = isMultiple ? source.map(item => item.name) : []
  const xAxisData = source.reduce((results, item) => {
    return isMultiple ?
      Array.from(new Set(results.concat(item.value.map(v => v.name)))) :
      results.concat(item.name)
  }, [])
  const series = isMultiple ?
    source.map(item => ({
      type: "line",
      name: item.name,
      markPoint: hasMarkPoint ? {
        data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ]
      } : null,
      data: getValue(xAxisData, item.value)
    })) :
    [{
      type: "line",
      markPoint: hasMarkPoint ? {
        data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ]
      } : null,
      data: getValue(xAxisData, source)
    }]
  return {
    legendData,
    xAxisData,
    series
  }
}

export default function (option, source) {
  const data = translateSource(source, option)
  const {
    xAxisName,
    yAxisName,
    color = []
  } = option

  return {
    color: color,
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: "8%",
      right: "10%",
      top: "50",
      bottom: "50"
    },
    legend: {
      data: data.legendData,
      top: "12",
      align: 'right'
    },
    xAxis: [{
      name: xAxisName,
      nameLocation: 'end',
      type: 'category',
      data: data.xAxisData,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    }],
    yAxis: [{
      name: yAxisName,
      type: 'value',
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [5, 5]
      }
    }],
    series: data.series
  }
}