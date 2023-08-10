import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-scales-tps',
  templateUrl: './scales-tps.component.html',
  styleUrls: ['./scales-tps.component.css'],
})
export class ScalesTpsComponent {
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
    private apiService: ApiService
  ) {
    forkJoin(apiService.groupPassboxOc2Get()).subscribe((data) => {
      this.passboxApi = data[0];
      this.passboxApi = this.passboxApi.sort((b, a) => {
        return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
      });
      this.config.totalItems = this.passboxApi.length;
      console.log(this.passboxApi);
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
