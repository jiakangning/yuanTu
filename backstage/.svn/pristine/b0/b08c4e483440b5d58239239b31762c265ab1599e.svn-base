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
  const xAxisData = source.reduce((results, item) => {
    return isMultiple ?
      Array.from(new Set(results.concat(item.value.map(v => v.name)))) :
      results.concat(item.name)
  }, [])
  const series = isMultiple ?
    source.map(item => ({
      type: "bar",
      name: item.name,
      label: hasLable ? {
        show: true,
        position: 'insideTop'
      } : null,
      data: getValue(xAxisData, item.value)
    })) :
    [{
      type: "bar",
      label: hasLable ? {
        show: true,
        position: 'insideTop'
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
    color = [],
    hasDataZoom = false
  } = option
  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: "8%",
      right: "10%",
      top: "50",
      bottom: "60"
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
    dataZoom: hasDataZoom ? [{
      type: 'slider',
      rangeMode: ['value', 'percent'],
      start: 0,
      end: 50
    }, {
      start: 0,
      end: 10,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }] : null,
    series: data.series
  }
}