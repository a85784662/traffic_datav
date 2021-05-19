// 分隔线渐变柱状图
export function barStyleOneChartData(aData) {
  let maxArry = []
  aData.counts.forEach(item => {
    item
    maxArry.push(aData.max)
  })
  return {
    title: {
      text: aData.title,
      x: '3%',
      y: '1%',
      textStyle: {
        color: '#ffffff',  //更改坐标轴文字颜色
        fontSize: 56,      //更改坐标轴文字大小
        fontWeight: 'normal'

      }

    },
    grid: {
      left: '9%',
      right: '4%',
      bottom: '8%',
      top: '14%'
    },
    tooltip: {
      trigger: "item",
      textStyle: {
        fontSize: 40
      },
      formatter: function (params) {
        return params.name + '<br/>' + '值: ' + params.value
      }
    },
    xAxis: {
      data: aData.names,
      "axisTick": {       //x轴刻度线
        "show": false
      },
      "splitLine": {     //网格线
        "show": false
      },
      "axisLine": {
        "lineStyle": {
          color: '#2e244f',
          width: 5
        }
      },
      "axisLabel": {
        show: false // 隐藏X轴文字
      },

    },
    yAxis: {
      type: "value",
      max: aData.max,
      min: 0,
      "axisTick": {       //y轴刻度线
        "show": false
      },
      "splitLine": {     //网格线
        "show": false
      },
      "axisLine": {
        "lineStyle": {
          color: '#2e244f',
          width: 5
        }
      },
      "axisLabel": {
        show: true,
        textStyle: {
          color: '#ffffff',  //更改坐标轴文字颜色
          fontSize: 36      //更改坐标轴文字大小
        }
      },
    },
    series: [
      {
        // 内
        type: "bar",
        barGap: '-100%',
        barWidth: 18,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: '#222244'
          }
        },
        data: maxArry,
        z: 1,
        animationEasing: "elasticOut"
      },
      {
        // 外
        type: "bar",
        barWidth: 18,
        legendHoverLink: false,
        silent: true,
        stack: "1",
        itemStyle: {
          normal: {
            color: function () {
              var color;
              color = {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: "#f85b23" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff26d" // 100% 处的颜色
                }
                ]
              }

              return color;
            },
          }
        },
        data: aData.counts,
        z: 1,
        animationEasing: "elasticOut"
      },
      {
        // 分隔块
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#07091b"
          }
        },
        symbolRepeat: "fixed",
        symbolMargin: 6,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [18, 2],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        // symbolBoundingData: this.total,
        data: maxArry,
        z: 2,
        animationEasing: "elasticOut"
      }


    ]
  }
}


// （柱状宽度更窄）分隔线渐变柱状图
export function barStyleOneChartData2(aData) {
  let maxArry = []
  aData.counts.forEach(item => {
    item
    maxArry.push(aData.max)
  })
  return {
    title: {
      text: aData.title,
      x: '3%',
      y: '1%',
      textStyle: {
        color: '#ffffff',  //更改坐标轴文字颜色
        fontSize: 56,      //更改坐标轴文字大小
        fontWeight: 'normal'
      }

    },
    grid: {
      left: '9%',
      right: '4%',
      bottom: '8%',
      top: '14%'
    },
    // tooltip: {
    //   trigger: "item",
    //   formatter: function (params) {
    //     return  params.name
    //   }
    // },
    tooltip: {
      textStyle: {
        fontSize: 40
      },
      formatter: function (params) {
        return params.name + '<br/>' + '值: ' + params.value
      }
    },
    xAxis: {
      data: aData.names,
      "axisTick": {       //y轴刻度线
        "show": false
      },
      "splitLine": {     //网格线
        "show": false
      },
      "axisLine": {
        "lineStyle": {
          color: '#2e244f',
          width: 5
        }
      },
      "axisLabel": {
        show: false, // 隐藏X轴文字
        textStyle: {
          color: '#ffffff',  //更改坐标轴文字颜色
          fontSize: 36      //更改坐标轴文字大小
        }
      },
    },
    yAxis: {
      type: "value",
      max: aData.max,
      min: 0,
      "axisTick": {       //y轴刻度线
        "show": false
      },
      "splitLine": {     //网格线
        "show": false
      },
      "axisLine": {
        "lineStyle": {
          color: '#2e244f',
          width: 5
        }
      },
      "axisLabel": {
        show: true,
        textStyle: {
          color: '#ffffff',  //更改坐标轴文字颜色
          fontSize: 36      //更改坐标轴文字大小
        }
      },
    },
    series: [
      {
        // 内
        type: "bar",
        barGap: '-100%',
        barWidth: 1,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: '#222244'
          }
        },
        data: maxArry,
        z: 1,
        animationEasing: "elasticOut"
      },
      {
        // 外
        type: "bar",
        barWidth: 1,
        legendHoverLink: false,
        silent: true,
        stack: "1",
        itemStyle: {
          normal: {
            color: function () {
              var color;
              color = {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: "#f85b23" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff26d" // 100% 处的颜色
                }
                ]
              }

              return color;
            },
          }
        },
        data: aData.counts,
        z: 1,
        animationEasing: "elasticOut"
      },
      {
        // 分隔块
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#07091b"
          }
        },
        symbolRepeat: "fixed",
        symbolMargin: 6,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [18, 2],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        // symbolBoundingData: this.total,
        data: maxArry,
        z: 2,
        animationEasing: "elasticOut"
      }


    ]
  }
}


// 基础饼图
export function pieStyleOneChartData(data) {
  return {
    title: {
      text: data.title,
      x: '3%',
      y: '1%',
      textStyle: {
        fontSize: 56,
        color: '#fff',
        fontWeight: 'normal'
      },
    },
    color: ['#fc8832', '#1c59be', '#1fbe84', '#6d3c9a'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        labelLine: {
          normal: {
            length: 60,
            lineStyle: {
              width: 3
            }
          }
        },
        data: data.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 30
            }
          }
        }
      }
    ]
  };
}

// 渐变折线区域图
export function waterChartData($echarts, data) {
  return {
    title: {
      text: data.title,
      x: '3%',
      y: '1%',
      textStyle: {
        fontSize: 56,
        color: '#fff',
        fontWeight: 'normal'
      },
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '8%'
    },
    tooltip: {
      trigger: "item",
      textStyle: {
        fontSize: 40
      },
      formatter: function (params) {
        return params.name + '<br/>' + '值: ' + params.value
      }
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
      data: data.dates
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
        data: data.msg,
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        lineStyle: {
          width: 5,
          color: '#5193ff'
        },
        symbol: 'circle',     //设定为实心点
        symbolSize: 12,   //设定实心点的大小
        itemStyle: {
          color: "#ff8814"
        },
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

