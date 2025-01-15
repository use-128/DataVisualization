var chartDom5 = document.getElementById('chart5');
var myChart5 = echarts.init(chartDom5);
var option5;

option5 = {
  title: {
    text: 'ECharts 入门示例',
    left: "center",
    textStyle: {
      color: "#fff"
    }
  },
  grid: {
    width: "70%",
    left: "center"
  },
  polar: {
    radius: [30, '80%']
  },
  radiusAxis: {
    max: 4
  },
  angleAxis: {
    type: 'category',
    data: ['a', 'b', 'c', 'd'],
    startAngle: 75
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [2, 1.2, 2.4, 3.6],
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  },
  animation: false
};

// 使用刚指定的配置项和数据显示图表。
myChart5.setOption(option5);

window.onresize = () => {
  myChart5.resize();
}

