import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/shared/models/beneficiary.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

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
  debitId = this.transService.debitId;

  ngOnInit(): void {
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

  topupForm = new FormGroup({
    fromAccount: new FormControl('', [Validators.required]),
    toAccount: new FormControl('', [Validators.required]),
    billType: new FormControl('', [Validators.required]),
    amount: new FormControl( 0, [Validators.required]),
  })

  topUp(form:any){
    if(this.topupForm.valid){
     console.log('object');
    }
  }

  get fromAccount() {return this.topupForm.get('fromAccount') };
  get toAccount() {return this.topupForm.get('toAccount') };
  get billType() {return this.topupForm.get('billType') };
  get amount() {return this.topupForm.get('amount') };

  }


