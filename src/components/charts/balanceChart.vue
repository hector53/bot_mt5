<template>
  <vue-highcharts
    style="padding: 10px"
    type="stockChart"
    :options="dataGrafico2"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
</template>
<script>
import VueHighcharts from "vue3-highcharts";
import HighCharts from "highcharts";
import StockCharts from "highcharts/modules/stock";
StockCharts(HighCharts);

export default {
    props:["dataGrafico"],
  name: "StockChart",

  components: {
    VueHighcharts,
  },
  data() {
    return {
      dataGrafico2: {
        rangeSelector: {
          selected: 1,
        },
        chart: {
          zoomType: "x",
        },

        title: {
          text: "Balance ",
        },
        xAxis: {
          labels: {
            step: 10, // displays every second category
          },
          
        },
        series: [
          {
            color: "#ed423a",
            data: this.dataGrafico,
            name: "Balance",
            type: "line",
          },
        ],
      },

    };
  }, 

};
</script>
