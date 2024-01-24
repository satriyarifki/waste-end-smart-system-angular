import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, timeout } from 'rxjs';
import { ActualAug } from 'src/app/dashboard-sales/db_sales';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import { font } from './Outfit-normal';
import html2canvas from 'html2canvas';

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
  @ViewChild('content') content!: ElementRef;

  //API
  dataRekap = data;
  dataSales = ActualAug;
  paramSales = history.state;
  salesViewApi: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    // console.log(history.state);

    // console.log(location.getState());

    // console.log(this.filterSalesByDate(this.paramSales.date));
  }
  ngOnInit() {
    // console.log(history.state);
    // console.log(this.location.get);
    // setTimeout(() => {
    //   window.print();
    // }, 500);
  }
  ngAfterViewInit(): void {
    // this.makePdf()
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  toDefaultDate(date: any) {
    return new Date(date);
  }

  makePdf() {
    let doc = new jsPDF('p', 'mm', 'a4');
    // html2canvas(this.content.nativeElement).then((canvas) => {
    //   var img = canvas.toDataURL('image/png');

    //   const imgWidth =
    //     doc.internal.pageSize.width - doc.internal.pageSize.width / 10;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width - 12;
    //   console.log(imgWidth);
    //   console.log(imgHeight);
      
    //   doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight);
    //   console.log(doc.getCurrentPageInfo());
    //   // doc.save(this.paramSales.vendor + ' ' + this.paramSales.date);
    //   // doc.output('dataurlnewwindow');
    // });

    doc.addFileToVFS('Outfit-normal.ttf', font);
    doc.addFont('Outfit-normal.ttf', 'Outfit', 'normal');

    doc.html(this.content.nativeElement, {
      callback: (doc) => {
        // doc.setPage(1)
        doc.setFont('Outfit');
        doc.output('dataurlnewwindow');
        // doc.save(this.paramSales.date);
      },
      width: 200,
      windowWidth: 800,
      margin: 5,
      fontFaces: [],
    });
  }

  SalesToArrayByDate(): any[] {
    // let {dataFilter = this.dataSales.filter((val) => val.date == date)[0];
    let dataArray: any[] = [];
    dataArray.push(
      {
        name: 'Balok',
        qty: this.paramSales.balok_qty,
        price: this.paramSales.balok_price,
        satuan: 'kg',
      },
      {
        name: 'Besi',
        qty: this.paramSales.besi_qty,
        price: this.paramSales.besi_price,
        satuan: 'kg',
      },
      {
        name: 'Botol Plastik',
        qty: this.paramSales.botol_plastik_qty,
        price: this.paramSales.botol_plastik_price,
        satuan: 'kg',
      },
      {
        name: 'Drum',
        qty: this.paramSales.drum_qty,
        price: this.paramSales.drum_price,
        satuan: 'pcs',
      },
      {
        name: 'Karton',
        qty: this.paramSales.karton_qty,
        price: this.paramSales.karton_price,
        satuan: 'kg',
      },
      {
        name: 'Pallet Kayu',
        qty: this.paramSales.pallet_kayu_qty,
        price: this.paramSales.pallet_kayu_price,
        satuan: 'pcs',
      },
      {
        name: 'Pallet Plastik',
        qty: this.paramSales.pallet_plastik_qty,
        price: this.paramSales.pallet_plastik_price,
        satuan: 'pcs',
      },
      // {name: 'Plastik',qty: this.paramSales.plastik_qty, price: this.paramSales.plastik_price, satuan: 'kg'},
      {
        name: 'Preform',
        qty: this.paramSales.preform_qty,
        price: this.paramSales.preform_price,
        satuan: 'kg',
      },
      {
        name: 'Resin',
        qty: this.paramSales.resin_qty,
        price: this.paramSales.resin_price,
        satuan: 'kg',
      },
      {
        name: 'Sak Besar',
        qty: this.paramSales.sak_besar_qty,
        price: this.paramSales.sak_besar_price,
        satuan: 'pcs',
      },
      {
        name: 'Sak Kecil',
        qty: this.paramSales.sak_kecil_qty,
        price: this.paramSales.sak_kecil_price,
        satuan: 'pcs',
      }
    );
    // console.log(dataArray);

    return dataArray;
  }
  filterSalesByDate(date: any) {
    return this.dataSales.filter((val) => val.date == date)[0];
  }
}
