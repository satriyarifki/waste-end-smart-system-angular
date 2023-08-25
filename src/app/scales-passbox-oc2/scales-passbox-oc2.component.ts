import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, timeout } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-scales-passbox-oc2',
  templateUrl: './scales-passbox-oc2.component.html',
  styleUrls: ['./scales-passbox-oc2.component.css'],
})
export class ScalesPassboxOc2Component {
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  // Tools
  searchInput: any;
  itemPerPage: number = 7;

  // Api
  passboxApi: any[] = [];

  // Boolean
  exportBool: Boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.passboxApi.length,
  };
  constructor(
    private exportAsService: ExportAsService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService:AlertService
  ) {
    spinner.show();
    forkJoin(apiService.passboxOc2Get()).subscribe(
      (data) => {
        this.passboxApi = data[0];
        this.config.totalItems = this.passboxApi.length;
        // console.log(this.passboxApi[0]);
      },
      (err) => {
        alertService.onCallAlert(
          'Data cannot loaded, server error !',
          AlertType.Error
        ),
          spinner.hide();
      },
      () => {
        spinner.hide();
      }
    );
  }

  export(type: any) {
    this.exportAsConfig.type = type;

    // download the file using old school javascript method
    this.exportAsService
      .save(this.exportAsConfig, 'Stock Table')
      .subscribe(() => {
        // save started
        console.log('Success');
      });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe((content: any) => {
    //   console.log(content);
    // });
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  onPageChange(event: any) {
    // console.log(event);
    this.config.currentPage = event;
  }
}
