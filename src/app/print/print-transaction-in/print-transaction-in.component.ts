import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  dateNow = new Date()
  dataRekap = data;
  dataJual = history.state

  constructor(private router: Router) {
    console.log(history.state);
    // console.log(location.getState());
    
    console.log(router.getCurrentNavigation()?.extras.state);
  }
  ngOnInit(){
    // console.log(history.state);
    // console.log(this.location.get);
  }
}
