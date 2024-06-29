import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  convertCourseDataToModels,
  convertCourseScheduleToModel,
} from "../components/Controller/ConvertData.js";
import { useUserContext } from "./UserContext.js";
import { useAuthContext } from "./AuthContext.js";
import AttendanceProvider from "./AttendanceContext.js";
import { NewCourseProvider } from "./NewCourseContext.js";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { user } = useUserContext();
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
          "http://165.232.161.56:8000/api/courses"
        );
        if (response.status === 200) {
          const data = convertCourseDataToModels(response.data.data);
          setCourses(data);
          localStorage.setItem("courses", JSON.stringify(data));
        }
      } else {
        const response = await axios.get(
          "http://165.232.161.56:8000/api/courses"
        );
        if (response.status === 200) {
          console.log("Respone: ", response.data.data);
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
    if (courses.length === 0) {
      fetchAllCourses();
    }
  }, []);

  const setCourseData = async (course) => {
    console.log("course: ", course._id);
    try {
      const response = await axios.get(
        `http://165.232.161.56:8000/api/course/${course._id}`
      );
      if (response.status === 200) {
        const data = convertCourseScheduleToModel(response.data);
        setCourseDetail(data);
        localStorage.setItem("course", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const AddNewCourse = async (course) => {
    try {
      const response = await axios.post(
        "http://165.232.161.56:8000/api/course",
        course
      );
      if (response.status === 200) {
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
        `http://165.232.161.56:8000/api/course/${_id}`, data);
      if (response.status === 200) {
        console.log("Updated: " , response.data);
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
        setCourseDetail: setCourseData,
        setCourses,
        UpdateCourseDetail
      }}
    >
      <AttendanceProvider>
        <NewCourseProvider>{children}</NewCourseProvider>
      </AttendanceProvider>
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => React.useContext(CourseContext);
