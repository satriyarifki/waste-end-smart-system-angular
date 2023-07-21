import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PaginationControlsDirective} from 'ngx-pagination';


const stockBarang = [
  {name: 'Preform OC1', qty: 20, satuan: 'kg', hargaSatuan: 7300, ppn: 11},
  {name: 'Preform OC2', qty: 21, satuan: 'kg', hargaSatuan: 7300, ppn: 11},
  {name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11},
  {name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11},
  {name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11},
  {name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11},
  {name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11},
  {name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11},
  {name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11},
  {name: 'Barang', qty: 20, satuan: 'pcs', hargaSatuan: 7300, ppn: 11},
  {name: 'Kursi', qty: 15, satuan: 'pcs', hargaSatuan: 300000, ppn: 11},
  {name: 'Meja', qty: 5, satuan: 'pcs', hargaSatuan: 500000, ppn: 11},
]
@Component({
  selector: 'app-stock-barang',
  templateUrl: './stock-barang.component.html',
  styleUrls: ['./stock-barang.component.css']
})
export class StockBarangComponent implements OnInit {
  ngOnInit(): void {
    
  }
  @ViewChild('p', { static: true}) pa: PaginationControlsDirective | any;
  
  searchInput: any;
  p: any;
  stock = stockBarang;
  config = {
    id: 'custom',
    itemsPerPage: 7,
    currentPage: 1,
    totalItems: this.stock.length
  };

  onPageChange(event:any){
    console.log(event);
    this.config.currentPage = event;
  }
}
