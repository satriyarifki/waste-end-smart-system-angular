import { Component } from '@angular/core';
import {
  ChartBigFiveSales,
  ChartSalesCategoryYTD,
  ChartSalesPerformance,
} from '../apexcharts';

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css'],
})
export class DashboardSalesComponent {
  public chartSalesCategoryYTD: Partial<ChartSalesCategoryYTD> | any;
  public chartBigFiveSales: Partial<ChartBigFiveSales> | any;
  public chartSalesPerformance: Partial<ChartSalesPerformance> | any;

  constructor() {
    this.salesCategoryYTDChart();
    this.bigFiveSalesChart();
    this.salesPerformanceChart();
  }
  salesCategoryYTDChart() {
    this.chartSalesCategoryYTD = {
      series: [
        {
          name: 'serie1',
          data: [4.4, 5.5, 4.1, 6.4, 2.2, 4.3, 2.1, 2.3],
        },
        // {
        //   name: "serie2",

        //   data: [53, 32, 33, 52, 13, 44, 32]
        // }
      ],
      series2: [
        {
          name: 'serie1',
          data: [300, 350],
        },
        // {
        //   name: "serie2",

        //   data: [53, 32, 33, 52, 13, 44, 32]
        // }
      ],
      chart: {
        type: 'bar',
        height: 430,
      },
      chart2: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 5,
          borderRadiusApplication: 'around',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 32,
        style: {
          fontSize: '12px',
          colors: ['#0b82ce'],
        },
        formatter: (val: any) => {
          return Number(val) + ' Bio';
        },
      },
      dataLabels2: {
        enabled: true,
        offsetX: -15,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
        formatter: (val: any) => {
          return Number(val) + ' Kg';
        },
      },
      stroke: {
        show: false,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [
          'Preform',
          'Bottle',
          'Carton',
          'Balok',
          'Rak Kecil',
          'Resin',
          'Palet Plastik',
          'Palet Kayu',
        ],
      },
      xaxis2: {
        categories: [['Ytd Actual ', ' Sales'], 'Ytd System'],
      },
      tooltip: {
        enabled: false,
      },
    };
  }
  bigFiveSalesChart() {
    this.chartBigFiveSales = {
      series: [440000000, 550000000, 130000000, 430000000, 220000000],
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              value: {
                show: true,

                formatter: function (val: any) {
                  return val / 1000000 + ' Mio';
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w: any) {
                  return (
                    w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b;
                    }, 0) /
                      1000000000 +
                    ' Bio'
                  );
                },
              },
            },
          },
        },
      },
      labels: ['Preform', 'Bottle', 'Carton', 'Balok', 'Rak Kecil'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  salesPerformanceChart() {
    this.chartSalesPerformance = {
      series: [
        {
          name: 'Last Year',
          group: 'budget',
          data: [640000000, 3500000000],
        },
        {
          name: 'This Year',
          group: 'actual',
          data: [780000000, 4000000000],
        },
        // {
        //   name: 'Q2 Budget',
        //   group: 'budget',
        //   data: [13000, 36000, 20000, 8000, 13000, 27000],
        // },
        // {
        //   name: 'Q2 Actual',
        //   group: 'actual',
        //   data: [20000, 40000, 25000, 10000, 12000, 28000],
        // },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      stroke: {
        width: 0,
        colors: ['#fff'],
      },
      dataLabels: {
        formatter: (val: any) => {
          return Number(val) / 1000000000 + ' Bio';
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'around',
          horizontal: false,
        },
      },

      annotations: {
        // texts: [{
        //   x: 'YTD',
        //   y: '50000',
        //   text: 'Test',
        //   textAnchor: 'start',
        // }],
        points: [
          {
            x: 'YTD',
            y: '5000000000',
            seriesIndex: 0,
            label: {
              borderWidth: 0,
              offsetY: 0,
              style: {
                color: '#55019B',
                fontSize: '13px',
                background: '#E9CEFF',
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                },
              },
              text: [146 + '%', 'Ach from YTD this year vs Last year'],
            },
          },
        ],
      },
      xaxis: {
        categories: ['MTD', 'YTD'],
      },
      fill: {
        opacity: 1,
      },
      colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
      yaxis: {
        labels: {
          formatter: (val: any) => {
            return val / 1000000000 + ' Bio';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
    };
  }
}
