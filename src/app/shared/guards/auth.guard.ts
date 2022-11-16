import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  private url!: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private authState(): boolean {
    if (this.isLogin()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  private notAuthState(): boolean {
    if (this.isLogin()) {
      return true;
    }
    // Swal.fire(
    //   'Login Required',
    //   'You must first login',
    //   'error'
    // )
    this.router.navigate(['/auth/login']);
    return false;
  }

  private isLogin(): boolean {
    if (this.url.includes('/auth/login')) {
      return true;
    }
    return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.url = state.url;
    if (this.authService.isAuthenticated()) {
      return this.authState();
    }
    return this.notAuthState();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let userToken = this.authService.getToken();
    let loggedIn: boolean = false;
    console.log('Running')
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

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let userToken = this.authService.getToken();
    let loggedIn: boolean = false;
    console.log('CAC running')
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


