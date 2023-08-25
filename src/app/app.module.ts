import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { StockBarangComponent } from './stock-barang/stock-barang.component';
import { CustomFilterPipe } from './pipe/custom-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionInComponent } from './transaction-in/transaction-in.component';
import { TransactionOutComponent } from './transaction-out/transaction-out.component';
import { CreateTransactionInComponent } from './create/create-transaction-in/create-transaction-in.component';
import { CreateTransactionOutComponent } from './create/create-transaction-out/create-transaction-out.component';
import { PrintTransactionInComponent } from './print/print-transaction-in/print-transaction-in.component';
import { ExportAsModule } from 'ngx-export-as';
import { ScalesPassboxComponent } from './scales-passbox/scales-passbox.component';
import { ScalesTpsComponent } from './scales-tps/scales-tps.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { SystemFlowComponent } from './system-flow/system-flow.component';
import { ScalesPassboxOc1Component } from './scales-passbox-oc1/scales-passbox-oc1.component';
import { ScalesPassboxOc2Component } from './scales-passbox-oc2/scales-passbox-oc2.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { HttpClientModule } from '@angular/common/http';
import { ScalesTpsViewComponent } from './scales-tps/scales-tps-view/scales-tps-view.component';
import { CreatePassboxOc1Component } from './create/create-passbox-oc1/create-passbox-oc1.component';
import { CreatePassboxComponent } from './create/create-passbox/create-passbox.component';
import { ScalesSalesComponent } from './scales-sales/scales-sales.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertComponent } from './layouts/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    StockBarangComponent,
    CustomFilterPipe,
    TransactionInComponent,
    TransactionOutComponent,
    CreateTransactionInComponent,
    CreateTransactionOutComponent,
    PrintTransactionInComponent,
    ScalesPassboxComponent,
    ScalesTpsComponent,
    DashboardSalesComponent,
    SystemFlowComponent,
    ScalesPassboxOc1Component,
    ScalesPassboxOc2Component,
    TooltipDirective,
    ScalesTpsViewComponent,
    CreatePassboxOc1Component,
    CreatePassboxComponent,
    ScalesSalesComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    NgxPaginationModule,
    ExportAsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
