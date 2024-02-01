import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { EditReportService } from 'src/app/services/edit-report/edit-report.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent {
  modalName: String = '';
  dataParams: any;
  show: Boolean = false;

  // API
  productsApi:any[] = []
  suppliersApi:any[] = []
  linesApi:any[] = []
  customersApi:any[] = []

  units:any[] = ['kg', 'pcs']

  form = this.formBuilder.nonNullable.group({
    id: 0,
    global_variable_1: '',
    global_variable_2: '',
    global_variable_3: '',
    line_code: '',
    line_name: '',
    netto: '',
    gross: '',
    unit: '',
    supplier_code: '',
    supplier_name: '',
    customer_code: '',
    customer_name: '',
    product_code: '',
    product_name: '',
  })

  constructor(private router:Router,private editReportService: EditReportService,private formBuilder:FormBuilder, private apiService:ApiService,private alertService:AlertService){
    forkJoin(apiService.productsGet(),apiService.suppliersGet(),apiService.linesGet(),apiService.customersGet()).subscribe(res=>{
      this.productsApi = res[0]
      this.suppliersApi = res[1]
      this.linesApi = res[2]
      this.customersApi = res[3]
      
    })
  }
  callModal(params: any) {
    this.dataParams = params.data;
    this.modalName = params.name;
    this.show = true;

    this.form.controls['id'].setValue(this.dataParams?.id)
    this.form.controls['global_variable_1'].setValue(this.dataParams?.global_variable_1)
    this.form.controls['global_variable_2'].setValue(this.dataParams?.global_variable_2)
    this.form.controls['line_code'].setValue(this.dataParams?.line_code)
    this.form.controls['netto'].setValue(this.dataParams?.netto)
    this.form.controls['unit'].setValue(this.dataParams?.unit)
    this.form.controls['product_code'].setValue(this.dataParams?.product_code)
    this.form.controls['supplier_code'].setValue(this.dataParams?.supplier_code)
    this.form.controls['customer_code'].setValue(this.dataParams?.customer_code)
  }

  ngOnInit() {
    if (this.editReportService.subsVar == undefined) {
      this.editReportService.subsVar = this.editReportService.invokeEdit.subscribe(
        (params: any) => {
          if (params.data == undefined) {
            this.alertService.onCallAlert('Data '+ params.name +' Not Found!',AlertType.Error)
          } else {
            this.callModal(params);
          }
        }
      );
    }
    //
  }

  onUpdate(){
    this.form.controls['line_name'].setValue(this.filterDataByCode(this.form.value.line_code,'line').name)
    this.form.controls['product_name'].setValue(this.filterDataByCode(this.form.value.product_code,'product').name)
    this.form.controls['supplier_name'].setValue(this.filterDataByCode(this.form.value.supplier_code,'supplier').name)
    this.form.controls['customer_name'].setValue(this.filterDataByCode(this.form.value.customer_code,'customer').name)
    this.form.controls['global_variable_3'].setValue(this.form.value.global_variable_2!)
    this.form.controls['gross'].setValue(this.form.value.netto!)
    // console.log(this.form.value);
    this.apiService.updateReport(this.form.value).subscribe(res=>{
      // console.log(res);
      this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(this.router.url);
      this.alertService.onCallAlert('Update TPS ('+ this.form.value.id +') Success!',AlertType.Success)
      this.closeEdit()
      
    },
    err=>{
      console.log(err);
      this.alertService.onCallAlert('Update TPS ('+ this.form.value.id +') Failed!',AlertType.Error)
    }) 
  }

  closeEdit() {
    this.modalName = '';
    this.dataParams = '';
    this.form.reset()
    // console.log(this.form.value);
    
    this.show = false;
  }

  filterDataByCode(code:any, typeData:string){
    if (typeData.includes('product')) {
      return this.productsApi.filter(item=>item.code==code)[0]
    } 
    if (typeData.includes('line')) {
      return this.linesApi.filter(item=>item.code==code)[0]
    } 
    if (typeData.includes('supplier')) {
      return this.suppliersApi.filter(item=>item.code==code)[0]
    } 
    if (typeData.includes('customer')) {
      return this.customersApi.filter(item=>item.code==code)[0]
    } 

    return
  }
}
