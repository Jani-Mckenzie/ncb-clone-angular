import { Account } from './../../shared/models/account.model';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardPageComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService) { }
  user: any;

  currentUser?: User;
  accounts?: any = [];
  transactions?: any = [];

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.accounts = this.currentUser?.accounts;
      this.transactions = this.accounts[0].transactions;
      console.log(this.currentUser, this.transactions);

    });

  }


}
