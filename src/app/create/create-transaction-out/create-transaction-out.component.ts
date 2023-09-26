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
  params = history.state
  //FORM
  form!: FormGroup;

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
    console.log(this.params);
    spinner.show();
    let paramForm
    if (this.params.total_qty) {
      console.log(this.params);
      
      console.log(new Date(this.params.created_at).toISOString().slice(0,10));
      const id = this.params.customer_name.includes('DESA')? 3 : this.params.customer_name.includes('TPS')? 1 : 2
      paramForm = {
        date: new Date(this.params.created_at).toISOString().slice(0,10),
        vendorId: id,
        preform: this.params.total_qty
      }
      
    } else {
      console.log('e');
      paramForm = {
        date: new Date().toISOString().slice(0,10),
        vendorId: 0,
        preform: 0
      }
    }
    this.initialForm(paramForm);
    forkJoin(
      apiService.salesIdGet(1),
      apiService.vendorGet(),
      apiService.priceGet()
    ).subscribe(
      ([sales, vendor, price]) => {
        this.salesApi = sales;
        this.vendorsApi = vendor;
        this.pricesApi = price;
        spinner.hide();
        // console.log(this.filterVendorById(2).price['resin']);
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

  get f() {
    return this.form.value;
  }

  initialForm(param:any) {
    this.form = this.formBuilder.group({
      date: [param.date, Validators.required],
      vendorId: [param.vendorId, Validators.required],
      alumunium: [0, Validators.min(0)],
      balok: [0, Validators.min(0)],
      besi: [0, Validators.min(0)],
      botol_plastik: [0],
      cap: [0],
      drum: [0],
      jerigen: [0],
      karton: [0],
      kertas: [0],
      pallet_kayu: [0],
      pallet_plastik: [0],
      plastik: [0],
      preform: [param.preform],
      resin: [0],
      sak_besar: [0],
      sak_kecil: [0],
      seng: [0],
      tembaga: [0],
      total_price: [0, Validators.required],
    });
  }

  get salesToArray(): any[] {
    // let {dataFilter = this.dataSales.filter((val) => val.date == date)[0];
    let dataArray: any[] = [];
    dataArray.push(
      {
        formName: 'balok',
        name: 'Balok',
        qty: this.salesApi?.balok,
        price: this.salesApi?.balok,
        satuan: 'kg',
      },
      {
        formName: 'besi',
        name: 'Besi',
        qty: this.salesApi?.besi,
        price: this.salesApi?.besi,
        satuan: 'kg',
      },
      {
        formName: 'botol_plastik',
        name: 'Botol Plastik',
        qty: this.salesApi?.botol_plastik,
        price: this.salesApi?.botol_plastik,
        satuan: 'kg',
      },
      {
        formName: 'drum',
        name: 'Drum',
        qty: this.salesApi?.drum,
        price: this.salesApi?.drum,
        satuan: 'pcs',
      },
      {
        formName: 'jerigen',
        name: 'Jerigen',
        qty: this.salesApi?.jerigen,
        price: this.salesApi?.jerigen,
        satuan: 'pcs',
      },
      {
        formName: 'karton',
        name: 'Karton',
        qty: this.salesApi?.karton,
        price: this.salesApi?.karton,
        satuan: 'kg',
      },
      {
        formName: 'pallet_kayu',
        name: 'Pallet Kayu',
        qty: this.salesApi?.pallet_kayu,
        price: this.salesApi?.pallet_kayu,
        satuan: 'pcs',
      },
      {
        formName: 'pallet_plastik',
        name: 'Pallet Plastik',
        qty: this.salesApi?.pallet_plastik,
        price: this.salesApi?.pallet_plastik,
        satuan: 'pcs',
      },
      {
        formName: 'preform',
        name: 'Preform',
        qty: this.salesApi?.preform,
        price: this.salesApi?.preform,
        satuan: 'kg',
      },
      {
        formName: 'resin',
        name: 'Resin',
        qty: this.salesApi?.resin,
        price: this.salesApi?.resin,
        satuan: 'kg',
      },
      {
        formName: 'sak_besar',
        name: 'Sak Besar',
        qty: this.salesApi?.sak_besar,
        price: this.salesApi?.sak_besar,
        satuan: 'pcs',
      },
      {
        formName: 'sak_kecil',
        name: 'Sak Kecil',
        qty: this.salesApi?.sak_kecil,
        price: this.salesApi?.sak_kecil,
        satuan: 'pcs',
      }
    );
    // console.log(dataArray);

    return dataArray;
  }

  onSubmit() {
    let total: number = 0;
    this.salesToArray.forEach((item) => {
      total +=
        this.filterVendorById(this.f.vendorId)?.price[item.formName] *
        this.f[item.formName];
    });
    this.f.total_price = total;
    // console.log(this.f);

    if (
      this.form.invalid
    ) {
      console.log(this.form);

      return;
    }
    console.log(this.f);
    // return
    this.apiService.salesPost(this.f).subscribe(
      (data) => {
        console.log('success');
        this.alertService.onCallAlert('Create Success!!',AlertType.Success)
      },
      (err) => {
        console.log(err);
      }
    );
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
  filterVendorById(id: any) {
    return this.vendorsApi.filter((data) => data.id == id)[0];
  }
  popItemLoop() {
    // this.itemLoop--;

    const t = this.arrayItem.pop();

    console.log(this.arrayItem);
  }
}
