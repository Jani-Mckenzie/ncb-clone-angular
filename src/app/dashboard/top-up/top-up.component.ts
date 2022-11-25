import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/shared/models/beneficiary.model';
import { createTransaction } from 'src/app/shared/models/createTransaction';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private transService : TransactionService
    ) { }

  user: any;
  currentUser?: any;
  accounts?: any = [];
  beneficiaries ?: any = [];
  transactions?: any = [];
  creditCards?: any = [];
  creditId = this.transService.creditId;
  debitId : string = this.transService.debitId;
  taxationRate = .5;

  topupForm = new FormGroup({
    fromAccount: new FormControl('', [Validators.required]),
    toRecipient: new FormControl('', [Validators.required]),
    company : new FormControl('', [Validators.required]),
    transactionType: new FormControl(this.debitId, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
  })

  ngOnInit(): void {
    this.getAuthUser();
  }

  getAuthUser(){
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.beneficiaries = this.currentUser.beneficiaries;
      this.accounts = this.currentUser?.accounts;
      this.creditCards = this.currentUser?.creditCards;
      let i: number;
      for (i = 0; this.accounts.length > i; i++) {
        this.transactions = [...this.accounts[i].transactions];
      }
    });
    this.authService.autoLogin();
  }


  topUp(form:any){
      if(this.topupForm.valid){
        let amount : number = this.amount?.value as number;
        let formVal : createTransaction = {
          accountId : this.fromAccount?.value!,
          transactionType: this.transactionType?.value!,
          amount : amount + (amount * this.taxationRate),
          description : `Sent $${this.amount?.value} ${this.company?.value} credit to ${this.toRecipient?.value}`
         }

         this.transService.createTransaction(formVal).subscribe({
          next : () => {
            Swal.fire(
              'Transaction Successful',
              `${this.amount?.value} ${this.company?.value} credit purchased for ${formVal.amount}.`,
              'success'
            )
          },
          error : (err) => {
            console.log(err);
          },
          complete : () => {
            this.getAuthUser();
            this.topupForm.reset();
          }
        })
         console.log(formVal);
      }

  }

  get fromAccount() {return this.topupForm.get('fromAccount') };
  get toRecipient() {return this.topupForm.get('toRecipient') };
  get transactionType() {return this.topupForm.get('transactionType') };
  get company() {return this.topupForm.get('company') };
  get billType() {return this.topupForm.get('billType') };
  get amount() {return this.topupForm.get('amount') };

  }


