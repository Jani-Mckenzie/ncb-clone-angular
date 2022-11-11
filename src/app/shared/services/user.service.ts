import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api_response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

   private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/users";
   private options = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json"
    })
   }

  constructor(private http : HttpClient) { }

  getUser(id:string):Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_ENDPOINT}/${id}`, this.options).pipe(
      tap((user) => console.log(user)),
      catchError(err => this.handleErrors(err))
    )
  }

  patchUser(id:string, body:Partial<User>):Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.API_ENDPOINT}/update/${id}`, body ,this.options).pipe(
      tap((user) => console.log(user)),
      catchError(err => this.handleErrors(err))
    )
  }
}
