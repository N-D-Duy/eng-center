import { Account, LoginAccount } from "./account.ts";

export class Parent {
  _id: string;
  name: string;
  account: Account;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.account = new Account(data.account);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class LoginParent {
  _id: string;
  name: string;
  account: LoginAccount;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.account = new LoginAccount(data.account);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}