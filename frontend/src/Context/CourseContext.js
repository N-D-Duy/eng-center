import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  convertCourseDataToModels,
  convertCourseScheduleToModel,
} from "../components/Controller/ConvertData.js";
import { useAuthContext } from "./AuthContext.js";
import AttendanceProvider from "./AttendanceContext.js";
import { NewCourseProvider } from "./NewCourseContext.js";
import { APIPath } from "../App.js";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { role } = useAuthContext();

  const [courseDetail, setCourseDetail] = useState(() => {
    const savedCourse = localStorage.getItem("courseDetail");
    return savedCourse ? JSON.parse(savedCourse) : null;
  });

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const fetchAllCourses = async () => {
    try {
      if (role == "admin") {
        const response = await axios.get(
          APIPath + "courses"
        );
        if (response.status === 200) {
          const data = convertCourseDataToModels(response.data.data);
          setCourses(data);
          localStorage.setItem("courses", JSON.stringify(data));
        }
      } else {
        const response = await axios.get(
          APIPath + "courses"
        );
        if (response.status === 200) {
          const data = convertCourseDataToModels(response.data.data);
          setCourses(data);
          localStorage.setItem("courses", JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const savedCourse = localStorage.getItem("courseDetail");
    if(savedCourse) setCourseDetail(JSON.parse(savedCourse));
    else fetchAllCourses();
  }, []);

  const setCourseData = async (course) => {
    try {
      const response = await axios.get(
        APIPath + `course/${course._id}`
      );
      if (response.status === 200) {
        const data = convertCourseScheduleToModel(response.data);
        setCourseDetail(data);
        localStorage.setItem("courseDetail", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const AddNewCourse = async (course) => {
    try {
      const response = await axios.post(
        APIPath + 'course',
        course
      );
      if (response.status === 200 || response.status === 201) {
        fetchAllCourses();
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const UpdateCourseDetail = async (data, _id) => {
    try {
        console.log("Data: ", data);
      const response = await axios.put(
        APIPath + `course/${_id}`, data);
      if (response.status === 200) {
        console.log("Updated: " , response.data);
        fetchAllCourses();
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courseDetail,
        courses,
        setCourse: setCourseData,
        setCourses,
        UpdateCourseDetail,
        AddNewCourse
      }}
    >
      <AttendanceProvider>
        <NewCourseProvider>{children}</NewCourseProvider>
      </AttendanceProvider>
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => React.useContext(CourseContext);
