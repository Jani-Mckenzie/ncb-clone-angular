import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthModuleGuard implements CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {

    let userToken = this.authService.getToken();
    let loggedIn: boolean = false;

    if (!userToken) {
      Swal.fire(
        'Login Required',
        'You must first login',
        'error'
      )
      this.router.navigate(['/auth/login']);
      return loggedIn
    } else {
      loggedIn = true;
      return loggedIn;
    }
  }
}
