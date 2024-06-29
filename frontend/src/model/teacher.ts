import { Account, LoginAccount } from "./account.ts";

export class Teacher {
  _id: string;
  account: Account;
  session_count: number;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(data : any) {
    this._id = data?._id;
    this.account = new Account(data?.account);
    this.session_count = data?.session_count;
    this.status = data?.status;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
export class LoginTeacher {
  _id: string;
  account: LoginAccount;
  session_count: number;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this._id = data._id;
    this.account = new LoginAccount(data.account);
    this.session_count = data.session_count;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}