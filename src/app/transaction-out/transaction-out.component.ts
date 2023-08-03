import { Component, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';

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
  styleUrls: ['./transaction-out.component.css']
})
export class TransactionOutComponent {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  searchInput: any;
  p: any;
  transactions = transactionBarang;
  exportAsConfig: any;
  exportAsService: any;
  exportBool: boolean = false;
  config = {
    id: 'custom',
    itemsPerPage: 7,
    currentPage: 1,
    totalItems: this.transactions.length,
  };

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
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }
}
