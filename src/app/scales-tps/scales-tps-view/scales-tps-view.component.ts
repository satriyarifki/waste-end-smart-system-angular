import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditReportService } from 'src/app/services/edit-report/edit-report.service';

@Component({
  selector: 'app-scales-tps-view',
  templateUrl: './scales-tps-view.component.html',
  styleUrls: ['./scales-tps-view.component.css'],
})
export class ScalesTpsViewComponent {
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
  passboxApi: any[] = [];
  tpsApi: any[] = [];

  //
  editData:any

  // Boolean
  exportBool: Boolean = false;
  editModal:Boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.passboxApi.length,
  };
  constructor(
    private router:Router,
    private exportAsService: ExportAsService,
    private apiService: ApiService,
    private actRouter: ActivatedRoute,
    private editReportService: EditReportService,
    public authService:AuthService
  ) {
    
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    forkJoin(
      apiService.passboxByLotGet(
        this.dataParams.get('line'),
        this.dataParams.get('lot')
      ),
      apiService.tpsByLotLineGet(
        this.dataParams.get('line'),
        this.dataParams.get('lot')
      )
    ).subscribe(([passboxOc2, tpsFilter]) => {
      this.passboxApi = passboxOc2;
      this.tpsApi = tpsFilter;
      this.config.totalItems = this.passboxApi.length;
      // console.log(tpsFilter);
      // console.log(this.passboxApi);
      
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
        value.global_variable_1 != null &&
        String(value.global_variable_1).toLowerCase() ==
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

  editModalChange(item:any){
    this.editData = item
    console.log(this.editData);
    this.editReportService.onCallEdit({data:item,name:'TPS'})

    
    // if (item) {
    //   this.editModal = true
    // } else {
    //   this.editModal = false
    // }
  }
}
