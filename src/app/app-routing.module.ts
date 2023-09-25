import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreatePassboxComponent } from './create/create-passbox/create-passbox.component';
import { CreateTransactionInComponent } from './create/create-transaction-in/create-transaction-in.component';
import { CreateTransactionOutComponent } from './create/create-transaction-out/create-transaction-out.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintTransactionInComponent } from './print/print-transaction-in/print-transaction-in.component';
import { ScalesPassboxOc1Component } from './scales-passbox-oc1/scales-passbox-oc1.component';
import { ScalesPassboxOc2Component } from './scales-passbox-oc2/scales-passbox-oc2.component';
import { ScalesPassboxComponent } from './scales-passbox/scales-passbox.component';
import { ScalesSalesViewComponent } from './scales-sales/scales-sales-view/scales-sales-view.component';
import { ScalesSalesComponent } from './scales-sales/scales-sales.component';
import { ScalesTpsViewComponent } from './scales-tps/scales-tps-view/scales-tps-view.component';
import { ScalesTpsComponent } from './scales-tps/scales-tps.component';
import { onAuthGuard } from './services/guard/on-auth.guard';
import { outAuthGuard } from './services/guard/out-auth.guard';
import { StockBarangComponent } from './stock-barang/stock-barang.component';
import { SystemFlowComponent } from './system-flow/system-flow.component';
import { TransactionInComponent } from './transaction-in/transaction-in.component';
import { TransactionOutComponent } from './transaction-out/transaction-out.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard-sales', component: DashboardSalesComponent },
  { path: 'login', component: LoginComponent, canActivate: [outAuthGuard] },
  { path: 'stock-barang', component: StockBarangComponent },
  { path: 'transaction-in', component: TransactionInComponent },
  { path: 'transaction-out', component: TransactionOutComponent },
  { path: 'transaction-in/create', component: CreateTransactionInComponent, canActivate: [onAuthGuard]},
  { path: 'transaction-out/create', component: CreateTransactionOutComponent, canActivate: [onAuthGuard] },
  { path: 'transaction-in/print/:id', component: PrintTransactionInComponent },
  // { path: 'scales-passbox', component: ScalesPassboxComponent },
  { path: 'scales-passbox/create', component: CreatePassboxComponent, canActivate: [onAuthGuard] },
  { path: 'scales-passbox/oc1', component: ScalesPassboxOc1Component },
  { path: 'scales-passbox/oc2', component: ScalesPassboxOc2Component },
  { path: 'scales-tps', component: ScalesTpsComponent },
  { path: 'scales-tps/view', component: ScalesTpsViewComponent },
  { path: 'scales-sales', component: ScalesSalesComponent },
  { path: 'scales-sales/view', component: ScalesSalesViewComponent },
  { path: 'system-flow', component: SystemFlowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
