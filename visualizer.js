const chartContainer=document.getElementById('emotion-chart').getContext('2d');
let emotionChart;

const EMOTIONS =  ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];

/**
 *  initializes a horizontal bar to visualize emotions
 */

function initChart() {

    emotionChart = new Chart(chartContainer, {
        type: 'horizontalBar',
        data: {
          "labels":[
             "Angry",
             "Disgust",
             "Fear",
             "Happy",
             "Sad",
             "Surprise",
             "Neutral"
          ],
          "datasets":[
             {
                "label":"",
                "data": [0, 0, 0, 0, 0, 0, 0],
                "fill": false,
                "backgroundColor":[
                   "rgba(255, 99, 132, 0.6)",
                   "rgba(255, 159, 64, 0.6)",
                   "rgba(255, 205, 86, 0.6)",
                   "rgba(75, 192, 192, 0.6)",
                   "rgba(54, 162, 235, 0.6)",
                   "rgba(153, 102, 255, 0.6)",
                   "rgba(201, 203, 207, 0.6)"
                ],
                "borderColor":[
                   "rgb(255, 99, 132)",
                   "rgb(255, 159, 64)",
                   "rgb(255, 205, 86)",
                   "rgb(75, 192, 192)",
                   "rgb(54, 162, 235)",
                   "rgb(153, 102, 255)",
                   "rgb(201, 203, 207)"
                ],
                "borderWidth":1
             }
          ]
       },
        options: {
         "responsive": true,
         "maintainAspectRatio": false,
         "scales":{
            "xAxes":[
               {
                  "ticks":{
                     "beginAtZero":true
                  }
               }
            ]
         }
      }
    });
}

/**
 *  updtes the chart using the new predictions
 * @param predictions An array of emotions predictions
 */
function updateChart(predictions){

   emotionChart.data.datasets[0].label = '' + EMOTIONS[predictions.argMax(1).dataSync()[0]]; //label
   emotionChart.data.datasets[0].data =predictions.dataSync(); //array
   emotionChart.update(20);


}

initChart();
