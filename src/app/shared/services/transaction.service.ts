import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { createTransaction } from '../models/createTransaction';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/transactions";
  public creditId:string = "634d7b782e3978582611904a";
  public debitId:string = "634d7b882e3978582611904b";

  private options = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json"
    })
   }

  constructor(private http : HttpClient) { }
  createTransaction(body:createTransaction):Observable<any>{
    return this.http.post<Transaction>(this.API_ENDPOINT, body , this.options)
    .pipe(
      tap(transaction => console.log(JSON.stringify(transaction))),
      catchError(err => this.handleErrors(err))
    )
  }

  getTransaction(id:string):Observable<any>{
    return this.http.get<Transaction>(`${this.API_ENDPOINT}/${id}`, this.options)
    .pipe(
      tap(transaction => console.log(JSON.stringify(transaction))),
      catchError(err => this.handleErrors(err))
    )
  }

}
