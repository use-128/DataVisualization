const chartDom7 = document.getElementById('chart7');
const myChart7 = echarts.init(chartDom7);

// 创建一个 canvas 元素来用作地球的背景
const canvas = document.createElement('canvas');
const mapChart = echarts.init(canvas, null, {
    width: 2048,
    height: 1024
});

// 设置地图图层
mapChart.setOption({
    visualMap: {
        type: 'piecewise',
        show: false,
        pieces: [
            { gt: 300, color: '#FF4646', label: '极高风险' },
            { gt: 200, lte: 300, color: '#FF7500', label: '高风险' },
            { gt: 100, lte: 200, color: '#FFD300', label: '中风险' },
            { gte: 0, lte: 100, color: {
                type: 'radial', // 径向渐变
                x: 0.5, 
                y: 0.5, 
                r: 0.5,
                colorStops: [
                    { offset: 0, color: 'rgba(255,255,255,0.8)' }, // 0% 处的颜色
                    { offset: 1, color: 'rgba(86, 189, 255, 0.2)' } // 100% 处的颜色
                ]
            }, label: '低风险' },
            { value: -1, color: '#93B8F8', label: '未知' }
        ]
    },
    series: [
        {
            type: 'map',
            map: 'world',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [
                [-180, 90],
                [180, -90]
            ],
            itemStyle: {
                borderColor: '#aaa',
                areaColor: 'transparent'
            },
            emphasis: {
                itemStyle: {
                    show: true,
                    areaColor: '#fff'
                }
            },
            data: [
                { name: '美国', value: 34126.24 },
                { name: '日本', value: 7830.534 },
                { name: '菲律宾', value: 17150.76 },
                { name: '中国', value: 0 }
            ]
        }
    ]
});

// 设置地球（globe）的选项
const option7 = {
    globe: {
        baseTexture: 'https://images-1308194867.cos.ap-beijing.myqcloud.com/images/home/world.jpg', // 地球纹理图
        shading: 'lambert',
        atmosphere: {
            show: true,
            offset: 8,
            color: '#13315E'
        },
        light: {
            ambient: {
                intensity: 0.8
            },
            main: {
                intensity: 0.2
            }
        },
        viewControl: {
            autoRotate: true,
            autoRotateSpeed: 3,
            autoRotateAfterStill: 2,
            rotateSensitivity: 2,
            targetCoord: [116.46, 39.92], // 定位到北京
            maxDistance: 200,
            minDistance: 200
        },
        layers: [
            {
                show: true,
                type: 'blend',
                texture: mapChart // 使用 mapChart 作为地球表面层的纹理
            }
        ]
    },
    series: [
        {
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            zlevel: 2,
            effect: {
                show: true,
                trailWidth: 3,
                trailLength: 0.3,
                trailOpacity: 0.6,
                trailColor: 'rgba(0, 255, 255, 1)'
            },
            lineStyle: {
                width: 6,
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: 'rgba(0, 255, 255, 1)' },
                    { offset: 1, color: 'rgba(0, 255, 255, 0)' }
                ])
            },
            data: generateRandomRays(50) // 生成50条射线
        }
    ]
};

myChart7.setOption(option7);

// 生成随机射线数据的函数
function generateRandomRays(num) {
    const rays = [];
    for (let i = 0; i < num; i++) {
        const startLongitude = Math.random() * 360 - 180; // 随机起始经度
        const startLatitude = Math.random() * 180 - 90;  // 随机起始纬度
        const endLongitude = Math.random() * 360 - 180;  // 随机结束经度
        const endLatitude = Math.random() * 180 - 90;    // 随机结束纬度

        rays.push({
            coords: [
                [startLongitude, startLatitude],  // 射线起点
                [endLongitude, endLatitude]       // 射线终点
            ]
        });
    }
    return rays;
}
