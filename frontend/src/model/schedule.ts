import { Course } from "./course.ts";
import { Teacher } from "./teacher.ts";

export class Schedule {
  _id: string;
  course: Course;
  day: string;
  start_time: string;
  end_time: string;
  teacher: Teacher;
  status: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
      this._id = data._id;
      this.course = new Course(data.course);
      this.day = data.day;
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.teacher = new Teacher(data.teacher);
      this.status = data.status;
      this.__v = data.__v;
      this.createdAt = new Date(data.createdAt);
      this.updatedAt = new Date(data.updatedAt);
  }
}

