const translateSource = (source) => {
  const isMultiple = source.filter(item => Array.isArray(item.value)).length > 0
  const legendData = source.map(item => item.name)
  const seriesData = source.map(item => {
    let value = isMultiple
      ? item.value.reduce((results, item) => {
        results += item.value || 0
        return results
      }, 0)
      : item.value
    return {
      name: item.name,
      value: value
    }
  })
  return {
    legendData,
    seriesData
  }
}

export default function (option, source) {
  const { color = [], serieName, hasLegend = false } = option
  const data = translateSource(source)
  return {
    color: color,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: hasLegend ? {
      orient: 'vertical',
      top: '10',
      right: '10',
      align: 'right',
      data: data.legendData
    } : null,
    series: [
      {
        name: serieName,
        type: 'pie',
        radius: '55%',
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: data.seriesData
      }
    ]
  }
}
