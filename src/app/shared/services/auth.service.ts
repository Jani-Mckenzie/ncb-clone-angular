import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api_response.model';
import { UserService } from './user.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken?: any;


  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(err);
    // return of (console.log(err));
  }

  private options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }



  private token?: any;
  private API_ENDPOINT: string = "https://ncb-group-project.herokuapp.com/api/v1/auth";

  constructor(private http: HttpClient, private userService: UserService) {
    this.decodedToken = window.sessionStorage.getItem('auth_meta') || new DecodedToken();
  }
  private _loggedInUser$ = new Subject<User | undefined>();
  get loggedInUser$() {
    return this._loggedInUser$;
  }

  loginUser(userCred: Partial<User>): Observable<ApiResponse<User>> {
    const user = this.http.post<ApiResponse<User>>(`${this.API_ENDPOINT}/login`, userCred, this.options).pipe(
      tap((userlog: ApiResponse<User>) => {
        this.token = userlog.data!['accessToken'];
        this.decodedToken = jwt.decodeToken(this.token)
        window.sessionStorage.setItem('token', this.token);
        window.sessionStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
      }),
      catchError(err => throwError(() => err))
    );
    return user
  }


  public autoLogin(): void {
    const dataFromStorage = window.sessionStorage.getItem('auth_meta');
    const tokenFromStorage = window.sessionStorage.getItem('token');
    this.token = tokenFromStorage;

    if (!dataFromStorage && !this.token) return;

    const data = JSON.parse(dataFromStorage!);
    const _id = data.user;

    this.userService.getUser(_id).subscribe(res => {

      if (res.status === 'SUCCESS') {
        this.loggedInUser$.next(res.data!['user']);
      }
    });
  }

  public logout(): void {
    window.sessionStorage.removeItem('auth_meta');
    window.sessionStorage.removeItem('token');
    this.loggedInUser$.next(undefined);
    // this.token = new DecodedToken();
    // this.decodedToken = new DecodedToken();

  }

  getToken(): string {

    this.token = window.sessionStorage.getItem('token');
    // console.log(this.token);
    return this.token!;
  }

  isLoggedin(): boolean {
    let token = window.sessionStorage.getItem('token');

    if (token) {
      return true;
    }
    return false;

  }
  isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

}
