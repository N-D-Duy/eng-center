import { Course } from "../model/course.ts";

function convertCourseDataToModels(data) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(courseData => new Course(courseData));
}


export default convertCourseDataToModels;