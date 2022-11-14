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

  currentUser?: any;
  accounts?: any = [];
  transactions?: any = [];
  creditCards?: any = [];

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.accounts = this.currentUser?.accounts;
      this.creditCards = this.currentUser?.creditCards;
      let i: number;
      for (i = 0; this.accounts.length > i; i++) {
        this.transactions = [...this.accounts[i].transactions];
        console.log(this.currentUser);
      }
    });

  }


}
