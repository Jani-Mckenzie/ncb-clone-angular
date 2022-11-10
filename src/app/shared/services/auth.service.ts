import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   API_ENDPOINT:string = "https://ncb-group-project.herokuapp.com/api/v1/auth/";

  constructor(private http : HttpClient) { }


  loginUser(){
    
  }




}
