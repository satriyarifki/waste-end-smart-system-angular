import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateTransactionInComponent } from './create/create-transaction-in/create-transaction-in.component';
import { CreateTransactionOutComponent } from './create/create-transaction-out/create-transaction-out.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintTransactionInComponent } from './print/print-transaction-in/print-transaction-in.component';
import { ScalesPassboxComponent } from './scales-passbox/scales-passbox.component';
import { StockBarangComponent } from './stock-barang/stock-barang.component';
import { SystemFlowComponent } from './system-flow/system-flow.component';
import { TransactionInComponent } from './transaction-in/transaction-in.component';
import { TransactionOutComponent } from './transaction-out/transaction-out.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard-sales', component: DashboardSalesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stock-barang', component: StockBarangComponent },
  { path: 'transaction-in', component: TransactionInComponent },
  { path: 'transaction-out', component: TransactionOutComponent },
  { path: 'transaction-in/create', component: CreateTransactionInComponent },
  { path: 'transaction-out/create', component: CreateTransactionOutComponent },
  { path: 'transaction-in/print/:id', component: PrintTransactionInComponent },
  { path: 'scales-passbox', component: ScalesPassboxComponent },
  { path: 'system-flow', component: SystemFlowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
