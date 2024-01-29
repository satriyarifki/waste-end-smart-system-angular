import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.css'],
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
    id: '0',
    received: null,
    picture: null,
    note: '',
  });
  inputPicture:any

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
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    forkJoin(apiService.writeOffGet()).subscribe((res) => {
      this.writeOffApi = res[0];
    });
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

  changeReceived(data: any) {
    this.receiveForm.patchValue({ picture: data.target.files[0] });
    console.log(this.receiveForm.value);
  }
  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  uploadModal(data: any) {
    console.log(data);
    if (data != null) {
      this.uploadBool = true;
      this.receiveForm.controls['id'].setValue(data.id);
      this.receiveForm.controls['received'].setValue(data.received);
      
      this.inputPicture = ('http://127.0.0.1:3881/api/write-off/picture/'+ data.id)
      console.log(this.inputPicture);
      
    } else {
      this.uploadBool = false;
    }
  }

  onPageChange(event: any) {
    // console.log(event);
    this.config.currentPage = event;
  }
  submitUpload() {
    const formData = new FormData();
    formData.append('id', this.receiveForm.value.id!);
    formData.append('note', this.receiveForm.value.note!);
    formData.append('picture', this.receiveForm.value.picture!);
    formData.append('received', this.receiveForm.value.received!);
    console.log(formData.getAll('picture'));
    this.apiService.writeOffUpdate(formData).subscribe((res) => {
      console.log(res);
      this.alertService.onCallAlert('Update Write Off Success!', AlertType.Success)
      this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(this.router.url);
      this.uploadModal(null)
    });
  }
}
