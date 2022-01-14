<template>
  <vue-highcharts
    type="stockChart"
    :options="chartOptions"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
    />
</template>
<script>
  import VueHighcharts from 'vue3-highcharts';
  import HighCharts from 'highcharts';
  import StockCharts from 'highcharts/modules/stock';

  StockCharts(HighCharts);

  export default {
    name: 'StockChart',

    components: {
      VueHighcharts,
    },
    props:["dataGrafico"],
    setup(props) {
      const chartOptions = props.dataGrafico

      return {
        chartOptions,
      };
    },
  };
</script>