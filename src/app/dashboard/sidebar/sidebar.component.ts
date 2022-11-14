import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser?: any;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
    });
  }
}
