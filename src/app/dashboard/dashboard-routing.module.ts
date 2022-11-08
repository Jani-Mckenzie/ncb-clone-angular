import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      { path: 'accounts', component: AccountsComponent },
      { path: 'account-detail:id', component: AccountDetailsComponent },
      { path: 'top-up', component: TopUpComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'billpay', component: BillpayComponent },
      { path: '', redirectTo: 'dashboardpage', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
