import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';

const stockBarang = [
  { name: 'Preform OC1', qty: 20, satuan: 'kg', hargaSatuan: 7300, ppn: 11 },
  { name: 'Preform OC2', qty: 21, satuan: 'kg', hargaSatuan: 7300, ppn: 11 },
  { name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11 },
  { name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11 },
  { name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11 },
  { name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11 },
  { name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11 },
  { name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11 },
  { name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11 },
  { name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11 },
  { name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11 },
  { name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11 },
];
const passbox = [
  { date: 'Juli 5, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:1, qty: 20, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 6, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:3, qty: 12, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 7, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:2, qty: 10, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 8, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:5, qty: 15, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 9, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:4, qty: 16, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 10, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:9, qty: 10, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 11, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:8, qty: 22, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 12, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:7, qty: 10, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 13, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:10, qty: 15, satuan: 'kg', pic: 'Adinda' },
  { date: 'Juli 14, 2023', line: 'OC1', lot:'12.32.56',name: 'Preform', noBag:11, qty: 14, satuan: 'kg', pic: 'Adinda' }

];

@Component({
  selector: 'app-scales-passbox',
  templateUrl: './scales-passbox.component.html',
  styleUrls: ['./scales-passbox.component.css'],
})
export class ScalesPassboxComponent {
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  // Tools
  searchInput: any;
  itemPerPage: number = 7;

  // Api
  stock = stockBarang;
  dataPassbox = passbox;

  // Boolean
  exportBool: Boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.stock.length,
  };
  constructor(private exportAsService: ExportAsService) {}

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
 
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  onPageChange(event: any) {
    console.log(event);
    this.config.currentPage = event;
  }
}
