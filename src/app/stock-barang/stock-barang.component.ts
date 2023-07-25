import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
@Component({
  selector: 'app-stock-barang',
  templateUrl: './stock-barang.component.html',
  styleUrls: ['./stock-barang.component.css'],
})
export class StockBarangComponent {
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
    // this.exportAsService.get(this.exportAsConfig).subscribe((content: any) => {
    //   console.log(content);
    // });
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
