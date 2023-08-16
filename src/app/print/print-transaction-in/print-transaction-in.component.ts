import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActualAug } from 'src/app/dashboard-sales/db_sales';

const data = [
  { nama: 'Jerigen', qty: 20, satuan: 'Kg', harga: 17500 },
  { nama: 'Botol Plastik', qty: 765, satuan: 'Kg', harga: 5000 },
  { nama: 'Balok', qty: 0, satuan: 'Kg', harga: 3800 },
  { nama: 'Palet Plastik', qty: 0, satuan: 'pc', harga: 42000 },
  { nama: 'Palet Kayu', qty: 0, satuan: 'Kg', harga: 8000 },
  { nama: 'Karton', qty: 341, satuan: 'Kg', harga: 1500 },
  { nama: 'Plastik/Label', qty: 0, satuan: 'Kg', harga: 2750 },
  { nama: 'Sak Kecil', qty: 920, satuan: 'pc', harga: 900 },
  { nama: 'Sak Besar', qty: 10, satuan: 'pc', harga: 13200 },
  { nama: 'Drum', qty: 0, satuan: 'pc', harga: 55000 },
  { nama: 'Preform', qty: 1413, satuan: 'Kg', harga: 7200 },
];

@Component({
  selector: 'app-print-transaction-in',
  templateUrl: './print-transaction-in.component.html',
  styleUrls: ['./print-transaction-in.component.css'],
})
export class PrintTransactionInComponent {
  dateNow = new Date();

  //API
  dataRekap = data;
  dataSales = ActualAug;
  paramSales = history.state;

  constructor(private router: Router) {
    console.log(history.state);
    // console.log(location.getState());

    console.log(this.filterSalesByDate(this.paramSales.date));
  }
  ngOnInit() {
    // console.log(history.state);
    // console.log(this.location.get);
  }
  toDefaultDate(date: any) {
    return new Date(date);
  }

  SalesToArrayByDate(date: any): any[] {
    let dataFilter = this.dataSales.filter((val) => val.date == date)[0];
    let dataArray: any[] = [];
    dataArray.push(
      dataFilter.balok,
      dataFilter.besi,
      dataFilter.botol,
      dataFilter.drum,
      dataFilter.karton,
      dataFilter.palet_kayu,
      dataFilter.palet_plastik,
      dataFilter.plastik,
      dataFilter.preform,
      dataFilter.resin,
      dataFilter.sak_besar,
      dataFilter.sak_kecil
    );
    return dataArray;
  }
  filterSalesByDate(date: any){
    return this.dataSales.filter((val) => val.date == date)[0];
  }
}
