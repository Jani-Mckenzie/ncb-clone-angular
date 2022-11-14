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
  creditId = this.transService.creditId;
  debitId = this.transService.debitId;


  billForm = new FormGroup({
    transactionType: new FormControl('', [Validators.required]),
    accountId: new FormControl('', [Validators.required]),
    amount: new FormControl( 0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

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



  payBill(form:any){
      let formVal = {
        transactionsType : this.transactionType?.value,
        accountId : this.accounts[0]._id,
        amount : this.amount?.value,
        description: this.description?.value
      };
      console.log(formVal);

    // this.transService.createTransaction()
  }


  get transactionType() { return this.billForm.get('transactionType'); }
  get accountId() { return this.billForm.get('accountId'); }
  get amount() { return this.billForm.get('amount'); }
  get description() { return this.billForm.get('description'); }

}
