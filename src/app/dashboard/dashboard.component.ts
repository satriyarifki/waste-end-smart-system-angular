import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ChartOptions } from '../apexcharts';
import {
  recapSalesYearly,
  salesMonthIdr2023,
} from '../dashboard-sales/db_sales';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

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

  dateFirst = new Date(new Date().getFullYear()-1, 0, 1);
  dateLast = new Date();

  //API
  salesYearlyApi: any[] = [];
  salesMonthlyApi: any[] = [];
  categoryBetweenApi: any;
  categoryThisYear:any
  categoryLastYear:any

  constructor(private apiService: ApiService, private spinner:NgxSpinnerService,private alertService:AlertService) {
    // console.log(this.dateFirst);
    spinner.show()
    forkJoin(
      apiService.salesYearlyGet(),
      apiService.salesMonthlyGet(),
      apiService.salesCategoryYearGet(new Date().getFullYear()),
      apiService.salesCategoryYearGet(new Date().getFullYear()-1),

    ).subscribe((res: any) => {
      this.salesYearlyApi = res[0];
      this.salesMonthlyApi = res[1];
      this.categoryThisYear = res[2];
      this.categoryLastYear = res[3];
      this.chart();
      this.chartTrendSales();
      spinner.hide()
    },err=>{
      alertService.onCallAlert('Data can`t loaded!' , AlertType.Error)
      spinner.hide()
    });
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

  chart() {
    // console.log(this.categoryLastYear);
    // console.log(this.categoryThisYear);
    // console.log(cate);
    
    this.chartOptions = {
      series: [
        {
          name: 'Botol Plastik',
          data: [
            // this.recapSalesYearly[0].botol_plastik,
            // this.recapSalesYearly[1].botol_plastik,
            // this.recapSalesYearly[2].botol_plastik,
            // this.recapSalesYearly[3].botol_plastik,
            // this.recapSalesYearly[4].botol_plastik,
            // this.recapSalesYearly[5].botol_plastik,
            // this.recapSalesYearly[6].botol_plastik,
            this.categoryLastYear.botol_plastik,
            this.categoryThisYear.botol_plastik
          ],
        },
        {
          name: 'Sak Kecil',
          data: [
            // this.recapSalesYearly[0].sak_kecil,
            // this.recapSalesYearly[1].sak_kecil,
            // this.recapSalesYearly[2].sak_kecil,
            // this.recapSalesYearly[3].sak_kecil,
            // this.recapSalesYearly[4].sak_kecil,
            // this.recapSalesYearly[5].sak_kecil,
            // this.recapSalesYearly[6].sak_kecil,
            this.categoryLastYear.sak_kecil,
            this.categoryThisYear.sak_kecil
          ],
        },
        {
          name: 'Preform',
          data: [
            // this.recapSalesYearly[0].preform,
            // this.recapSalesYearly[1].preform,
            // this.recapSalesYearly[2].preform,
            // this.recapSalesYearly[3].preform,
            // this.recapSalesYearly[4].preform,
            // this.recapSalesYearly[5].preform,
            // this.recapSalesYearly[6].preform,
            this.categoryLastYear.preform,
            this.categoryThisYear.preform
          ],
        },
        {
          name: 'Karton',
          data: [
            // this.recapSalesYearly[0].balok,
            // this.recapSalesYearly[1].balok,
            // this.recapSalesYearly[2].balok,
            // this.recapSalesYearly[3].balok,
            // this.recapSalesYearly[4].balok,
            // this.recapSalesYearly[5].balok,
            // this.recapSalesYearly[6].balok,
            this.categoryLastYear.balok,
            this.categoryThisYear.balok
          ],
        },
        {
          name: 'Balok',
          data: [
            // this.recapSalesYearly[0].karton,
            // this.recapSalesYearly[1].karton,
            // this.recapSalesYearly[2].karton,
            // this.recapSalesYearly[3].karton,
            // this.recapSalesYearly[4].karton,
            // this.recapSalesYearly[5].karton,
            // this.recapSalesYearly[6].karton,
            this.categoryLastYear.karton,
            this.categoryThisYear.karton
          ],
        },
        {
          name: 'Resin',
          data: [
            // this.recapSalesYearly[0].resin,
            // this.recapSalesYearly[1].resin,
            // this.recapSalesYearly[2].resin,
            // this.recapSalesYearly[3].resin,
            // this.recapSalesYearly[4].resin,
            // this.recapSalesYearly[5].resin,
            // this.recapSalesYearly[6].resin,
            this.categoryLastYear.resin,
            this.categoryThisYear.resin
          ],
        },
        {
          name: 'Palet Plastik',
          data: [
            // this.recapSalesYearly[0].pallet_plastik,
            // this.recapSalesYearly[1].pallet_plastik,
            // this.recapSalesYearly[2].pallet_plastik,
            // this.recapSalesYearly[3].pallet_plastik,
            // this.recapSalesYearly[4].pallet_plastik,
            // this.recapSalesYearly[5].pallet_plastik,
            // this.recapSalesYearly[6].pallet_plastik,
            this.categoryLastYear.pallet_plastik,
            this.categoryThisYear.pallet_plastik
          ],
        },
        {
          name: 'Palet Kayu',
          data: [
            // this.recapSalesYearly[0].pallet_kayu,
            // this.recapSalesYearly[1].pallet_kayu,
            // this.recapSalesYearly[2].pallet_kayu,
            // this.recapSalesYearly[3].pallet_kayu,
            // this.recapSalesYearly[4].pallet_kayu,
            // this.recapSalesYearly[5].pallet_kayu,
            // this.recapSalesYearly[6].pallet_kayu,
            this.categoryLastYear.pallet_kayu,
            this.categoryThisYear.pallet_kayu
          ],
        },
        {
          name: 'Drum',
          data: [
            // this.recapSalesYearly[0].drum,
            // this.recapSalesYearly[1].drum,
            // this.recapSalesYearly[2].drum,
            // this.recapSalesYearly[3].drum,
            // this.recapSalesYearly[4].drum,
            // this.recapSalesYearly[5].drum,
            // this.recapSalesYearly[6].drum,
            this.categoryLastYear.drum,
            this.categoryThisYear.drum
          ],
        },
        // {
        //   name: 'Plastik',
        //   data: [
            // this.recapSalesYearly[0].plastik,
            // this.recapSalesYearly[1].plastik,
            // this.recapSalesYearly[2].plastik,
            // this.recapSalesYearly[3].plastik,
            // this.recapSalesYearly[4].plastik,
            // this.recapSalesYearly[5].plastik,
            // this.recapSalesYearly[6].plastik,
        //     this.categoryLastYear.plastik,
        //     this.categoryThisYear.plastik,
        //   ],
        // },
        {
          name: 'Besi',
          data: [
            // this.recapSalesYearly[0].besi,
            // this.recapSalesYearly[1].besi,
            // this.recapSalesYearly[2].besi,
            // this.recapSalesYearly[3].besi,
            // this.recapSalesYearly[4].besi,
            // this.recapSalesYearly[5].besi,
            // this.recapSalesYearly[6].besi,
            this.categoryLastYear.besi,
            this.categoryThisYear.besi
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
          // new Date().getFullYear()-7,
          // new Date().getFullYear()-6,
          // new Date().getFullYear()-5,
          // new Date().getFullYear()-4,
          // new Date().getFullYear()-3,
          // new Date().getFullYear()-3,
          // new Date().getFullYear()-2,
          new Date().getFullYear()-1,
          new Date().getFullYear(),
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
    // console.log(this.salesYearNow);
    
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
            this.salesYear(2022)?.sum_total,
            this.salesYearNow?.sum_total,
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
      colors: ['#EA0577'],
      markers: {
        size: 6,
      },
      xaxis: {
        categories: [
          // this.recapSalesYearly[0].year,
          // this.recapSalesYearly[1].year,
          // this.recapSalesYearly[2].year,
          // this.recapSalesYearly[3].year,
          // this.recapSalesYearly[4].year,
          // this.recapSalesYearly[5].year,
          // this.recapSalesYearly[6].year,
          this.categoryLastYear.year,
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
