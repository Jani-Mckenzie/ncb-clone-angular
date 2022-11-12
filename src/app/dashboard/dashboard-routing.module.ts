import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

import { AccountDetailsComponent } from './accounts/account-details/account-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BillpayComponent } from './billpay/billpay.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './dashboardpage/dashboardpage.component';
import { TopUpComponent } from './top-up/top-up.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboardpage', component: DashboardPageComponent },
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'account-detail:id', component: AccountDetailsComponent, canActivate: [AuthGuard] },
      { path: 'top-up', component: TopUpComponent, canActivate: [AuthGuard] },
      { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
      { path: 'billpay', component: BillpayComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboardpage', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
