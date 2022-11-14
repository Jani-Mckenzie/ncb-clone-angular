import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-billpay',
  templateUrl: './billpay.component.html',
  styleUrls: ['./billpay.component.css']
})
export class BillpayComponent implements OnInit {

  user: any;

  currentUser?: any;
  accounts?: any = [];
  transactions?: any = [];
  creditCards?: any = [];

  constructor(private authService : AuthService , private transService : TransactionService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.accounts = this.currentUser?.accounts;
      this.creditCards = this.currentUser?.creditCards;
      let i: number;
      for (i = 0; this.accounts.length > i; i++) {
        this.transactions = [...this.accounts[i].transactions];
        console.log(this.currentUser);
      }
    });
  }

  billForm = new FormGroup({
    transactionType: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  // createTransaction(){
  //   this.transService.createTransaction()
  // }

}
