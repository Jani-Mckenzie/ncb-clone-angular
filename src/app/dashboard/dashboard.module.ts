import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


import { DashboardPageComponent } from './dashboardpage/dashboardpage.component';
import { TopUpComponent } from './top-up/top-up.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransferComponent } from './transfer/transfer.component';
import { BillpayComponent } from './billpay/billpay.component';

import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    TopUpComponent,
    AccountsComponent,
    TransferComponent,
    DashboardPageComponent,
    BillpayComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
