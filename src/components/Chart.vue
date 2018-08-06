<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    datasets: Array,
    labels: Array
  },
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: this.labels,
        datasets: this.datasets
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  }
};
</script>
