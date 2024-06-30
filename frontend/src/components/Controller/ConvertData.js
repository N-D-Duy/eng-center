import { LoginStudent, Student } from "../../model/student.ts";
import { Account } from "../../model/account.ts";
import { Course, CourseSchedule } from "../../model/course.ts";
import { LoginParent, Parent } from "../../model/parent.ts";
import { LoginTeacher, Teacher } from "../../model/teacher.ts";
import { Schedule } from "../../model/schedule.ts";
import { Admin } from "../../model/admin.ts";

export const convertCourseDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(a => new Course(a));
}

export const convertCourseScheduleToModel = (data) => {
  if (!data) {
    return [];
  }

  return new CourseSchedule(data.course, data.schedule);
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
export const convertLoginStudentDataToModel = (data) => {
  if (!data) {
      return null;
  }
  try {
      const student = new LoginStudent(data);
      return student;
  } catch (error) {
      console.error('Error converting student data:', error);
      return null;
  }
};


export const convertStudentDataToModel = (data) => {
  if (!data) {
      return null;
  }
  try {
      const student = new Student(data);
      return student;
  } catch (error) {
      console.error('Error converting student data:', error);
      return null;
  }
};


export const convertTeacherDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new Teacher(data);
}

export const convertAdminDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new Admin(data);
}

export const convertLoginTeacherDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new LoginTeacher(data);
}


export const convertParentDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new Parent(data);
}


export const convertLoginParentDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new LoginParent(data);
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

export const convertScheduleDataToModel = (data) => {
  if (!data) {
    return [];
  }

  return new Schedule(data);
};

export const convertParentDataToModels = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(p => new Parent(p));
};