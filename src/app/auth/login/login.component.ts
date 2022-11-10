import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordToggle = true ;
  passwordInput = "password";
  rememberMe : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })


  togglePassword(event : any){
    if(event.target?.checked == true){
      this.rememberMe = true;
    }
  }

  showPassword(){
    this.passwordInput = "text";
  }

  showText(){
    this.passwordInput = "password";
  }

  loginUser(form:any){
    if(this.loginForm.valid){
      console.log(this.username?.value);
    }
  }


  get username() {return this.loginForm.get('username');}
  get password() { return this.loginForm.get('password');}


}
