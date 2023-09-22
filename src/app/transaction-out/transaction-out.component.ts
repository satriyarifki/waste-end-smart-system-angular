import { Component, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ActualAug, harga } from '../dashboard-sales/db_sales';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-transaction-out',
  templateUrl: './transaction-out.component.html',
  styleUrls: ['./transaction-out.component.css'],
})
export class TransactionOutComponent {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  searchInput: any;
  p: any;
  itemPerPage: number = 7;

  exportAsConfig: any;
  exportAsService: any;
  exportBool: boolean = false;

  //API
  sales_data = ActualAug;
  price_sales = harga;
  salesViewApi: any[] = [];

  // Data Result
  salesArray: any[] = [];

  cobaState = { id: 1, name: 'Angula' };
  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.salesArray.length,
  };

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {
    spinner.show();

    forkJoin(apiService.salesViewGet()).subscribe(
      ([salesView]) => {
        this.salesViewApi = salesView;
        console.log(salesView);
        console.log(this.salesViewApi);
        spinner.hide();
      },
      (err) => {
        this.alertService.onCallAlert(
          'Data cannot loaded, server error !',
          AlertType.Error
        ),
        spinner.hide();
      }
    );
    this.changeSalesToArray();
  }

  onPageChange(event: any) {
    console.log(event);
    this.config.currentPage = event;
  }

  export(type: any) {
    this.exportAsConfig.type = type;

    // download the file using old school javascript method
    this.exportAsService
      .save(this.exportAsConfig, 'Stock Table')
      .subscribe(() => {
        // save started
        console.log('Success');
      });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe((content: any) => {
    //   console.log(content);
    // });
  }
  changeSalesToArray() {
    let data: any[] = [];
    this.sales_data.forEach((element) => {
      if (element.balok.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Balok',
          price: element.balok.price,
          qty: element.balok.qty,
          unit: element.balok.satuan,
        });
      }
      if (element.besi.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Besi',
          price: element.besi.price,
          qty: element.besi.qty,
          unit: element.besi.satuan,
        });
      }
      if (element.botol.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Botol',
          price: element.botol.price,
          qty: element.botol.qty,
          unit: element.botol.satuan,
        });
      }
      if (element.drum.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Drum',
          price: element.drum.price,
          qty: element.drum.qty,
          unit: element.drum.satuan,
        });
      }
      if (element.karton.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Karton',
          price: element.karton.price,
          qty: element.karton.qty,
          unit: element.karton.satuan,
        });
      }
      if (element.palet_kayu.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Palet_kayu',
          price: element.palet_kayu.price,
          qty: element.palet_kayu.qty,
          unit: element.palet_kayu.satuan,
        });
      }
      if (element.palet_plastik.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Palet Plastik',
          price: element.palet_plastik.price,
          qty: element.palet_plastik.qty,
          unit: element.palet_plastik.satuan,
        });
      }
      if (element.preform.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Preform',
          price: element.preform.price,
          qty: element.preform.qty,
          unit: element.preform.satuan,
        });
      }
      if (element.resin.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Resin',
          price: element.resin.price,
          qty: element.resin.qty,
          unit: element.resin.satuan,
        });
      }
      if (element.sak_besar.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Sak_besar',
          price: element.sak_besar.price,
          qty: element.sak_besar.qty,
          unit: element.sak_besar.satuan,
        });
      }
      if (element.sak_kecil.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Sak_kecil',
          price: element.sak_kecil.price,
          qty: element.sak_kecil.qty,
          unit: element.sak_kecil.satuan,
        });
      }
      if (element.plastik.qty != 0) {
        data.push({
          date: element.date,
          vendor: element.vendor,
          name: 'Plastik',
          price: element.plastik.price,
          qty: element.plastik.qty,
          unit: element.plastik.satuan,
        });
      }
    });
    this.salesArray = data;
    // return data;
  }
  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }
}
