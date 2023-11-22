import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, max } from 'rxjs';
import {
  ChartBigFiveSales,
  ChartSalesCategory,
  ChartSalesPerformance,
} from '../apexcharts';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';
import {
  ActualAug,
  harga,
  salesDate2023,
  salesDateIdr2023,
  salesIdr2023,
  salesMonthIdr2022,
  salesMonthIdr2023,
} from './db_sales';

//

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css'],
})
export class DashboardSalesComponent {
  public chartSalesCategory: Partial<ChartSalesCategory> | any;
  public chartBigFiveSales: Partial<ChartBigFiveSales> | any;
  public chartSalesPerformance: Partial<ChartSalesPerformance> | any;
  public chartSalesPerformanceMonth: Partial<ChartSalesPerformance> | any;

  dateNow = new Date();
  actual: any[] = ActualAug;
  // monthIdr2022 = salesMonthIdr2022;
  // monthIdr2023 = salesMonthIdr2023;
  // priceLimbah = harga;
  // idrSales = salesIdr2023;
  // dateSales = salesDate2023;
  // dateidrSales = salesDateIdr2023;
  // public chartOptions: Partial<ChartOptions>;
  salesFiltered: any[] = [];
  sumSalesFiltered: any[] = [];
  fromFilter: any = new Date(
    this.dateNow.getFullYear(),
    this.dateNow.getMonth(),
    1 + 1
  )
    .toISOString()
    .slice(0, 10);
  toFilter: any = new Date(
    this.dateNow.getFullYear(),
    this.dateNow.getMonth()+1,
    +1
  )
    .toISOString()
    .slice(0, 10);

  //API
  salesYearlyApi: any[] = [];
  salesMonthlyApi: any[] = [];
  categoryBetweenApi: any;
  bigFiveApi: any;

  constructor(private apiService: ApiService,private spinner:NgxSpinnerService,private alertService:AlertService) {
    spinner.show()
    forkJoin(
      apiService.salesYearlyGet(),
      apiService.salesMonthlyGet(),
      apiService.salesBigFiveGet(),
      apiService.salesCategoryBetweenGet(this.fromFilter, this.toFilter)
    ).subscribe(([salesYear, salesMonth, bigFive, category]) => {
      this.salesYearlyApi = salesYear;
      this.salesMonthlyApi = salesMonth;
      this.bigFiveApi = bigFive;
      this.categoryBetweenApi = category;
      // console.log(this.salesMonthlyApi);
      this.salesCategoryChart();
      this.sumTotalActual();
      this.filterByDate();
      this.salesPerformanceMonthChart();
      this.bigFiveSalesChart();
      this.salesPerformanceChart();
      spinner.hide()
    },err=>{
      alertService.onCallAlert('Data can`t loaded!' , AlertType.Error)
      spinner.hide()
    });
    window.onresize = function () {
      // Setting the current height & width
      // to the elements
      // console.log(window.innerHeight);
      // console.log(window.innerWidth);
    };
  }
  get salesYearNow() {
    return this.salesYearlyApi.filter(
      (data) => data.year == new Date().getFullYear()
    )[0];
  }
  salesYear(year:any){
    return this.salesYearlyApi.filter(
      (data) => data.year == year
    )[0];
  }
  get salesMonthlyYearNow() {
    return this.salesMonthlyApi.filter(
      (data) => data.year == new Date().getFullYear()
    );
  }

  get salesMTDThisLastYear() {
    return this.salesMonthlyApi.filter(
      (data) => data.month == new Date().getMonth()
    );
  }

  salesMonthlyFilter(month:any, year:any){
    return this.salesMonthlyApi.filter(
      (data) => data.year == year && data.month == month 
    )[0];
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
  // sumTotalActualYTD() {
  //   let totalYTD = 0;
  //   this.idrSales.forEach((element, i) => {
  //     if (i > 78) {
  //       totalYTD += element;
  //     }
  //   });

  //   if (String(totalYTD).length > 9) {
  //     return (totalYTD / 1000000000).toFixed(2) + ' Bio';
  //   } else {
  //     return (totalYTD / 1000000).toFixed(2) + ' Mio';
  //   }
  //   console.log(totalYTD);
  // }
  sumTotalYTD(data: any[]) {
    let total = 0;
    data.forEach((element, i) => {
      if (i < 9) {
        total += element;
      } else {
        return;
      }
    });
    return total;
  }
  filterByDate() {
    // console.log('From : ' + this.fromFilter + ', to : ' + this.toFilter);

    this.apiService
      .salesCategoryBetweenGet(this.fromFilter, this.toFilter)
      .subscribe((data) => {
        this.categoryBetweenApi = data;
        // console.log(data);
        this.salesCategoryChart();
      });
    //
  }

  // sumActualByCategory() {
  //   let data = [0, 0, 0, 0, 0, 0, 0, 0];

  //   if (this.salesFiltered.length != 0) {
  //     this.salesFiltered.forEach((element) => {
  //       if (element.vendor.includes('Desa')) {
  //         data[0] += element.preform * this.priceLimbah.desa.preform;
  //         data[1] += element.botol * this.priceLimbah.desa.botol;
  //         data[2] += element.karton * this.priceLimbah.desa.karton;
  //         data[3] += element.balok * this.priceLimbah.desa.balok;
  //         data[4] += element.sak_kecil * this.priceLimbah.desa.sak_kecil;
  //         data[5] += element.sak_besar * this.priceLimbah.desa.sak_besar;
  //         data[6] += element.resin * this.priceLimbah.desa.resin;
  //         data[7] +=
  //           element.palet_plastik * this.priceLimbah.desa.pallet_plastik;
  //       } else {
  //         // console.log(element.vendor);
  //         data[0] += element.preform * this.priceLimbah.swasta.preform;
  //         data[1] += element.botol * this.priceLimbah.swasta.botol;
  //         data[2] += element.karton * this.priceLimbah.swasta.karton;
  //         data[3] += element.balok * this.priceLimbah.swasta.balok;
  //         data[4] += element.sak_kecil * this.priceLimbah.swasta.sak_kecil;
  //         data[5] += element.sak_besar * this.priceLimbah.swasta.sak_besar;
  //         data[6] += element.resin * this.priceLimbah.swasta.resin;
  //         data[7] +=
  //           element.palet_plastik * this.priceLimbah.swasta.pallet_plastik;
  //       }
  //     });
  //   } else {
  //     // console.log('else');

  //     this.actual.forEach((element) => {
  //       if (!element.vendor.includes('Desa')) {
  //         data[0] += element.preform.qty * element.preform.price;
  //         data[1] += element.botol.qty * element.botol.price;
  //         data[2] += element.karton.qty * element.karton.price;
  //         data[3] += element.balok.qty * element.balok.price;
  //         data[4] += element.sak_kecil.qty * element.sak_kecil.price;
  //         data[5] += element.sak_besar.qty * element.sak_besar.price;
  //         data[6] += element.resin.qty * element.resin.price;
  //         data[7] += element.palet_plastik.qty * element.palet_plastik.price;
  //       }
  //     });
  //   }

  //   // console.log(Math.max(...data));

  //   // console.log(data);
  //   this.sumSalesFiltered = data;

  //   // return data;
  // }

  toPercentCompare(first: any, sec: any) {
    return ((sec / first - 1) * 100).toFixed();
  }

  salesCategoryChart() {
    // console.log(this.categoryBetweenApi);
    const category = [
      this.categoryBetweenApi.preform,
      this.categoryBetweenApi.botol_plastik,
      this.categoryBetweenApi.karton,
      this.categoryBetweenApi.balok,
      this.categoryBetweenApi.sak_kecil,
      this.categoryBetweenApi.sak_besar,
      this.categoryBetweenApi.resin,
      this.categoryBetweenApi.pallet_plastik,
    ];
    // console.log(category);
    this.chartSalesCategory = {
      series: [
        {
          name: 'serie1',
          data: category,
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
        height: 450,
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
        // offsetY: -7.5,
        offsetX: 55,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#018EB4'],
        },
        formatter: (val: any) => {
          if (String(val).length > 9) {
            return [(val / 1000000000).toFixed(2) + ' Bio'];
          } else {
            return [(val / 1000000).toFixed(2) + ' Mio'];
          }
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          opacity: 0.8,
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
        max: Math.max(...category) + 20,
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
        labels: {
          show: true,
          style: {
            fontFamily: 'Outfit',
            cssClass: 'font-medium',
          },
          formatter: (val: any) => {
            if (String(val).length > 9) {
              return (val / 1000000000).toFixed(0) + ' B';
            } else {
              return (val / 1000000).toFixed(0) + ' M';
            }
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            fontFamily: 'Outfit',
            // fontWeight: 600,
            cssClass: 'font-semibold',
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
        Number(this.bigFiveApi.preform),
        Number(this.bigFiveApi.botol_plastik),
        Number(this.bigFiveApi.karton),
        Number(this.bigFiveApi.balok),
        Number(this.bigFiveApi.sak_kecil),
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
                fontSize: '15px',
                fontWeight: 600,
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
                // fontWeight: 400,
                color: '#373d3f',
                formatter: (w: any) => {
                  return this.salesYearNow?.sum_total.length > 9
                    ? (this.salesYearNow?.sum_total / 1000000000).toFixed(2) +
                        ' Bio'
                    : (this.salesYearNow?.sum_total / 1000000).toFixed(2) +
                        ' Mio';
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
                      formatter: (w: any) => {
                        return this.salesYearNow?.sum_total.length > 9
                          ? (this.salesYearNow?.sum_total / 1000000000).toFixed(
                              2
                            ) + ' Bio'
                          : (this.salesYearNow?.sum_total / 1000000).toFixed(
                              2
                            ) + ' Mio';
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
          data: [
            this.salesMonthlyFilter(this.salesMonthlyApi[0]?.month,this.salesMonthlyApi[0]?.year-1)?.sum_total,
                  this.salesMonthlyApi[0]?.sum_total
          ],
        },
        {
          name: 'YTD',
          group: 'actual',
          data: [
            this.salesYearlyApi[1].sum_total,
            this.salesYearlyApi[0].sum_total,
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

      // annotations: {
      //   // texts: [{
      //   //   x: 'YTD',
      //   //   y: '50000',
      //   //   text: 'Test',
      //   //   textAnchor: 'start',
      //   // }],
      //   points: [
      //     {
      //       x: 'YTD',
      //       y:
      //         Math.min(
      //           this.sumTotalYTD(salesMonthIdr2022),
      //           this.sumTotalYTD(salesMonthIdr2022)
      //         ) / 12,
      //       seriesIndex: 0,
      //       label: {
      //         borderColor: '#FFAB91',
      //         borderWidth: 1,
      //         offsetY: -100,
      //         style: {
      //           color: '#E64A19',
      //           fontSize: '13px',
      //           fontWeight: 600,
      //           background: 'white',
      //           padding: {
      //             left: 5,
      //             right: 5,
      //             top: 5,
      //             bottom: 5,
      //           },
      //         },
      //         text: [
      //           (
      //             (this.sumTotalYTD(salesMonthIdr2023) /
      //               this.sumTotalYTD(salesMonthIdr2022)) *
      //             100
      //           ).toFixed(1) + '%',
      //           'Ach from YTD This Year vs Last Year',
      //         ],
      //       },
      //     },
      //   ],
      // },
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
    let valueMonthlyYearNow: any[] = [];
    this.salesMonthlyYearNow.forEach((elem) => {
      valueMonthlyYearNow.push(elem.sum_total);
    });
    this.chartSalesPerformanceMonth = {
      series: [
        {
          name: 'Month',
          data: valueMonthlyYearNow.reverse(),
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

      // annotations: {
      //   // texts: [{
      //   //   x: 'YTD',
      //   //   y: '50000',
      //   //   text: 'Test',
      //   //   textAnchor: 'start',
      //   // }],
      //   points: [
      //     {
      //       x: 'YTD',
      //       y:
      //         Math.min(
      //           this.sumTotalYTD(salesMonthIdr2022),
      //           this.sumTotalYTD(salesMonthIdr2022)
      //         ) / 12,
      //       seriesIndex: 0,
      //       label: {
      //         borderColor: '#FFAB91',
      //         borderWidth: 1,
      //         offsetY: -100,
      //         style: {
      //           color: '#E64A19',
      //           fontSize: '13px',
      //           fontWeight: 600,
      //           background: 'white',
      //           padding: {
      //             left: 5,
      //             right: 5,
      //             top: 5,
      //             bottom: 5,
      //           },
      //         },
      //         text: [
      //           (
      //             (this.sumTotalYTD(salesMonthIdr2023) /
      //               this.sumTotalYTD(salesMonthIdr2022)) *
      //             100
      //           ).toFixed(1) + '%',
      //           'Ach from YTD This Year vs Last Year',
      //         ],
      //       },
      //     },
      //   ],
      // },
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
