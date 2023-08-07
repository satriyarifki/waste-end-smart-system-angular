import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import {NgxPaginationModule} from 'ngx-pagination';
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    NgxPaginationModule,
    ExportAsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
