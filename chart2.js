var chartDom2 = document.getElementById('chart2');
var myChart2 = echarts.init(chartDom2);
var option2;

// const data = [];
// for (let i = 0; i < 5; ++i) {
//   data.push(Math.round(Math.random() * 200));
// }
// console.log(data);
option2 = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // only the largest 3 bars will be displayed
  },
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
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: [],
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

axios.get('http://localhost:5000/api/line_bar_data')
  .then(response => {
    console.log(response.data);
    const data = response.data;
    // option2.series[0].data = data;
    option2.yAxis.data = response.data.categories;
    option2.yAxis.max = response.data.categories.length - 1;
    option2.series[0].data = response.data.values;
    console.log(option2.series);
    myChart2.setOption(option2);
  })
  .catch(error => {
    console.log(error);
  });

function run() {
  for (var i = 0; i < option2.yAxis.max + 1; ++i) {
    if (Math.random() > 0.9) {
      option2.series[0].data[i] += Math.round(Math.random() * 2000);
    } else {
      option2.series[0].data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart2.setOption({
    series: [
      {
        type: 'bar',
        data: option2.series[0].data
      }
    ]
  });
}
setTimeout(function () {
  run();
}, 0);
setInterval(function () {
  run();
}, 8000);




// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

window.onresize = () => {
  myChart2.resize();
}

