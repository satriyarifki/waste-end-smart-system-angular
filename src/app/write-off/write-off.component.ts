import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.css']
})
export class WriteOffComponent {
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'writeOff', // the id of html/table element
  };
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  // Tools
  searchInput: any;
  itemPerPage: number = 7;

  // Api
  writeOffApi: any[] = [];

  // Boolean
  exportBool: Boolean = false;
  uploadBool: Boolean = false;

  // Form
  receiveForm = this.formBuilder.group({
    id: 0,
    received: null,
    picture: null,
    note: ''
  })

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.writeOffApi.length,
  };
  constructor(
    private exportAsService: ExportAsService,
    private apiService: ApiService,
    private actRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder:FormBuilder
  ) {
    forkJoin(apiService.writeOffGet()).subscribe(res=>{
      this.writeOffApi = res[0]
      
    })
  }
  export(type: any) {
    this.exportAsConfig.type = type;

    // download the file using old school javascript method
    this.exportAsService
      .save(this.exportAsConfig, 'Write Off')
      .subscribe(() => {
        // save started
        console.log('Success');
      });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe((content: any) => {
    //   console.log(content);
    // });
  }

  changeReceived(data:any){
    console.log(data);
    this.receiveForm.patchValue({picture:data.target.files[0]})
    console.log(this.receiveForm.value);
    
    
  }
  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  uploadModal(data:any){
    console.log(data);
    if (data!=null) {
      this.uploadBool = true
      this.receiveForm.controls['id'].setValue(data.id)
      this.receiveForm.controls['received'].setValue(data.received)
      
    } else {

      this.uploadBool = false
    }
  }

  onPageChange(event: any) {
    // console.log(event);
    this.config.currentPage = event;
  }
  submitUpload(){
    console.log(this.receiveForm.value);
    this.apiService.writeOffUpdate(this.receiveForm.value).subscribe(res=>{
      console.log(res);
      
    })
  }
}