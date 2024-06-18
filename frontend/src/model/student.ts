export class Student {
    _id: string;
    name: string;
    account: string;
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
      this.account = account;
      this.session_count = session_count;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.__v = __v;
    }
  }