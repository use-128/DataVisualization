var chartDom3 = document.getElementById('chart3');
var myChart3 = echarts.init(chartDom3);
var option3;

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data3 = [Math.random() * 300];

// 生成较少的数据点，例如生成 1000 个点而非 20000 个
for (let i = 1; i < 1000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data3.push(Math.round((Math.random() - 0.5) * 20 + data3[i - 1]));
}

option3 = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    text: 'ECharts 入门示例',
    left: "center",
    textStyle: {
      color: "#fff"
    }
  },
  grid: {
    width: "66%",
    left: "center"
  },
  toolbox: {
    feature: {
      data3Zoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data3: date
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  data3Zoom: [
    {
      type: 'inside',
      start: 0,
      end: 10
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: [
    {
      name: 'Fake data3',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',  // 数据降采样
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data: data3
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart3.setOption(option3);

window.onresize = () => {
  myChart3.resize();
}

