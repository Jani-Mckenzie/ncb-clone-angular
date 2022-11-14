
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
    this.authService.loggedInUser$.subscribe(res => {
      this.currentUser = res;
      this.accounts = this.currentUser?.accounts;
      // console.log(this.accounts)
      this.beneficiaries = this.currentUser?.beneficiaries;
    });
    this.authService.autoLogin();
  }




  handleSubmit(): void {
    this.transferService.createTransfer(this.data).subscribe(res => {
      if (res.status! === 'SUCCESS') {
        Swal.fire(
          'Transfer Failed!',
          `Please ensure all fields are filled out properly`,
          'warning'
        )
      }

    })

    // console.log(this.data.amount, this.data.toAccount, this.data.fromAccount, this.data)
  }


}
