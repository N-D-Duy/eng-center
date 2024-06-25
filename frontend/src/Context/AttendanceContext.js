import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCourseContext } from "./CourseContext";
import { convertStudentDataToModels } from "../components/Controller/ConvertData";

const AttendanceContext = createContext();

export const useAttendanceContext = () => useContext(AttendanceContext);

const AttendanceProvider = ({ children }) => {
  const { course } = useCourseContext();
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    if (course) {
      setCourseInfo(course);
      fetchData(course._id);
    }
  }, [course]);

  useEffect(() => {
    // Lưu dữ liệu vào localStorage khi attendanceData thay đổi
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
  }, [attendanceData]);

  const fetchData = async (courseId) => {
    try {
      // Fetch dữ liệu từ API dựa trên courseId
      const studentsResponse = await axios.get(
        `http://165.232.161.56:8000/api/${courseId}/students`
      );
      // const datesResponse = await axios.get(`http://165.232.161.56:8000/api/schedule/${courseId}`);
      const datesResponse = await axios.get(
        `http://165.232.161.56:8000/api/course/666873f388b4360aeb1827da/student/6668737d3e166087045db9a0/attendance`
      );
      if (studentsResponse.status === 200 && datesResponse.status === 200) {
        const data = await fetchMultipleStudents(
          studentsResponse.data.data.map((student) => student._id)
        );
        const studentsData = convertStudentDataToModels(data); 
        const datesData = datesResponse.data.data[1].map((item) => item.day);
        datesData.filter((d) => d !== null);
        datesData.sort();
        const initialAttendanceData = await initializeAttendanceData(
          studentsData,
          datesData
        );
        setStudents(studentsData);
        setDates(datesData);
        setAttendanceData(initialAttendanceData);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  async function fetchMultipleStudents(studentIds) {
    try {
      const requests = studentIds.map((studentID) =>
        fetchDataStudentInfo(studentID)
      );
      const students = await Promise.all(requests);

      return students.filter((s) => s !== null);
    } catch (error) {
      console.error("Error fetching multiple users:", error);
      return [];
    }
  }

  const fetchDataStudentInfo = async (studentId) => {
    try {
      const response = await axios.get(
        `http://165.232.161.56:8000/api/student/${studentId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching student attendance data:", error);
      return [];
    }
  };

  const fetchDataStudent = async (courseId, studentId) => {
    try {
      const response = await axios.get(
        `http://165.232.161.56:8000/api/course/${courseId}/student/${studentId}/attendance`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching student attendance data:", error);
      return [];
    }
  };

  const initializeAttendanceData = async (studentsData, datesData) => {
    // Khởi tạo dữ liệu điểm danh ban đầu dựa trên students và dates
    const initialData = {};
    for (const student of studentsData) {
      initialData[student._id] = {};
      const studentAttendance = await fetchDataStudent(course._id, student._id);
      for (const date of datesData) {
        var attendanceStatus = false;
        for (const item of studentAttendance[1]) {
          if(item.day == date){  
            attendanceStatus = item.isAttend;
            break;
          }
        }
        initialData[student._id][date] = attendanceStatus;
      }
    }
    return initialData;
  };


  const markAttendance = (studentId, date) => {
    const updatedAttendanceData = { ...attendanceData };
    updatedAttendanceData[studentId][date] =
      !updatedAttendanceData[studentId][date];
    setAttendanceData(updatedAttendanceData);
  };

  const checkAttendance = (studentId, date) => {
    return attendanceData[studentId][date];
  };

  return (
    <AttendanceContext.Provider
      value={{
        students,
        dates,
        attendanceData,
        markAttendance,
        checkAttendance,
        courseInfo,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
