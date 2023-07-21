import { Component, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';

const stockBarang = [
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
  selector: 'app-transaction-in',
  templateUrl: './transaction-in.component.html',
  styleUrls: ['./transaction-in.component.css'],
})
export class TransactionInComponent {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  searchInput: any;
  p: any;
  stock = stockBarang;
  config = {
    id: 'custom',
    itemsPerPage: 7,
    currentPage: 1,
    totalItems: this.stock.length,
  };

  onPageChange(event: any) {
    console.log(event);
    this.config.currentPage = event;
  }
}
