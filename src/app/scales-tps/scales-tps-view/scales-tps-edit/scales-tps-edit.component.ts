import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scales-tps-edit',
  templateUrl: './scales-tps-edit.component.html',
  styleUrls: ['./scales-tps-edit.component.css']
})
export class ScalesTpsEditComponent {
  @Input() dataScales:any
  @Output() editModalEvent = new EventEmitter<Boolean>()

  // API
  productsApi:any[] = []
  suppliersApi:any[] = []
  linesApi:any[] = []

  form = this.formBuilder.group({
    id: 0,
    global_variable_1: '',
    global_variable_2: '',
    global_variable_3: '',
    line_code: '',
    line_name: '',
    netto: '',
    gross: '',
    supplier_code: '',
    supplier_name: '',
    product_code: '',
    product_name: '',
  })

  constructor(private formBuilder:FormBuilder, private apiService:ApiService,private alertService:AlertService){
    forkJoin(apiService.productsGet(),apiService.suppliersGet(),apiService.linesGet()).subscribe(res=>{
      this.productsApi = res[0]
      this.suppliersApi = res[1]
      this.linesApi = res[2]
      
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.form.controls['id'].setValue(this.dataScales?.id)
    this.form.controls['global_variable_1'].setValue(this.dataScales?.global_variable_1)
    this.form.controls['global_variable_2'].setValue(this.dataScales?.global_variable_2)
    this.form.controls['line_code'].setValue(this.dataScales?.line_code)
    this.form.controls['netto'].setValue(this.dataScales?.netto)
    this.form.controls['product_code'].setValue(this.dataScales?.product_code)
    this.form.controls['supplier_code'].setValue(this.dataScales?.supplier_code)
    
  }

  onUpdate(){
    this.form.controls['line_name'].setValue(this.filterDataByCode(this.form.value.line_code,'line').name)
    this.form.controls['product_name'].setValue(this.filterDataByCode(this.form.value.product_code,'product').name)
    this.form.controls['supplier_name'].setValue(this.filterDataByCode(this.form.value.supplier_code,'supplier').name)
    this.form.controls['global_variable_3'].setValue(this.form.value.global_variable_2!)
    this.form.controls['gross'].setValue(this.form.value.netto!)
    console.log(this.form.value);
    this.apiService.updateReport(this.form.value).subscribe(res=>{
      // console.log(res);
      this.alertService.onCallAlert('Update TPS ('+ this.form.value.id +') Success',AlertType.Success)
      
    }) 
  }

  closeModal(){
    this.editModalEvent.emit(false)
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

    return
  }
}
