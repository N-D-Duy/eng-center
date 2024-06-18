
export class Teacher {
  _id: string;
  name: string;
  account: string;
  session_count: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;

  constructor(teacherData: any) {
      this._id = teacherData._id;
      this.name = teacherData.name;
      this.account = teacherData.account;
      this.session_count = teacherData.session_count;
      this.status = teacherData.status;
      this.createdAt = new Date(teacherData.createdAt);
      this.updatedAt = new Date(teacherData.updatedAt);
      this.__v = teacherData.__v;
  }
}