import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-scales-sales',
  templateUrl: './scales-sales.component.html',
  styleUrls: ['./scales-sales.component.css']
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
    private actRouter: ActivatedRoute
  ) {
    forkJoin(
      apiService.tpsGet()
      
    ).subscribe(([ tps]) => {
      // this.passboxApi = passboxOc2;
      this.tpsApi = tps;
      this.config.totalItems = this.passboxApi.length;
      console.log(tps);
      // console.log(this.filterTpsByBag('bag3'));
    });
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

  filterTpsByBag(bag: any) {
    return this.tpsApi.filter(
      (value: any) =>
        value.global_variable_2 != null && value.global_variable_2 == bag
    );
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    console.log(this.config.itemsPerPage);
  }
  exportDropdown() {
    this.exportBool = !this.exportBool;
  }

  onPageChange(event: any) {
    console.log(event);
    this.config.currentPage = event;
  }
}
