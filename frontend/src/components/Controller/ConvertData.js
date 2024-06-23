import { Student } from "../../model/student.ts";
import { Account } from "../../model/account.ts";
import { Course } from "../../model/course.ts";
import { Parent } from "../../model/parent.ts";
import { Teacher } from "../../model/teacher.ts";
import { Schedule } from "../Form/Schedule/Scheduele.js";

export const convertCourseDataToModels = (data) => {
  let parsedData;

  if (typeof data === "string") {
      parsedData = JSON.parse(data);
  } else {
      parsedData = data;
  }

  if (!parsedData || !Array.isArray(parsedData)) {
      return [];
  }

  console.log(new Course(parsedData[0]));

  return parsedData.map((c) => new Course(c));
}


export const convertAccountDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(a => new Account(a));
}

export const convertAccountDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new Account(data);
}


export const convertTeacherDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(t => new Teacher(t));
}

export const convertStudentDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(s => new Student(s));
};

export const convertScheduleDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(s => new Schedule(s));
};


export const convertParentDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(p => new Parent(p));
};