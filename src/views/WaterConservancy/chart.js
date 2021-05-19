// 水文信息
export function waterChartData($echarts, data) {
  return {
    title: {
      text: "实时水文信息",
      x: '4%',
      y: '1%',
      textStyle: {
        fontSize: 56,
        color: '#ff8814',
        fontWeight: 'normal',
      },
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '8%'
    },
    legend: {
      data: ['长江', '嘉陵江'],
      right: '5%',
      top: '4%',
      textStyle: {
        fontSize: 30,//字体大小
        color: '#ff8814'//字体颜色
      },
    },
    xAxis: {
      type: 'category',
      axisTick: { //X轴刻度线
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#2e244f', // 颜色
          width: 5 // 粗细
        }
      },
      axisLabel: {
        interval: function () { return false },
        textStyle: {
          color: '#fff',
          fontSize: '36'
        }
      },
      data: data[0].times
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisTick: { //y轴刻度线
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#2e244f', // 颜色
          width: 5 // 粗细
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'line',
        name: '长江',
        data: data[0].datas,
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        lineStyle: {
          width: 5,
          color: '#8B20AB'
        },
        symbol: 'none',     //取消实心点
        areaStyle: {
          normal: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(33,58,109,0.5)'
            },
            {
              offset: 1,
              color: 'rgba(33,58,109,0)'
            }
            ], false),
            shadowColor: 'rgba(33,58,109, 0.9)',
            shadowBlur: 20
          }
        },
      },
      {
        type: 'line',
        name: '嘉陵江',
        data: data[1].datas,
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        lineStyle: {
          width: 5,
          color: '#4842AF'
        },
        symbol: 'none',     //取消实心点
        areaStyle: {
          normal: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(33,58,109,0.5)'
            },
            {
              offset: 1,
              color: 'rgba(33,58,109,0)'
            }
            ], false),
            shadowColor: 'rgba(33,58,109, 0.9)',
            shadowBlur: 20
          }
        },
      }
    ]
  }
}
