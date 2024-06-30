import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCourseContext } from "./CourseContext";
import { convertStudentDataToModels } from "../components/Controller/ConvertData";
import { APIPath } from "../App.js";

const AttendanceContext = createContext();

export const useAttendanceContext = () => useContext(AttendanceContext);

const AttendanceProvider = ({ children }) => {
  const { courseDetail } = useCourseContext();
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [courseInfo, setCourseInfo] = useState(null);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (courseDetail != null) {
      setCourseInfo(course);
      fetchData(courseDetail.course._id);
      setCourse(courseDetail.course);
    }
  }, [courseDetail]);

  useEffect(() => {
    // Lưu dữ liệu vào localStorage khi attendanceData thay đổi
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
  }, [attendanceData]);

  const fetchData = async (courseId) => {
    try {
      // Fetch dữ liệu từ API dựa trên courseId
      const studentsResponse = await axios.get(
        APIPath + `${courseId}/students`
      );
      const datesResponse = courseDetail.schedule;
      if (studentsResponse.status === 200) {
        const data = await fetchMultipleStudents(
          studentsResponse.data.data.map((student) => student._id)
        );
        const studentsData = convertStudentDataToModels(data); 
        const datesData = datesResponse.map((item) => item.day).filter((d) => d !== null);
        
        // Loại bỏ các giá trị trùng lặp và sắp xếp
        const uniqueDates = [...new Set(datesData)].sort();

        // Khởi tạo dữ liệu điểm danh
        const initialAttendanceData = await initializeAttendanceData(
          studentsData,
          uniqueDates
        );
        setStudents(studentsData);
        setDates(uniqueDates);
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
        APIPath + `student/${studentId}`
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
        APIPath + `course/${courseId}/student/${studentId}/attendance`
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
    if(studentsData == null || datesData == null) return initialData;
    for (const student of studentsData) {
      if(student == null || student._id == null) continue;
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

  const SetDataAttendance = async (dataAttendance, date) => {
    console.log("Students: ", students);
    for(const student of students){
      await fetchDataStudentAttendance(student._id, dataAttendance[student._id][date], date);
    }
  }

  const fetchDataStudentAttendance = async (studentId, isAttandance, date) => {
    try {
      const response = await axios.post(`http://api.duynguyendev.xyz/api/course/attendance`,
        {
          course: course._id,
          students: [
            {
              id: studentId,
              is_attended: isAttandance,
              day: date,
              reasons: isAttandance ? "Good" : "Sick"
            }
          ]
        }

      );
      return response.data.data;
    }catch (error) {
      console.error("Error fetching student attendance data:", error);
      return [];
    }
  }

  return (
    <AttendanceContext.Provider
      value={{
        students,
        dates,
        attendanceData,
        markAttendance,
        checkAttendance,
        courseInfo,
        SetDataAttendance
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
