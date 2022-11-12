import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service'; 7
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordToggle = true;
  passwordInput = "password";
  rememberMe: boolean = false;
  userAcc !: User;
  invalidCred: boolean = false;
  loginCount: number = 0;


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  togglePassword(event: any) {
    if (event.target?.checked == true) {
      this.rememberMe = true;
    }
  }

  showPassword() {
    this.passwordInput = "text";
  }

  showText() {
    this.passwordInput = "password";
  }

  loginUser(form: any) {
    if (this.loginForm.valid) {

      let userCred: Partial<User> = {
        username: this.username?.value!,
        password: this.password?.value!
      }

      this.authService.loginUser(userCred).subscribe({
        next: (res) => {
          if (res) {
            this.userAcc = res.data!['user'];
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err?.error?.data?.error === "User not found") {
            this.loginCount++;
            Swal.fire(
              'Login Failed!',
              `Invalid Credentials ${this.loginCount}`,
              'warning'
            )
          }

        },
        complete: () => {
          this.authService.getToken();
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }


  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


}
