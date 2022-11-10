import { Account } from "./account.model";
import { Beneficiary } from "./beneficiary.model";

export class User{
  _id:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  cellphone:string;
  username:string;
  dateofBirth:Date;
  idVerification:string;
  trn:string;
  accounts:Account[];
  creditCards:[];
  createdAt:Date;
  updatedAt:Date;
  beneficiaries: Beneficiary[];

  constructor(
    _id?:string,
    firstName?:string,
    lastName?:string,
    email?:string,
    password?:string,
    cellphone?:string,
    username?:string,
    dateofBirth?:Date,
    idVerification?:string,
    trn?:string,
    accounts?:Account[],
    creditCards?:[],
    createdAt?:Date,
    updatedAt?:Date,
    beneficiaries?: Beneficiary[]
    ){
    this._id = _id!;
    this.firstName = firstName!;
    this.lastName = lastName!;
    this.email = email!;
    this.password = password!;
    this.cellphone = cellphone!;
    this.username = username!;
    this.dateofBirth = dateofBirth!;
    this.idVerification = idVerification!;
    this.trn = trn!;
    this.accounts = accounts!;
    this.creditCards = creditCards!;
    this.createdAt = createdAt!;
    this.updatedAt = updatedAt!;
    this.beneficiaries = beneficiaries!;


  }
}
