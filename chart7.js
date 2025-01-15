const chartDom7 = document.getElementById('chart7')
const myChart7 = echarts.init(chartDom7)
const canvas = document.createElement('canvas')
const mapChart = echarts.init(canvas, null, {
    //作为3d地球表面图层的对象
    width: 2048,
    height: 1024
})

mapChart.setOption({
    visualMap: {
    type: 'piecewise',
    show: false,
    pieces: [
        { gt: 300, color: '#FF4646', label: '极高风险' },
        { gt: 200, lte: 300, color: '#FF7500', label: '高风险' },
        { gt: 100, lte: 200, color: '#FFD300', label: '中风险' },
        {
        gte: 0,
        lte: 100,
        color: {
            type: 'radial', // linear 线性渐变  radial径向渐变
            x: 0.5, // 0.5为正中心，如果小于渐变中心靠左
            y: 0.5, // 0.5为正中心，如果小于渐变中心靠上
            r: 0.5,
            colorStops: [
            {
                offset: 0,
                color: 'rgba(255,255,255,0.8)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(86, 189, 255, 0.2)' // 100% 处的颜色
            }
            ]
        },
        label: '低风险'
        },
        { value: -1, color: '#93B8F8', label: '未知' }
    ]
    },
    series: [
    {
        type: 'map',
        map: 'world',
        // 绘制完整尺寸的 echarts 实例
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boundingCoords: [
        [-180, 90],
        [180, -90]
        ],
        itemStyle: {
        borderColor: '#aaa', //边界线颜色
        areaColor: 'transparent' //默认区域颜色
        },
        emphasis: {
        itemStyle: {
            show: true,
            areaColor: '#fff' //鼠标滑过区域颜色
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
})

myChart7.setOption({
    globe: {
    baseTexture: 'https://images-1308194867.cos.ap-beijing.myqcloud.com/images/home/world.jpg', //地球的纹理。支持图片路径的字符串，图片或者 Canvas 的对象
    shading: 'lambert', //地球中三维图形的着色效果
    atmosphere: {
        show: true, //显示大气层
        offset: 8,
        color: '#13315E'
    },
    light: {
        ambient: {
        intensity: 0.8 //环境光源强度
        }, //环境光
        main: {
        intensity: 0.2 //光源强度
        }
    },
    viewControl: {
        autoRotate: true, // 是否开启视角绕物体的自动旋转查看
        autoRotateSpeed: 3, //物体自转的速度,单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
        autoRotateAfterStill: 2, // 在鼠标静止操作后恢复自动旋转的时间间隔,默认 3s
        rotateSensitivity: 2, // 旋转操作的灵敏度，值越大越灵敏.设置为0后无法旋转。[1, 0]只能横向旋转.[0, 1]只能纵向旋转
        targetCoord: [116.46, 39.92], // 定位到北京
        maxDistance: 200,
        minDistance: 200
    },
    layers: [
        {
        //地球表面层的配置，你可以使用该配置项加入云层，或者对 baseTexture 进行补充绘制出国家的轮廓等等。
        show: true,
        type: 'blend',
        texture: mapChart
        }
    ]
    }
})


