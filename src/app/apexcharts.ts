import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
    ApexNonAxisChartSeries,
    ApexResponsive, ApexAnnotations, ApexMarkers
  } from "ng-apexcharts";
  
  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    colors: string[];
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    markers: ApexMarkers;
  };
  export type ChartSalesCategoryYTD = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    tootlip: ApexTooltip
  };
  export type ChartBigFiveSales = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    labels: any;
  };
  export type ChartSalesPerformance = {
    annotations: ApexAnnotations
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string[];
    fill: ApexFill;
    legend: ApexLegend;
  };