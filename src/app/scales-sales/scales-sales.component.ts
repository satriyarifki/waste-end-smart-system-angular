import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-scales-sales',
  templateUrl: './scales-sales.component.html',
  styleUrls: ['./scales-sales.component.css'],
})
export class ScalesSalesComponent {
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
  tpsApi: any[] = [];
  salesGroupApi: any[] = [];

  // Boolean
  exportBool: Boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.salesGroupApi.length,
  };
  constructor(
    private exportAsService: ExportAsService,
    private apiService: ApiService,
    private actRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {
    spinner.show();
    forkJoin(
      apiService.tpsOnSalesGet(),
      apiService.tpsOnSalesGroupGet()
    ).subscribe(
      ([tps, salesGroup]) => {
        // this.passboxApi = passboxOc2;
        this.tpsApi = tps;
        this.salesGroupApi = salesGroup;
        console.log(salesGroup);

        this.tpsApi = this.tpsApi.sort((b, a) => {
          return (
            a.id - b.id
            // new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
          );
        });
        this.config.totalItems = this.salesGroupApi.length;
        // console.log(this.tpsApi);
        // console.log(this.filterTpsByBag('bag3'));
      },
      (err) => {
        console.log(err);

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

  filterTpsByBag(lot: any, bag: any) {
    return this.tpsApi.filter(
      (value: any) =>
        value.global_variable_1 == lot &&
        value.global_variable_2 != null &&
        String(value.global_variable_2).toLowerCase() ==
          String(bag).toLowerCase()
    );
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
