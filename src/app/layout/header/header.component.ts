import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/user.model'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser?: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private activatedRoute : ActivatedRoute
    ) { }

  routerState :any;

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
    });
    this.authService.autoLogin();

    this.activatedRoute.url.subscribe(data => {
      this.routerState = data;
      console.log(data);
    });
    console.log(JSON.stringify(this.routerState));
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

}
