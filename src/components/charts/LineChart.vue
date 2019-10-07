<template>
  <div id="line-chart-component" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
// @ts-ignore
// Wtf is going on, on the `frappe-chart` team? This is their *recommended* way
// to import the module.
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

@Component({})
export default class LineChartComponent extends Vue {
  @Prop({
    required: true,
    type: Array,
  })
  readonly labels!: string[];

  @Prop({
    required: true,
    type: Array,
  })
  readonly datasets!: string[];

  @Prop({
    required: false,
    type: Number,
    default: 150,
  })
  readonly height!: number;

  @Prop({
    required: false,
    type: Array,
    default: () => ['#42b983'],
  })
  readonly colors!: string[];

  @Watch('labels')
  onLabelsChanged(val: string[], oldVal: string[]) {
    this.chartRef.update({
      labels: this.labels,
      datasets: this.datasets,
    });
  }

  @Watch('datasets')
  onDatasetsChanged(val: any[], oldVal: any[]) {
    this.chartRef.update({
      labels: this.labels,
      datasets: this.datasets,
    });
  }

  private chartRef!: any;

  public mounted(): void {
    this.chartRef = new Chart('#line-chart-component', {
      type: 'line',
      height: this.height,
      colors: this.colors,

      axisOptions: {
        xAxisMode: 'tick',
        xIsSeries: true,
      },

      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
    });
  }
}
</script>

<style>
.chart-container .axis line,
.chart-container .chart-label line {
  stroke: #e2e8f0 !important;
}

.chart-container .axis,
.chart-container .chart-label {
  fill: #e2e8f0 !important;
}

.chart-container .dataset-units circle {
  stroke: transparent !important;
}
</style>
