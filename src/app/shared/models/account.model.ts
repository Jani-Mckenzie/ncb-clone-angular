import { AccountType } from "./account_type.model";
import { Currency } from "./currency.model";
import { Transaction } from "./transaction.model";

export class Account{
  _id:string;
  accType: AccountType;
  accNo:string;
  currency:Currency;
  balance:Number;
  transactions: Transaction[];
  createdAt:Date;
  updatedAt:Date;

  constructor(
    _id?:string,
    accType?:AccountType,
    accNo?:string,
    currency?:Currency,
    balance?:Number,
    transactions?: Transaction[],
    createdAt?:Date,
    updatedAt?:Date
    ) {
      this._id = _id!;
      this.accType = accType!;
      this.accNo = accNo!;
      this.currency = currency!;
      this.balance = balance!;
      this.transactions = transactions!;
      this.createdAt = createdAt!;
      this.updatedAt = updatedAt!;
      }
}
