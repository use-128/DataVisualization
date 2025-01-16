var chartDom_count1 = document.getElementById('count1');
var myChart_count1 = echarts.init(chartDom_count1);
var option_count1;

option_count1 = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '321837',
          fontSize: 80,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: 'aliceblue',
            lineWidth: 1,
            fontFamily: 'DS-Digital',
            textShadowColor: '#159AFF',
            textShadowBlur: 9,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'aliceblue'
              }
            }
          ]
        }
      }
    ]
  }
};

option_count1 && myChart_count1.setOption(option_count1);
