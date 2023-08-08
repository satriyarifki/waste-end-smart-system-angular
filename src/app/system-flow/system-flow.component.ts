import { Component } from '@angular/core';

const TextDecs = [
  'PIC GA : \n Hasil penimbangan serah terima reject \n dari produksi tercatat di aplikasi',
  'PIC GA & PIC TPS: \n Verifikasi serah terima barang actual \n & dicatat di aplikasi',
  'PIC TPS & Vendor: \n Proses penjualan barang ke vendor. \n Hasil timbang & penjualan tercatat di aplikasi',
  'Dashboard data penjualan limbah (Montly & Yearly)',
];

@Component({
  selector: 'app-system-flow',
  templateUrl: './system-flow.component.html',
  styleUrls: ['./system-flow.component.css'],
})
export class SystemFlowComponent {
  textDescArray = TextDecs;
}
