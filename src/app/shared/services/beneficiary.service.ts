import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api_response.model';
import { Beneficiary } from '../models/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  private API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/beneficiaries";

  private options = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json"
    })
   }

  constructor(private http : HttpClient) { }

  createBeneficiary(body:Partial<Beneficiary>):Observable<ApiResponse<Beneficiary>>{
    return this.http.post<ApiResponse<Beneficiary>>(this.API_ENDPOINT, body , this.options)
    .pipe(
      tap(beneficiary => console.log(JSON.stringify(beneficiary))),
      catchError(err => this.handleErrors(err))
    );
  }

  getBeneficiary(id:string):Observable<ApiResponse<Beneficiary>>{
    return this.http.get<Beneficiary>(`${this.API_ENDPOINT}/${id}`, this.options)
    .pipe(
      tap(bene => console.log(JSON.stringify(bene))),
      catchError(err => this.handleErrors(err))
    );
  }

  updateBeneficiary(id:string, body:Partial<Beneficiary>):Observable<ApiResponse<Beneficiary>>{
    return this.http.patch<Beneficiary>(`${this.API_ENDPOINT}/${id}`, body ,this.options)
    .pipe(
      tap(bene => console.log(JSON.stringify(bene))),
      catchError(err => this.handleErrors(err))
    );
  }

  deleteBeneficiary(id:string):Observable<ApiResponse<Beneficiary>>{
    return this.http.delete<Beneficiary>(`${this.API_ENDPOINT}/${id}`, this.options)
    .pipe(
      tap(bene => console.log(JSON.stringify(bene))),
      catchError(err => this.handleErrors(err))
    );
  }

}
