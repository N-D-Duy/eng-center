import { Account, LoginAccount } from "./account.ts";

export class Student {
  _id: string;
  name: string;
  parent: string | null;
  cocc_percent: number;
  tuition_due: number;
  tuition_total: number;
  account: Account;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
      this._id = data?._id || '';
      this.name = data?.name || '';
      this.parent = data?.parent || null;
      this.cocc_percent = data?.cocc_percent || 0;
      this.tuition_due = data?.tuition_due || 0;
      this.tuition_total = data?.tuition_total || 0;
      this.account = new Account(data?.account);
      this.createdAt = new Date(data?.createdAt);
      this.updatedAt = new Date(data?.updatedAt);
  }
}

export class LoginStudent {
  _id: string;
  name: string;
  parent: string | null;
  cocc_percent: number;
  tuition_due: number;
  tuition_total: number;
  account: LoginAccount;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
      this._id = data?._id || '';
      this.name = data?.name || '';
      this.parent = data?.parent || null;
      this.cocc_percent = data?.cocc_percent || 0;
      this.tuition_due = data?.tuition_due || 0;
      this.tuition_total = data?.tuition_total || 0;
      this.account = new LoginAccount(data?.account);
      this.createdAt = new Date(data?.createdAt);
      this.updatedAt = new Date(data?.updatedAt);
  }
}