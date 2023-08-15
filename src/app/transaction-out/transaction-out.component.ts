import { Component, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { ActualAug, harga } from '../dashboard-sales/db_sales';

const transactionBarang = [
  {
    id: 1,
    date: '17/07/2023',
    name: 'Preform OC1',
    qty: 20,
    satuan: 'kg',
    status: 'Rejected',
    pic: 'User',
    hargaSatuan: 7300,
    ppn: 11,
  },
  {
    id: 2,
    date: '17/07/2023',
    name: 'Preform OC2',
    qty: 21,
    satuan: 'kg',
    hargaSatuan: 7300,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 3,
    date: '17/07/2023',
    name: 'Barang',
    qty: 20,
    satuan: 'pcs',
    hargaSatuan: 7300,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 4,
    date: '17/07/2023',
    name: 'Kursi',
    qty: 15,
    satuan: 'pcs',
    hargaSatuan: 300000,
    ppn: 11,
    status: 'Rejected',
    pic: 'User',
  },
  {
    id: 5,
    date: '17/07/2023',
    name: 'Kursi',
    qty: 15,
    satuan: 'pcs',
    hargaSatuan: 300000,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 6,
    date: '17/07/2023',
    name: 'Meja',
    qty: 5,
    satuan: 'pcs',
    hargaSatuan: 500000,
    ppn: 11,
    status: 'Rejected',
    pic: 'User',
  },
  {
    id: 7,
    date: '17/07/2023',
    name: 'Barang',
    qty: 20,
    satuan: 'pcs',
    hargaSatuan: 7300,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 8,
    date: '17/07/2023',
    name: 'Meja',
    qty: 5,
    satuan: 'pcs',
    hargaSatuan: 500000,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 9,
    date: '17/07/2023',
    name: 'Kursi',
    qty: 15,
    satuan: 'pcs',
    hargaSatuan: 300000,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 10,
    date: '17/07/2023',
    name: 'Barang',
    qty: 20,
    satuan: 'pcs',
    hargaSatuan: 7300,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 11,
    date: '17/07/2023',
    name: 'Kursi',
    qty: 15,
    satuan: 'pcs',
    hargaSatuan: 300000,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
  {
    id: 12,
    date: '17/07/2023',
    name: 'Meja',
    qty: 5,
    satuan: 'pcs',
    hargaSatuan: 500000,
    ppn: 11,
    status: 'Accepted',
    pic: 'User',
  },
];

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
  transactions = transactionBarang;

  exportAsConfig: any;
  exportAsService: any;
  exportBool: boolean = false;

  //API
  sales_data = ActualAug;
  price_sales = harga;

  // Data Result
  salesArray: any[] = [];

  cobaState = { id: 1, name: 'Angula' };
  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.salesArray.length,
  };

  constructor() {
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
