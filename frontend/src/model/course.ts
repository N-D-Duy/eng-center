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
    teacher: Teacher; // Sử dụng lớp Teacher
    createdAt: string;
    updatedAt: string;
    __v: number;
  
    constructor({
      _id,
      name,
      description,
      category,
      price,
      image,
      grade,
      status,
      teacher,
      createdAt,
      updatedAt,
      __v
    }) {
      this._id = _id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.price = price;
      this.image = image;
      this.grade = grade;
      this.status = status;
      this.teacher = new Teacher(teacher); // Tạo một instance của lớp Teacher
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.__v = __v;
    }
}