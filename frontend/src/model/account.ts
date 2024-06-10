export class Account {
    _id: string;
    user_name: string;
    password: string;
    role: string;
    status: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  
    constructor(data: any) {
      this._id = data._id;
      this.user_name = data.user_name;
      this.password = data.password;
      this.role = data.role;
      this.status = data.status;
      this.email = data.email;
      this.phone = data.phone;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.__v = data.__v;
    }
}