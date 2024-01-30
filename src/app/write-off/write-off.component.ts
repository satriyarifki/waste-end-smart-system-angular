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
  csvRecords:any[] = [];

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
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxCsvParser: NgxCsvParser
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
    console.log(data.target.files[0].text());
    let reader: FileReader = new FileReader();
    reader.readAsText(data.target.files[0]);
    reader.onload = (e) => {
      let csv = reader.result;
      // console.log(csv);
    };
    let results:any[] = [];
    // createReadStream(data.target.files[0]).pipe(CsvParser())
    // .on('data', (data:any) => results.push(data))
    // .on('end', () => {
    //   console.log(results);
    //   // [
    //   //   { NAME: 'Daffy Duck', AGE: '24' },
    //   //   { NAME: 'Bugs Bunny', AGE: '22' }
    //   // ]
    // });
    this.ngxCsvParser.parse(data.target.files[0], { header: true, delimiter: ';' })
      .pipe().subscribe((result: any) => {

        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  closeCsvPreview(){
    const dataTransfer = new DataTransfer();
    this.inputCsv.nativeElement.files = dataTransfer.files
    this.csvRecords = []
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  uploadModal(data: any) {
    // console.log(data);
    if (data != null) {
      this.uploadBool = true;
      this.receiveForm.controls['id'].setValue(data.id);
      this.receiveForm.controls['received'].setValue(data.received);
      this.apiService.writeOffImage(data.id).subscribe((res: any) => {
        this.blobImage = new Blob([res], { type: 'image/png' });
        const filee = new File([this.blobImage], 'ímm.png', {
          type: 'image/png',
        });
        // console.log(filee);
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(filee);
        this.inputPicture.nativeElement.files = dataTransfer.files;
        this.imgSrc = URL.createObjectURL(filee);
        this.receiveForm.patchValue({ picture: filee });
      });
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
    this.apiService.writeOffUpdate(formData).subscribe((res) => {
      // console.log(res);
      this.alertService.onCallAlert(
        'Update Write Off Success!',
        AlertType.Success
      );
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url);
      this.uploadModal(null);
    });
  }
}
