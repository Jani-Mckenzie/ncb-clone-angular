import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { tap, map, filter, pairwise } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser?: User;
  currentUser: any;
  accounts: any;
  // showNav$: Observable<boolean>;
  showBan: any;


  constructor(private authService: AuthService, private userService: UserService, private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.loggedInUser = res;
      this.currentUser = this.loggedInUser;
    });
    this.authService.autoLogin();


    this.showBan = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {

        this.showBan = e.url;

        // switch (e.url) {
        //   case e.url = '/dashboardpage': {
        //     this.showBan = e.url;

        //     break;
        //   }
        //   case e.url = '/accounts': {
        //     this.showBan = e.url;
        //     break;
        //   }
        //   case e.url = '/transfer': {
        //     this.showBan = e.url;
        //     break;
        //   }
        //   case e.url = '/top-up': {
        //     this.showBan = e.url;
        //     break;
        //   }
        //   case e.url = '/billpay': {
        //     this.showBan = e.url;
        //     break;
        //   }
        //   case e.url = '/dashboardpage': {
        //     this.showBan = e.url;
        //     break;
        //   }
        // }

      }
    });


  }





}
