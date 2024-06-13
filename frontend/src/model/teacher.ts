import { Account } from "./account.ts";

export class Teacher {
    _id: string;
    name: string;
    account: Account;
    session_count: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  
    constructor({
      _id,
      name,
      account,
      session_count,
      status,
      createdAt,
      updatedAt,
      __v
    }) {
      this._id = _id;
      this.name = name;
      this.account = new Account(account);
      this.session_count = session_count;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.__v = __v;
    }
  }