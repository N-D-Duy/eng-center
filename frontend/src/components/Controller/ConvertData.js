import { Account } from "../../model/account.ts";
import { Course } from "../../model/course.ts";
import { Teacher } from "../../model/teacher.ts";

export const convertCourseDataToModels = (data: string | object) => {
  let parsedData;

  // Kiểm tra nếu data là một chuỗi thì parse nó, nếu không thì gán trực tiếp
  if (typeof data === "string") {
      parsedData = JSON.parse(data);
  } else {
      parsedData = data;
  }

  if (!parsedData || !Array.isArray(parsedData)) {
      return [];
  }

  // Log đối tượng đầu tiên của parsedData để kiểm tra
  console.log(new Course(parsedData[0]));

  // Dùng parsedData trong map để khởi tạo các đối tượng Course
  return parsedData.map((c: any) => new Course(c));
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
