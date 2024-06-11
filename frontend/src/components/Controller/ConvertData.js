import { Account } from "../../model/account.ts";
import { Course } from "../../model/course.ts";
import { Teacher } from "../../model/teacher.ts";

export const convertCourseDataToModels = (data) =>{
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(c => new Course(c));
}

export const convertAccountDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(a => new Account(a));
}


export const convertTeacherDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(t => new Teacher(t));
}
