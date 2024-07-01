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
import { useUserContext } from "./UserContext.js";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { role } = useAuthContext();
  const {user} = useUserContext();
  const [courseDetail, setCourseDetail] = useState(() => {
    const savedCourse = localStorage.getItem("courseDetail");
    return savedCourse ? JSON.parse(savedCourse) : null;
  });

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [coursesWithRole, setCoursesWithRole] = useState([]);

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(
        APIPath + "courses"
      );
      if (response.status === 200) {
        const data = convertCourseDataToModels(response.data.data);
        setCourses(data);
        localStorage.setItem("courses", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
    if(courseDetail){
      setCourseData(courseDetail.course);
    }
  };

  const fetchAllRoleCourses = async () => {
    try {
      if (role == "admin") {
        const responseFetch = await axios.get(
          APIPath + "courses"
        );
        if (responseFetch.status === 200) {
          const data = convertCourseDataToModels(responseFetch.data.data);
          setCoursesWithRole(data);
          console.log("Courses: ", data); 
          localStorage.setItem("coursesRole", JSON.stringify(data));
        }
      } else {
        console.log("Role: ", role);
        console.log("Path: ", APIPath + `${role}/${user._id}/courses`);
        const response = await axios.get(
          APIPath + `${role}/${user._id}/courses`
        );
        if (response.status === 200) {
          console.log("Data: ", response.data.data);
          const data = convertCourseDataToModels(response.data.data);
          setCoursesWithRole(data);
          console.log("Courses: ", data); 
          localStorage.setItem("coursesRole", JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    
    if(courseDetail){
      setCourseData(courseDetail.course);
    }
  };

  useEffect(() => {
    fetchAllCourses();
    // const savedCourse = localStorage.getItem("courseDetail");
    // if(savedCourse) setCourseDetail(JSON.parse(savedCourse));
    //else fetchAllCourses();
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
      // const response = await axios.post(
      //   APIPath + 'course',
      //   course
      // );
      console.log("Course: ", course);
      const response = await fetch(APIPath + 'course', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: course,
      });
      console.log("Response: ", response);
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
        coursesWithRole,
        setCourse: setCourseData,
        setCourses,
        UpdateCourseDetail,
        AddNewCourse,
        fetchAllRoleCourses
      }}
    >
      <AttendanceProvider>
        <NewCourseProvider>{children}</NewCourseProvider>
      </AttendanceProvider>
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => React.useContext(CourseContext);
