
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from 'src/app/shared/services/transfer.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { Account } from 'src/app/shared/models/account.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  currentUser?: any;
  accounts?: any = [];
  beneficiaries?: any = [];

  data = {
    fromAccount: '',
    toAccount: '',
    amount: 0
  }
  constructor(private authService: AuthService, private userService: UserService, private accountService: AccountService, private transferService: TransferService) {

  }



  ngOnInit(): void {
    this.getAuthUser();
  }


  getAuthUser(){
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.accounts = this.currentUser?.accounts;
      this.beneficiaries = this.currentUser?.beneficiaries;
    });
    this.authService.autoLogin();
  }




  handleSubmit(): void {

    if(this.data.amount < 100){
      Swal.fire(
        'Insufficent Amount!',
        `Transfers must be at least $100.00 JMD your current amount is $${this.data.amount} JMD `,
        'warning'
      )
    }else{
      this.transferService.createTransfer(this.data).subscribe({
        next : (res) =>{
          if (res.status === 'SUCCESS') {
            Swal.fire(
              'Transfer Successful!',
              `You have sucessfullt transferred $${this.data.amount} dollars to account ${this.data.toAccount}`,
              'success'
            )

            this.data = {
              fromAccount: '',
              toAccount: '',
              amount: 0
            }

            this.getAuthUser();
          }
        },
        error :(err) => {
          if(err.error){
            Swal.fire(
              'All Fields are required!',
              `Please fully fill out the form`,
              'warning'
            )
          }
        },
      })
    }


    // console.log(this.data.amount, this.data.toAccount, this.data.fromAccount, this.data)
  }


}
