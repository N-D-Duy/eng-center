export class Account {
  _id: string;
  user_name: string;
  password: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
      this._id = data?._id || '';
      this.user_name = data?.user_name || '';
      this.password = data?.password || '';
      this.role = data?.role || '';
      this.status = data?.status || '';
      this.email = data?.email || '';
      this.phone = data?.phone || '';
      this.createdAt = new Date(data?.createdAt);
      this.updatedAt = new Date(data?.updatedAt);
  }
}

export class LoginAccount {
  _id: string;
  role: string;

  constructor(data: any) {
      this._id = data?._id || '';
      this.role = data?.role || '';
  }
}