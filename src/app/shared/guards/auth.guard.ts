import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private url!: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let userToken = this.authService.getToken();
  //     let loggedIn = false;

  //     if(userToken){
  //       loggedIn = true;
  //       return loggedIn
  //     }else{
  //       this.router.navigate(['/']);
  //     }
  //     return loggedIn;
  // }

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



}


