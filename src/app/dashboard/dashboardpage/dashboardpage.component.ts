import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private userService : UserService
    ) { }

  userId:string = this.authService.getUser().user;
  currentUser !: User;


  ngOnInit(): void {
    console.log(this.userId);
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getUser(this.userId).subscribe(data => this.currentUser = data.data!['user'])
  }

}
