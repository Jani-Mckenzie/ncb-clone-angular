import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillpayComponent } from 'src/app/dashboard/billpay/billpay.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/user.model'




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser?: any = [];


  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
    });
  }

  // getCurrentUser() {
  //   this.currentUser = window.sessionStorage.getItem('auth_meta')
  //   this.currentUser = JSON.parse(this.currentUser)
  //   const user_id = this.currentUser.user;
  //   this.userService.getUser(this.currentUser.user).subscribe(data => {
  //     this.currentUser = data.data!['user'];
  //   })
  // }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login'], { queryParams: { loggedOut: 'success' } });
  }

  async goToAccounts(){
    this.router.navigate(['/dashboard/accounts']).then((val) => {
      window.location.reload();
      DashboardComponent.currentPage = window.location.pathname;
    })
  }


  async goToBillPayment(){
    this.router.navigate(['/dashboard/billpay']).then((val) => {
      DashboardComponent.currentPage = '/dashboard/billpay';
    })
  }

}


