// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('chart1'));

// 请求后端数据
axios.get('http://localhost:5000/api/bar_data')
.then(response => {
    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: 'ECharts 入门示例',
            left: "center",
            textStyle: {
                color: "#fff",
                textShadowColor: "#159AFF",
                textShadowBlur: 5,
                textShadowOffsetX: 2,
                textShadowOffsetY: 2
            }
        },
        grid: {
            width: "70%",
            left: "center"
        },
        tooltip: {},
        xAxis: {
            data: response.data.categories
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: response.data.sales
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
})
.catch(error => console.error('Error:', error)); // 处理请求错误