import { Component } from '@angular/core';
import { max } from 'rxjs';
import {
  ChartBigFiveSales,
  ChartSalesCategoryYTD,
  ChartSalesPerformance,
} from '../apexcharts';
import { ActualAug, salesMonthIdr2022, salesMonthIdr2023 } from './db_sales';

//

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css'],
})
export class DashboardSalesComponent {
  public chartSalesCategoryYTD: Partial<ChartSalesCategoryYTD> | any;
  public chartBigFiveSales: Partial<ChartBigFiveSales> | any;
  public chartSalesPerformance: Partial<ChartSalesPerformance> | any;
  public chartSalesPerformanceMonth: Partial<ChartSalesPerformance> | any;

  actual: any[] = ActualAug;
  monthIdr2022 = salesMonthIdr2022;
  monthIdr2023 = salesMonthIdr2023;
  // public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.salesCategoryYTDChart();
    this.bigFiveSalesChart();
    this.salesPerformanceChart();
    this.sumTotalActual();
    this.sumActualByCategory();
    this.salesPerformanceMonthChart();
  }

  sumTotalActual() {
    let total = 0;
    this.actual.forEach((element) => {
      total += element.total;
    });
    if (String(total).length > 9) {
      // console.log(total / 1000000000);
      return { qty: total / 1000000000, unit: 'Bio' };
    } else {
      // console.log(total / 1000000);
      return { qty: total / 1000000, unit: 'Mio' };
    }
    console.log(total);
  }
  sumTotalActualYTD() {
    let totalYTD =
      46520100 +
      11700700 +
      54236000 +
      38248400 +
      18059200 +
      50156200 +
      36892000 +
      10184500 +
      51949000 +
      51091400 +
      73678700 +
      7072400 +
      88318700 +
      90550900 +
      14049900 +
      68954400 +
      14101300 +
      17142000 +
      45176900 +
      29049000 +
      54299150 +
      17608800 +
      45801600 +
      22229000 +
      8298100 +
      59695400 +
      43058600 +
      35374000 +
      15643200 +
      80043100 +
      37474600 +
      34016200 +
      36344300 +
      44723100 +
      31529200 +
      42580600 +
      8980200 +
      32457800 +
      14102300 +
      20996800 +
      31571900 +
      63057000 +
      30491200;

    if (String(totalYTD).length > 9) {
      return (totalYTD / 1000000000).toFixed(2) + ' Bio';
    } else {
      return (totalYTD / 1000000).toFixed(2) + ' Mio';
    }
    console.log(totalYTD);
  }
  sumTotalYTD(data: any[]) {
    let total = 0;
    data.forEach((element, i) => {
      if (i < 8) {
        total += element;
      } else {
        return;
      }
    });
    return total;
  }

  sumActualByCategory() {
    // let data: any[]
    let data = [0, 0, 0, 0, 0, 0, 0, 0];

    this.actual.forEach((element) => {
      data[0] += (element.preform.qty * element.preform.price) / 1000000;
      data[1] += (element.botol.qty * element.botol.price) / 1000000;
      data[2] += (element.karton.qty * element.karton.price) / 1000000;
      data[3] += (element.balok.qty * element.balok.price) / 1000000;
      data[4] += (element.sak_kecil.qty * element.sak_kecil.price) / 1000000;
      data[5] += (element.sak_besar.qty * element.sak_besar.price) / 1000000;
      data[6] += (element.resin.qty * element.resin.price) / 1000000;
      data[7] +=
        (element.palet_plastik.qty * element.palet_plastik.price) / 1000000;
    });
    // console.log(Math.max(...data));

    // console.log(data);
    return data;
  }

  toPercentCompare(first: any, sec: any) {
    return ((sec / first - 1) * 100).toFixed();
  }

  salesCategoryYTDChart() {
    this.chartSalesCategoryYTD = {
      series: [
        {
          name: 'serie1',
          data: this.sumActualByCategory(),
        },
        // {
        //   name: "serie2",

        //   data: [5, 3, 3, 5, 1, 4, 3]
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
        height: 'auto',
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
        // offsetY:-10,
        offsetX: 55,
        style: {
          fontSize: '12px',
          colors: ['#0b82ce'],
        },
        formatter: (val: any) => {
          return [Number(val).toFixed(2) + ' Mio'];
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
        max: Math.max(...this.sumActualByCategory()) + 20,
        categories: [
          'Preform',
          'Bottle',
          'Carton',
          'Balok',
          'Sak Kecil',
          'Sak Besar',
          'Resin',
          'Palet Plastik',
        ],
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // fontWeight: 600,
            cssClass: 'font-semibold ',
          },
        },
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
      series: [
        834480000 + 230092800,
        236865000 + 86047600,
        31029000 + 8419950,
        35628800 + 13415500,
        25956000 + 5760000,
      ],
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%',
            labels: {
              show: true,
              value: {
                show: true,
                fontWeight: 600,
                formatter: function (val: any) {
                  if (val.length > 9) {
                    return (val / 1000000000).toFixed(2) + ' Bio';
                  } else {
                    return (val / 1000000).toFixed(2) + ' Mio';
                  }
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '22px',
                // fontWeight: 400,
                color: '#373d3f',
                formatter: (w: any) => {
                  return this.sumTotalActualYTD();
                  // (
                  //   w.globals.seriesTotals.reduce((a: any, b: any) => {
                  //     return a + b;
                  //   }, 0) / 1000000000
                  // ).toFixed(2) + ' Bio'
                },
              },
            },
          },
        },
      },
      labels: ['Preform', 'Bottle', 'Carton', 'Balok', 'Sak Kecil'],
      responsive: [
        {
          breakpoint: 1000,
          options: {
            legend: {
              offsetY: -7,
              position: 'bottom',
            },
          },
        },
        {
          breakpoint: 830,
          options: {
            plotOptions: {
              pie: {
                donut: {
                  size: '70%',
                  labels: {
                    show: true,
                    value: {
                      show: true,
                      fontSize: '15px',
                      offsetY: -5,
                      formatter: function (val: any) {
                        if (val.length > 9) {
                          return (val / 1000000000).toFixed(2) + ' Bio';
                        } else {
                          return (val / 1000000).toFixed(2) + ' Mio';
                        }
                      },
                    },
                    total: {
                      show: true,
                      showAlways: false,
                      label: 'Total',
                      fontSize: '12px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600,
                      color: '#373d3f',
                      offsetY: -60,
                      formatter: function (w: any) {
                        return (
                          (
                            w.globals.seriesTotals.reduce((a: any, b: any) => {
                              return a + b;
                            }, 0) / 1000000000
                          ).toFixed(2) + ' Bio'
                        );
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
      legend: {
        offsetX: 5,
        offsetY: 0,
        fontSize: '12px',
        position: 'right',
        horizontalAlign: 'center',
      },
    };
  }

  salesPerformanceChart() {
    this.chartSalesPerformance = {
      series: [
        {
          name: 'MTD',
          group: 'budget',
          data: [this.monthIdr2022[7], this.monthIdr2023[7]],
        },
        {
          name: 'YTD',
          group: 'actual',
          data: [
            this.sumTotalYTD(this.monthIdr2022),
            this.sumTotalYTD(this.monthIdr2023),
          ],
        },
      ],
      // seriesMTD: [
      //   {
      //     name: 'Last Month',
      //     group: 'budget',
      //     data: [salesMonthIdr2022[7]],
      //   },
      //   {
      //     name: 'This Month',
      //     group: 'actual',
      //     data: [salesMonthIdr2023[7]],
      //   },
      // ],
      // seriesYTD: [
      //   {
      //     name: 'Last Year',
      //     group: 'budget',
      //     data: [this.sumTotalYTD(salesMonthIdr2022)],
      //   },
      //   {
      //     name: 'This Year',
      //     group: 'actual',
      //     data: [this.sumTotalYTD(salesMonthIdr2023)],
      //   },
      // ],

      chart: {
        type: 'bar',
        height: 170,
        stacked: true,
        toolbar: {
          show: false,
        },
      },

      stroke: {
        width: 0,
        colors: ['#fff'],
      },
      dataLabels: {
        offsetY: 10,
        style: {
          fontSize: '11px',
          // colors: ['#7E57C2'],
        },
        formatter: (val: any) => {
          if (String(val).length > 9) {
            return [(val / 1000000000).toFixed(2), ' Bio'];
          } else {
            return [(val / 1000000).toFixed(2), ' Mio'];
          }
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
            y:
              Math.min(
                this.sumTotalYTD(salesMonthIdr2022),
                this.sumTotalYTD(salesMonthIdr2022)
              ) / 12,
            seriesIndex: 0,
            label: {
              borderColor: '#FFAB91',
              borderWidth: 1,
              offsetY: -100,
              style: {
                color: '#E64A19',
                fontSize: '13px',
                fontWeight: 600,
                background: 'white',
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                },
              },
              text: [
                (
                  (this.sumTotalYTD(salesMonthIdr2023) /
                    this.sumTotalYTD(salesMonthIdr2022)) *
                  100
                ).toFixed(1) + '%',
                'Ach from YTD This Year vs Last Year',
              ],
            },
          },
        ],
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // fontWeight: 600,
            cssClass: 'font-semibold ',
          },
        },
        categories: ['Last Year', 'This Year'],
      },
      xaxisMTD: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // fontWeight: 600,
            cssClass: 'font-semibold ',
          },
        },
        categories: ['MTD'],
      },
      xaxisYTD: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // fontWeight: 600,
            cssClass: 'font-semibold ',
          },
        },
        categories: ['YTD'],
      },
      fill: {
        opacity: 1,
      },
      colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
      colorsPurple: ['#B39DDB', '#7E57C2'],
      colorsOrange: ['#FFAB91', '#FF7043'],
      colorsEmerald: ['#80CBC4 ', '#26A69A'],
      yaxis: [
        {
          labels: {
            formatter: (val: any) => {
              if (String(val).length > 9) {
                return val / 1000000000 + ' B';
              } else {
                return val / 1000000 + ' M';
              }
            },
          },
        },
        {
          opposite: true,
          labels: {
            formatter: (val: any) => {
              if (String(val).length > 9) {
                return (val / 1000000000).toFixed(2) + ' B';
              } else {
                return (val / 1000000).toFixed(2) + ' M';
              }
            },
          },
        },
      ],
      legend: {
        position: 'top',
        verticallAlign: 'center',
      },
      series2: [
        {
          name: 'Actual',
          data: [343],
        },
        {
          name: 'Lost',
          data: [58],
        },
      ],
      chart2: {
        type: 'bar',
        stacked: true,
        height: 210,
        stackType: '100%',
        toolbar: { show: false },
      },
      plotOptions2: {
        bar: {
          // borderRadius: 5,
          // borderRadiusApplication: 'around',
          // horizontal: false,
        },
      },
      xaxis2: {
        categories: [' '],
      },
      legend2: {
        // show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '10px',
      },
      yaxis2: {
        show: false,
      },
      colors2: ['#58D68D', '#EC7063'],
      responsive2: [
        {
          breakpoint: 560,
          options: {
            yaxis: {
              show: true,
            },
          },
        },
      ],
    };
  }
  salesPerformanceMonthChart() {
    this.chartSalesPerformanceMonth = {
      series: [
        {
          name: 'Month',
          data: this.monthIdr2023,
        },
      ],
      // seriesMTD: [
      //   {
      //     name: 'Last Month',
      //     group: 'budget',
      //     data: [salesMonthIdr2022[7]],
      //   },
      //   {
      //     name: 'This Month',
      //     group: 'actual',
      //     data: [salesMonthIdr2023[7]],
      //   },
      // ],
      // seriesYTD: [
      //   {
      //     name: 'Last Year',
      //     group: 'budget',
      //     data: [this.sumTotalYTD(salesMonthIdr2022)],
      //   },
      //   {
      //     name: 'This Year',
      //     group: 'actual',
      //     data: [this.sumTotalYTD(salesMonthIdr2023)],
      //   },
      // ],

      chart: {
        type: 'bar',
        height: 170,
        stacked: true,
        toolbar: {
          show: false,
        },
      },

      stroke: {
        width: 0,
        colors: ['#fff'],
      },
      dataLabels: {
        enabled: false,
        // offsetY: 50,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          // colors: ['#7E57C2'],
        },
        formatter: (val: any) => {
          if (String(val).length > 9) {
            return (val / 1000000000).toFixed(2) + ' Bio';
          } else {
            return (val / 1000000).toFixed(2) + ' Mio';
          }
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
            y:
              Math.min(
                this.sumTotalYTD(salesMonthIdr2022),
                this.sumTotalYTD(salesMonthIdr2022)
              ) / 12,
            seriesIndex: 0,
            label: {
              borderColor: '#FFAB91',
              borderWidth: 1,
              offsetY: -100,
              style: {
                color: '#E64A19',
                fontSize: '13px',
                fontWeight: 600,
                background: 'white',
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                },
              },
              text: [
                (
                  (this.sumTotalYTD(salesMonthIdr2023) /
                    this.sumTotalYTD(salesMonthIdr2022)) *
                  100
                ).toFixed(1) + '%',
                'Ach from YTD This Year vs Last Year',
              ],
            },
          },
        ],
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // fontWeight: 600,
            cssClass: 'font-semibold ',
          },
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },

      fill: {
        opacity: 1,
      },
      colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
      colorsPurple: ['#B39DDB', '#7E57C2'],
      colorsOrange: ['#FFAB91', '#FF7043'],
      colorsEmerald: ['#80CBC4 ', '#26A69A'],
      yaxis: [
        {
          labels: {
            formatter: (val: any) => {
              if (String(val).length > 9) {
                return (val / 1000000000).toFixed(1) + ' Bio';
              } else {
                return (val / 1000000).toFixed(1) + ' Mio';
              }
            },
          },
        },
      ],
      legend: {
        position: 'top',
        verticallAlign: 'center',
      },
    };
  }
}
