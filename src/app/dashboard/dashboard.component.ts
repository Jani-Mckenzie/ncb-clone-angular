import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser?: User;
  currentUser: any;
  accounts: any;


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.loggedInUser = res;
      this.currentUser = this.loggedInUser;
    });
    this.authService.autoLogin();
  }
}
