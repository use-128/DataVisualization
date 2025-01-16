// 初始化 ECharts 实例
var myChart5 = echarts.init(document.getElementById('chart5'));

// 动态加载 china.json 文件
fetch('hunan.json')
    .then(response => response.json()) // 解析 JSON 数据
    .then(data => {
        // 注册中国地图
        echarts.registerMap('hunan', data);

        // // 配置项
        // var option5 = {
        //     title: {
        //         text: '中国地区天气',
        //         left: "center",
        //         textStyle: {
        //             color: "#fff",
        //             textShadowColor: "#159AFF", // 设置阴影颜色
        //             textShadowBlur: 9, // 阴影模糊程度
        //             textShadowOffsetX: 0, // 阴影在X轴上的偏移
        //             textShadowOffsetY: 0  // 阴影在Y轴上的偏移
        //         }
        //     },
        //     tooltip: {
        //         trigger: 'item',
        //         // formatter: '{b}<br />{c}人'
        //         formatter: function (params) {
        //             let name = params.name;
        //             let value = params.value || '无数据';
        //             let weather = '无数据';
        //             let min_tem = '无数据';
        //             let max_tem = '无数据';
        //             if (params.data && params.data.values) {
        //                 weather = params.data.values.weather || '无数据';
        //                 min_tem = params.data.values.min_tem || '无数据';
        //                 max_tem = params.data.values.max_tem || '无数据';
        //             }
        //             return `地区: ${name}<br />
        //         温度: ${value} ℃<br />
        //         天气: ${weather}<br />
        //         气温区间: ${min_tem} - ${max_tem} ℃`;
        //         }
        //     },
        //     visualMap: {
        //         min: -6,
        //         max: 40,
        //         left: 'left',
        //         top: 'bottom',
        //         text: ['高', '低'],
        //         calculable: true,
        //         inRange: {
        //             color: [
        //                 '#313695',
        //                 '#4575b4',
        //                 '#74add1',
        //                 '#f46d43',
        //                 '#d73027',
        //                 '#a50027'
        //             ]
        //         }
        //     },
        //     series: [
        //         {
        //             type: 'map',
        //             map: 'hunan', // 地图类型
        //             roam: true, // 是否启用拖拽和缩放
        //             label: {
        //                 show: true, // 是否显示省份标签
        //                 color: '#000'
        //             },
        //             data: [
        //                 {
        //                     name: '长沙',
        //                     value: 25,
        //                     values: {
        //                         'weather': '晴',
        //                         'max_tem': 12,
        //                         'min_tem': 5,
        //                     }
        //                 },
        //             ]
        //         }
        //     ]
        // };

        // // 使用刚定义的配置项和数据显示图表
        // myChart5.setOption(option5);
    })
    .catch(error => console.error('加载中国地图数据失败:', error));


axios.get('http://localhost:5000/api/weather_data')
    .then(response => {
        // 配置项
        var option5 = {
            title: {
                text: '湖南地区天气',
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
                // formatter: '{b}<br />{c}人'
                formatter: function (params) {
                    let name = params.name;
                    let value = params.value || '无数据';
                    let weather = '无数据';
                    let min_tem = '无数据';
                    let max_tem = '无数据';
                    if (params.data && params.data.values) {
                        weather = params.data.values.weather || '无数据';
                        min_tem = params.data.values.min_tem || '无数据';
                        max_tem = params.data.values.max_tem || '无数据';
                    }
                    return `地区: ${name}<br />
                温度: ${value} ℃<br />
                天气: ${weather}<br />
                气温区间: ${min_tem} - ${max_tem} ℃`;
                }
            },
            visualMap: {
                min: -6,
                max: 40,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                calculable: true,
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#f46d43',
                        '#d73027',
                        '#a50027'
                    ]
                }
            },
            series: [
                {
                    type: 'map',
                    map: 'hunan', // 地图类型
                    roam: true, // 是否启用拖拽和缩放
                    label: {
                        show: true, // 是否显示省份标签
                        color: '#000'
                    },
                    data: response.data
                }
            ]
        };

        // 使用刚定义的配置项和数据显示图表
        myChart5.setOption(option5);
    })
    .catch(error => console.error('Error:', error)); // 处理请求错误