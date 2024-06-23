import { Course } from "./course";
import { Teacher } from "./teacher";

export class Schedule {
    _id: string;
    course: Course;
    day: string;
    start_time: string;
    end_time: string;
    teacher: Teacher;
    status: string;
    constructor({
      _id,
      course,
      day,
      start_time,
      end_time,
      status,
      teacher,
      __v
    }) {
      this._id = _id;
      this.course = course;
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
        this.teacher = teacher;

    }
  }