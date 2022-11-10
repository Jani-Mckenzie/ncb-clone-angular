import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

   private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/auth";
   private options = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json"
    })
   }
   private token ?: string;

  constructor(private http : HttpClient) { }

  loginUser(userCred:Partial<User>):Observable<ApiResponse<User>>{
    const user = this.http.post<ApiResponse<User>>(`${this.API_ENDPOINT}/login`, userCred , this.options).pipe(
      tap((userlog : ApiResponse<User>) =>  this.token = (userlog.data!['accessToken'] as unknown) as string),
      catchError(err => throwError(() =>  err ))
      );
    return user
  }

  getToken():string{
    console.log(this.token);
    return this.token!;
  }




}
