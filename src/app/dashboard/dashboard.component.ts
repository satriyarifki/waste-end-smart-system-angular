import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../apexcharts';
import {
  recapSalesYearly,
  salesMonthIdr2023,
} from '../dashboard-sales/db_sales';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // @ViewChild("chart") chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions> | any;
  public trendSalesChart: Partial<ChartOptions> | any;
  salesMonthIdr2023 = salesMonthIdr2023;
  recapSalesYearly = recapSalesYearly;

  constructor() {
    this.chart();
    this.chartTrendSales();
  }

  chart() {
    this.chartOptions = {
      series: [
        {
          name: 'Botol Plastik',
          data: [
            this.recapSalesYearly[0].botol_plastik,
            this.recapSalesYearly[1].botol_plastik,
            this.recapSalesYearly[2].botol_plastik,
            this.recapSalesYearly[3].botol_plastik,
            this.recapSalesYearly[4].botol_plastik,
            this.recapSalesYearly[5].botol_plastik,
            this.recapSalesYearly[6].botol_plastik,
            this.recapSalesYearly[7].botol_plastik,
            this.recapSalesYearly[8].botol_plastik,
          ],
        },
        {
          name: 'Sak Kecil',
          data: [
            this.recapSalesYearly[0].sak_kecil,
            this.recapSalesYearly[1].sak_kecil,
            this.recapSalesYearly[2].sak_kecil,
            this.recapSalesYearly[3].sak_kecil,
            this.recapSalesYearly[4].sak_kecil,
            this.recapSalesYearly[5].sak_kecil,
            this.recapSalesYearly[6].sak_kecil,
            this.recapSalesYearly[7].sak_kecil,
            this.recapSalesYearly[8].sak_kecil,
          ],
        },
        {
          name: 'Preform',
          data: [
            this.recapSalesYearly[0].preform,
            this.recapSalesYearly[1].preform,
            this.recapSalesYearly[2].preform,
            this.recapSalesYearly[3].preform,
            this.recapSalesYearly[4].preform,
            this.recapSalesYearly[5].preform,
            this.recapSalesYearly[6].preform,
            this.recapSalesYearly[7].preform,
            this.recapSalesYearly[8].preform,
          ],
        },
        {
          name: 'Karton',
          data: [
            this.recapSalesYearly[0].balok,
            this.recapSalesYearly[1].balok,
            this.recapSalesYearly[2].balok,
            this.recapSalesYearly[3].balok,
            this.recapSalesYearly[4].balok,
            this.recapSalesYearly[5].balok,
            this.recapSalesYearly[6].balok,
            this.recapSalesYearly[7].balok,
            this.recapSalesYearly[8].balok,
          ],
        },
        {
          name: 'Balok',
          data: [
            this.recapSalesYearly[0].karton,
            this.recapSalesYearly[1].karton,
            this.recapSalesYearly[2].karton,
            this.recapSalesYearly[3].karton,
            this.recapSalesYearly[4].karton,
            this.recapSalesYearly[5].karton,
            this.recapSalesYearly[6].karton,
            this.recapSalesYearly[7].karton,
            this.recapSalesYearly[8].karton,
          ],
        },
        {
          name: 'Resin',
          data: [
            this.recapSalesYearly[0].resin,
            this.recapSalesYearly[1].resin,
            this.recapSalesYearly[2].resin,
            this.recapSalesYearly[3].resin,
            this.recapSalesYearly[4].resin,
            this.recapSalesYearly[5].resin,
            this.recapSalesYearly[6].resin,
            this.recapSalesYearly[7].resin,
            this.recapSalesYearly[8].resin,
          ],
        },
        {
          name: 'Palet Plastik',
          data: [
            this.recapSalesYearly[0].pallet_plastik,
            this.recapSalesYearly[1].pallet_plastik,
            this.recapSalesYearly[2].pallet_plastik,
            this.recapSalesYearly[3].pallet_plastik,
            this.recapSalesYearly[4].pallet_plastik,
            this.recapSalesYearly[5].pallet_plastik,
            this.recapSalesYearly[6].pallet_plastik,
            this.recapSalesYearly[7].pallet_plastik,
            this.recapSalesYearly[8].pallet_plastik,
          ],
        },
        {
          name: 'Palet Kayu',
          data: [
            this.recapSalesYearly[0].pallet_kayu,
            this.recapSalesYearly[1].pallet_kayu,
            this.recapSalesYearly[2].pallet_kayu,
            this.recapSalesYearly[3].pallet_kayu,
            this.recapSalesYearly[4].pallet_kayu,
            this.recapSalesYearly[5].pallet_kayu,
            this.recapSalesYearly[6].pallet_kayu,
            this.recapSalesYearly[7].pallet_kayu,
            this.recapSalesYearly[8].pallet_kayu,
          ],
        },
        {
          name: 'Drum',
          data: [
            this.recapSalesYearly[0].drum,
            this.recapSalesYearly[1].drum,
            this.recapSalesYearly[2].drum,
            this.recapSalesYearly[3].drum,
            this.recapSalesYearly[4].drum,
            this.recapSalesYearly[5].drum,
            this.recapSalesYearly[6].drum,
            this.recapSalesYearly[7].drum,
            this.recapSalesYearly[8].drum,
          ],
        },
        {
          name: 'Plastik',
          data: [
            this.recapSalesYearly[0].plastik,
            this.recapSalesYearly[1].plastik,
            this.recapSalesYearly[2].plastik,
            this.recapSalesYearly[3].plastik,
            this.recapSalesYearly[4].plastik,
            this.recapSalesYearly[5].plastik,
            this.recapSalesYearly[6].plastik,
            this.recapSalesYearly[7].plastik,
            this.recapSalesYearly[8].plastik,
          ],
        },
        {
          name: 'Besi',
          data: [
            this.recapSalesYearly[0].besi,
            this.recapSalesYearly[1].besi,
            this.recapSalesYearly[2].besi,
            this.recapSalesYearly[3].besi,
            this.recapSalesYearly[4].besi,
            this.recapSalesYearly[5].besi,
            this.recapSalesYearly[6].besi,
            this.recapSalesYearly[7].besi,
            this.recapSalesYearly[8].besi,
          ],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: ['#D98880', '#F1948A', '#F7DC6F', '#F7DC6F'],
      dataLabels: {
        enabled: false,
        formatter: (val: any) => {
          if (String(val).length > 9) {
            return (val / 1000000000).toFixed(0) + ' Bio';
          } else {
            return (val / 1000000).toFixed(0) + ' Mio';
          }
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          this.recapSalesYearly[0].year,
          this.recapSalesYearly[1].year,
          this.recapSalesYearly[2].year,
          this.recapSalesYearly[3].year,
          this.recapSalesYearly[4].year,
          this.recapSalesYearly[5].year,
          this.recapSalesYearly[6].year,
          this.recapSalesYearly[7].year,
          this.recapSalesYearly[8].year,
        ],
        // categories: [
        //   'Jan',
        //   'Feb',
        //   'Mar',
        //   'Apr',
        //   'May',
        //   'Jun',
        //   'Jul',
        //   'Aug',
        //   'Sep',
        //   'Oct',
        //   'Nov',
        //   'Dec',
        // ],
      },
      yaxis: {
        title: {
          text: '',
        },
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
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: any) => {
            if (String(val).length > 9) {
              return (val / 1000000000).toFixed(2) + ' B';
            } else {
              return (val / 1000000).toFixed(2) + ' M';
            }
          },
        },
      },
    };
  }
  chartTrendSales() {
    this.trendSalesChart = {
      series: [
        // {
        //   name: 'Barang Keluar',
        //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        // },
        {
          name: 'Total Penjualan',
          data: [
            this.recapSalesYearly[0].amount,
            this.recapSalesYearly[1].amount,
            this.recapSalesYearly[2].amount,
            this.recapSalesYearly[3].amount,
            this.recapSalesYearly[4].amount,
            this.recapSalesYearly[5].amount,
            this.recapSalesYearly[6].amount,
            this.recapSalesYearly[7].amount,
            this.recapSalesYearly[8].amount,
          ],
        },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      plotOptions: {
        line: {
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: any) => {
          if (String(val).length > 9) {
            return (val / 1000000000).toFixed(2) + ' Bio';
          } else {
            return (val / 1000000).toFixed(2) + ' Mio';
          }
        },
      },
      stroke: {
        show: true,
        width: 4,
        // colors:,
      },
      colors:['#EA0577'],
      markers: {
        size: 6,
      },
      xaxis: {
        categories: [
          this.recapSalesYearly[0].year,
          this.recapSalesYearly[1].year,
          this.recapSalesYearly[2].year,
          this.recapSalesYearly[3].year,
          this.recapSalesYearly[4].year,
          this.recapSalesYearly[5].year,
          this.recapSalesYearly[6].year,
          this.recapSalesYearly[7].year,
          this.recapSalesYearly[8].year,
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
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
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: any) => {
            if (String(val).length > 9) {
              return (val / 1000000000).toFixed(2) + ' Bio';
            } else {
              return (val / 1000000).toFixed(2) + ' Mio';
            }
          },
        },
      },
    };
  }
}
