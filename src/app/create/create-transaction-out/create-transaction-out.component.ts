import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-transaction-out',
  templateUrl: './create-transaction-out.component.html',
  styleUrls: ['./create-transaction-out.component.css'],
})
export class CreateTransactionOutComponent {

  //FORM
  form!:FormGroup

  //API
  arrayItem: any[] = [];
  vendorsApi: any[] = [];
  pricesApi: any[] = [];
  salesApi: any;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    spinner.show();
    this.arrayItem.push('item', '', '', '');
    console.log(this.arrayItem);
    this.initialForm()
    forkJoin(apiService.salesIdGet(1),apiService.vendorGet(),apiService.priceGet()).subscribe(
      ([sales,vendor,price]) => {
        this.salesApi = sales;
        this.vendorsApi = vendor
        this.pricesApi = price
        console.log(this.vendorsApi);
        console.log(this.pricesApi);
        spinner.hide();
        console.log(this.salesToArray);
      },
      (err) => {
        console.log(err);
        
        this.alertService.onCallAlert(
          'Data cannot loaded, server error !',
          AlertType.Error
        ),
          spinner.hide();
      }
    );
    
    
  }

  get f(){
    return this.form.value
  }

  initialForm(){
    this.form = this.formBuilder.group({
      date: ['',Validators.required ],
      vendorId: [0, Validators.required ]
    })
  }

  get salesToArray(): any[] {
    // let {dataFilter = this.dataSales.filter((val) => val.date == date)[0];
    let dataArray: any[] = [];
    dataArray.push(
      {name: 'Balok',qty: this.salesApi?.balok, price: this.salesApi?.balok, satuan: 'kg'},
      {name: 'Besi',qty: this.salesApi?.besi, price: this.salesApi?.besi, satuan: 'kg'},
      {name: 'Botol Plastik',qty: this.salesApi?.botol_plastik, price: this.salesApi?.botol_plastik, satuan: 'kg'},
      {name: 'Drum',qty: this.salesApi?.drum, price: this.salesApi?.drum, satuan: 'pcs'},
      {name: 'Jerigen',qty: this.salesApi?.jerigen, price: this.salesApi?.jerigen, satuan: 'pcs'},
      {name: 'Karton',qty: this.salesApi?.karton, price: this.salesApi?.karton, satuan: 'kg'},
      {name: 'Pallet Kayu',qty: this.salesApi?.pallet_kayu, price: this.salesApi?.pallet_kayu, satuan: 'pcs'},
      {name: 'Pallet Plastik',qty: this.salesApi?.pallet_plastik, price: this.salesApi?.pallet_plastik, satuan: 'pcs'},
      // {name: 'Plastik',qty: this.salesApi?.plastik, price: this.salesApi?.plastik, satuan: 'kg'},
      {name: 'Preform',qty: this.salesApi?.preform, price: this.salesApi?.preform, satuan: 'kg'},
      {name: 'Resin',qty: this.salesApi?.resin, price: this.salesApi?.resin, satuan: 'kg'},
      {name: 'Sak Besar',qty: this.salesApi?.sak_besar, price: this.salesApi?.sak_besar, satuan: 'pcs'},
      {name: 'Sak Kecil',qty: this.salesApi?.sak_kecil, price: this.salesApi?.sak_kecil, satuan: 'pcs'}
    );
    // console.log(dataArray);
    
    return dataArray;
  }

  plusItemLoop() {
    // this.itemLoop++;
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  popItemLoop() {
    // this.itemLoop--;

    const t = this.arrayItem.pop();

    console.log(this.arrayItem);
  }
}
