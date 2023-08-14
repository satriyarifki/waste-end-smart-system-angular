import { Component } from '@angular/core';
import {
  ChartBigFiveSales,
  ChartSalesCategoryYTD,
  ChartSalesPerformance,
} from '../apexcharts';
import { ActualAug } from './db_sales';

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

  actual: any[] = ActualAug;
  // public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.salesCategoryYTDChart();
    this.bigFiveSalesChart();
    this.salesPerformanceChart();
    this.sumTotalActual();
    this.sumActualByCategory();
  }

  sumTotalActual() {
    let total = 0;
    this.actual.forEach((element) => {
      total += element.total;
    });
    if (String(total).length > 9) {
      // console.log(total / 1000000000);
      return { qty: total / 1000000000, unit: 'Mio' };
    } else {
      // console.log(total / 1000000);
      return { qty: total / 1000000, unit: 'Bio' };
    }
    console.log(total);
  }

  sumActualByCategory() {
    // let data: any[];
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
    console.log(Math.max(...data));

    console.log(data);
    return data;
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
        // offsetY:-10,
        offsetX: 50,
        style: {
          fontSize: '12px',
          colors: ['#0b82ce'],
        },
        formatter: (val: any) => {
          return [Number(val).toFixed(1) + ' Mio'];
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
            labels: {
              show: true,
              value: {
                show: true,

                formatter: function (val: any) {
                  if(val.length >9) {
                    return( val / 1000000000 ).toFixed(2)+ ' Bio';
                  } else {
                    return( val / 1000000 ).toFixed(2)+ ' Mio';
                  }
                  
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
      labels: ['Preform', 'Bottle', 'Carton', 'Balok', 'Sak Kecil'],
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
      legend: {
        offsetX: 5,
        offsetY: 25,
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
      series2: [
        {
          name: 'Actual',
          data: [343],
        },
        {
          name: 'Lost',
          data: [58],
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
        height: 250,
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
            y: '4500000000',
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
    };
  }
}
