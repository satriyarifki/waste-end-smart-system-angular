import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

const passbox = [
  {
    date: 'Juli 5, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 1,
    qty: 20,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 6, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 3,
    qty: 12,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 7, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 2,
    qty: 10,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 8, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 5,
    qty: 15,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 9, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 4,
    qty: 16,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 10, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 9,
    qty: 10,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 11, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 8,
    qty: 22,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 12, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 7,
    qty: 10,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 13, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 10,
    qty: 15,
    satuan: 'kg',
    pic: 'Adinda',
  },
  {
    date: 'Juli 14, 2023',
    line: 'OC1',
    lot: '12.32.56',
    name: 'Preform',
    noBag: 11,
    qty: 14,
    satuan: 'kg',
    pic: 'Adinda',
  },
];

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
  dataPassbox = passbox;
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
    forkJoin(apiService.passboxOc2Get()).subscribe((data) => {
      this.passboxApi = data[0];
      this.config.totalItems = this.passboxApi.length;
      // console.log(this.passboxApi[0]);
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
