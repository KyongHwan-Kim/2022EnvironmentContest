<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <i class="fa fa-arrow-up text-success"></i>
        <span class="font-weight-bold">{{ detail1 }}</span>
        {{ detail2 }}
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart-circle" width="100" height="100">
        <canvas
          id="chart-circle"
          class="chart-canvas-circle"
          width="100"
          height="100"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "gradient-circle-chart",
  data() {
    return {
      lineChart: null,
      circleChart: null,
    };
  },
  props: {
    title: {
      type: String,
      default: "Sales overview",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },
  methods: {
    CircleGraph() {
      const ctx2 = document.getElementById("chart-circle").getContext("2d");
      new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["Plastic", "Glass", "Can", "Paper"],
          datasets: [
            {
              backgroundColor: ["#4BB543", "#232322", "#232322", "#232322"],
              data: [30, 40, 10, 20],
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.CircleGraph();
  },
};
</script>
