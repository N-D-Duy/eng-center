import { Teacher } from "./teacher.ts";

export class Course {
  private _id: string;
  private name: string;
  private description: string;
  private category: string;
  private price: number;
  private image: string;
  private grade: number;
  private status: string;
  private teacher: Teacher;
  private capacity: number;
  private current_joined: number;
  private createdAt: string;
  private updatedAt: string;

  constructor(data) {
      this._id = data._id;
      this.name = data.name;
      this.description = data.description;
      this.category = data.category;
      this.price = data.price;
      this.image = data.image;
      this.grade = data.grade;
      this.status = data.status;
      this.teacher = new Teacher(data.teacher); // Assuming Teacher class constructor accepts 'data.teacher' parameter
      this.capacity = data.capacity;
      this.current_joined = data.current_joined;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
  }

}