import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';
import { createReadStream } from 'fs';
import { CsvParser } from 'csv-parser';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { DeleteApiService } from '../services/delete-api/delete-api.service';
import { SpinnerService } from '../services/spinner/spinner.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.development';

const baseApi = environment.baseApi;

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.css'],
})
export class WriteOffComponent {
  baseApi = baseApi
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'writeOff', // the id of html/table element
  };
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  @ViewChild('inputPicture') inputPicture!: ElementRef;
  @ViewChild('inputCsv') inputCsv!: ElementRef;

  // Tools
  searchInput: any;
  itemPerPage: number = 7;

  // Api
  writeOffApi: any[] = [];
  blobImage: any;

  // Boolean
  exportBool: Boolean = false;
  uploadBool: Boolean = false;

  imgSrc: any;
  csvRecords: any[] = [];

  // Form
  receiveForm = this.formBuilder.group({
    id: '0',
    received: null,
    picture: [null as File | null],
    note: '',
  });

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
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxCsvParser: NgxCsvParser,
    private deleteService:DeleteApiService,
    public authService:AuthService
  ) {
    spinnerService.onCallSpinner(true)
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    forkJoin(apiService.writeOffGet()).subscribe((res) => {
      this.writeOffApi = res[0];
      spinnerService.onCallSpinner(false)
    }, err=>{
      this.alertService.onCallAlert(
        'Data cannot loaded, server error !',
        AlertType.Error
      )
      spinnerService.onCallSpinner(false)
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

  changePicture(data: any) {
    if (data.target.files[0]) {
      this.receiveForm.patchValue({ picture: data.target.files[0] });
      this.imgSrc = URL.createObjectURL(data.target.files[0]);
    } else {
      this.imgSrc = '';
      console.log(this.imgSrc);
    }
  }

  changeCsv(data: any) {
    // console.log(data.target.files[0].text());
    let reader: FileReader = new FileReader();
    reader.readAsText(data.target.files[0]);
    reader.onload = (e) => {
      let csv = reader.result;
      // console.log(csv);
    };
    this.ngxCsvParser
      .parse(data.target.files[0], { header: true, delimiter: ';' })
      .pipe()
      .subscribe(
        (result: any) => {
          // console.log('Result', result);
          this.csvRecords = result;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  closeCsvPreview() {
    const dataTransfer = new DataTransfer();
    this.inputCsv.nativeElement.files = dataTransfer.files;
    this.csvRecords = [];
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  updateModal(data: any) {
    // console.log(data);
    if (data != null) {
      this.uploadBool = true;
      this.receiveForm.controls['id'].setValue(data.id);
      this.receiveForm.controls['received'].setValue(data.received);
      if (data.picture != null ) {
        this.apiService.writeOffImage(data.id).subscribe((res: any) => {
          this.blobImage = new Blob([res], { type: 'image/png' });
          const filee = new File([this.blobImage], data.id + '.png', {
            type: 'image/png',
          });
          // console.log(filee);
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(filee);
          this.inputPicture.nativeElement.files = dataTransfer.files;
          this.imgSrc = URL.createObjectURL(filee);
          
          this.receiveForm.patchValue({ picture: filee });
        });
      }
    } else {
      this.uploadBool = false;
      const dataTransfer = new DataTransfer();
      this.inputPicture.nativeElement.files = dataTransfer.files;
      this.imgSrc = '';
    }
    
  }

  deleteRow(data: any) {
    const fun = 'this.apiService.writeOffDelete(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: '' + data.asset + ' (' + data.year + '~' + data.quartal +')',
      func: fun,
    });
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
    this.apiService.writeOffUpdate(formData).subscribe((res) => {
      // console.log(res);
      this.alertService.onCallAlert(
        'Update Write Off Success!',
        AlertType.Success
      );
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url);
      this.updateModal(null);
    });
  }

  storeCsv() {
    console.log(this.csvRecords);
    if (this.csvRecords.length != 0) {
      this.apiService.writeOffPost(this.csvRecords).subscribe(
        (res) => {
          console.log(res);
          this.alertService.onCallAlert(
            'Upload Csv Success!',
            AlertType.Success
          );
          this.closeCsvPreview();
        },
        (err) => {
          console.log(err);
          this.alertService.onCallAlert('Upload Csv Error!', AlertType.Error);
        }
      );
    } else {
      this.alertService.onCallAlert('Csv row is null!', AlertType.Error);
    }
  }
}
