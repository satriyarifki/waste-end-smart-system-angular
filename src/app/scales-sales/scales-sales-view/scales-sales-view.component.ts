import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EditReportService } from 'src/app/services/edit-report/edit-report.service';

@Component({
  selector: 'app-scales-sales-view',
  templateUrl: './scales-sales-view.component.html',
  styleUrls: ['./scales-sales-view.component.css'],
})
export class ScalesSalesViewComponent {
  dataParams: any = this.actRouter.snapshot.queryParamMap;
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  // Tools
  searchInput: any;
  itemPerPage: number = 7;

  // Api
  salesApi: any[] = [];

  // Boolean
  exportBool: Boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.salesApi.length,
  };
  constructor(
    private exportAsService: ExportAsService,
    private apiService: ApiService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private editReportService: EditReportService
  ) {
    // console.log(this.dataParams.get('date'));
    // console.log(this.dataParams.get('lot'));
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    forkJoin(
      apiService.tpsOnSalesByDateGet(this.dataParams.get('date'))
    ).subscribe(([sales]) => {
      this.salesApi = sales;
      this.config.totalItems = this.salesApi.length;
      // console.log(this.salesApi);
      
      // console.log(tpsFilter);
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

  editModalChange(item:any){
    this.editReportService.onCallEdit({data:item,name:'Sales'})

    
    // if (item) {
    //   this.editModal = true
    // } else {
    //   this.editModal = false
    // }
  }
}
