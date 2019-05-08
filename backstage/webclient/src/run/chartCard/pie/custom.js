export default function (option, source) {
  const { minValue = 0, maxValue = 500, color = '#F56C6C' } = option

  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    visualMap: {
      show: false,
      min: minValue,
      max: maxValue,
      inRange: {
        color: color,
        colorLightness: [0, 1]
      }
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      labeLine: {
        normal: { show: true }
      },
      radius: '55%',
      center: ['50%', '50%'],
      data: source.sort(function (a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(0, 0, 0, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531'
          // shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  }
}