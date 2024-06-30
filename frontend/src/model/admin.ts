import { Account, LoginAccount } from "./account.ts";

export class Admin {
  _id: string;
  account: Account;

  constructor(data: any) {
      this._id = data?._id || '';
      this.account = new Account(data?.account);
  }
}
