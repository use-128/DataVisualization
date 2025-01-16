 // 初始化 ECharts 实例
var myChart5 = echarts.init(document.getElementById('chart5'));

// 动态加载 china.json 文件
fetch('china.json')
  .then(response => response.json()) // 解析 JSON 数据
  .then(data => {
      // 注册中国地图
      echarts.registerMap('china', data);

      // 配置项
      var option5 = {
          title: {
              text: '中国地区天气',
              left: "center",
              textStyle: {
                  color: "#fff",
                  textShadowColor: "#159AFF", // 设置阴影颜色
                  textShadowBlur: 9, // 阴影模糊程度
                  textShadowOffsetX: 0, // 阴影在X轴上的偏移
                  textShadowOffsetY: 0  // 阴影在Y轴上的偏移
              }
          },
          tooltip: {
              trigger: 'item',
              formatter: '{b}<br />{c}人'
          },
          visualMap: {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true
          },
          series: [
              {
                  type: 'map',
                  map: 'china', // 地图类型
                  roam: true, // 是否启用拖拽和缩放
                  label: {
                      show: true, // 是否显示省份标签
                      color: '#000'
                  },
                  data: [
                      { name: '北京', value: 300 },
                      { name: '上海', value: 400 },
                      { name: '广东', value: 500 },
                      // 你可以添加更多的数据项
                  ]
              }
          ]
      };

      // 使用刚定义的配置项和数据显示图表
      myChart5.setOption(option5);
  })
  .catch(error => console.error('加载中国地图数据失败:', error));