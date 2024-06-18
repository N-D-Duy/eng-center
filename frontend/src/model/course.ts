import { Teacher } from "./teacher.ts";

export class Course {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  grade: number;
  status: string;
  teacher: Teacher;
  capacity: number;
  current_joined: number;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(courseData: any) {
      this._id = courseData._id;
      this.name = courseData.name;
      this.description = courseData.description;
      this.category = courseData.category;
      this.price = courseData.price;
      this.image = courseData.image;
      this.grade = courseData.grade;
      this.status = courseData.status;
      this.teacher = new Teacher(courseData.teacher);
      this.capacity = courseData.capacity;
      this.current_joined = courseData.current_joined;
      this.createdAt = courseData.createdAt;
      this.updatedAt = courseData.updatedAt;
      this.__v = courseData.__v;
  }
}