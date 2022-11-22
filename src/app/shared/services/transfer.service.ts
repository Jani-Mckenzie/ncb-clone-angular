import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponse } from '../models/api_response.model';
import { CreatedTransfer } from '../models/createdTransfer';
import { Transfer } from '../models/transfer.interface';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }
  private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/transfers";
  private options = {
    headers : new HttpHeaders({
     'Content-Type' : 'application/json'
  })
}
  constructor(private http : HttpClient) { }

  createTransfer(body:Transfer):Observable<ApiResponse<CreatedTransfer>>{
    return this.http.post<ApiResponse<CreatedTransfer>>(this.API_ENDPOINT,body,this.options)
    .pipe(
      tap(transfer => console.log(JSON.stringify(transfer))),
      catchError(err => throwError(() => err))
    );
  }

}
