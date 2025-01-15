// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('chart1'));

// 请求后端数据
axios.get('http://localhost:5000/api/bar_data') // 这里的'/api/data'是后端API的端点
    .then(response => {
        // 指定图表的配置项和数据
        // console.log(response.data);
        var option1 = {
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
            tooltip: {},
            xAxis: {
                data: response.data.categories // 假设后端返回的数据中有一个名为'categories'的数组
                // data: ['categories', 'categories', 'categories', 'categories', 'categories']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: response.data.sales // 假设后端返回的数据中有一个名为'sales'的数组
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
    })
    .catch(error => console.error('Error:', error)); // 处理请求错误