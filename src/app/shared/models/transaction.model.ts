import { TransactionType } from "./transaction_type.model";

export interface Transaction {
  _id:string;
  accId:string;
  openingBalance:Number;
  closingBalance:Number;
  type:TransactionType;
  amount:Number;
  description:string;
  transactionId:string;
  createdAt:Date;
  updatedAt:Date;
}
