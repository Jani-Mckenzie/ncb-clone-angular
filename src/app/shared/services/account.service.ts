import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Account } from '../models/account.model';
import { ApiResponse } from '../models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/accounts";

  private options = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json"
    })
   }

  constructor(private http : HttpClient) { }

  getAllAccounts():Observable<ApiResponse<Account>>{
    return this.http.get<ApiResponse<Account>>(this.API_ENDPOINT, this.options)
    .pipe(
      tap(account => console.log(JSON.stringify(account))),
      catchError(err => this.handleErrors(err))
    );
  }
  getSingleAccount(id:string):Observable<ApiResponse<Account>>{
    return this.http.get<ApiResponse<Account>>(`${this.API_ENDPOINT}/${id}`, this.options)
    .pipe(
      tap(account => console.log(JSON.stringify(account))),
      catchError(err => this.handleErrors(err))
    );
  }
  createAccount(body:any):Observable<ApiResponse<Account>>{
    return this.http.post<ApiResponse<Account>>(this.API_ENDPOINT, body, this.options)
    .pipe(
      tap(account => console.log(JSON.stringify(account))),
      catchError(err => this.handleErrors(err))
    );
  }
  updateAccount(id:string , body:Partial<Account>):Observable<ApiResponse<Account>>{
    return this.http.patch<ApiResponse<Account>>(`${this.API_ENDPOINT}/${id}`, body, this.options)
    .pipe(
      tap(account => console.log(JSON.stringify(account))),
      catchError(err => this.handleErrors(err))
    );
  }
  deleteAccount(id:string):Observable<ApiResponse<Account>>{
    return this.http.delete<ApiResponse<Account>>(`${this.API_ENDPOINT}/${id}`, this.options)
    .pipe(
      tap(account => console.log(JSON.stringify(account))),
      catchError(err => this.handleErrors(err))
    );
  }

}
