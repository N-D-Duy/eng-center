import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  convertAccountDataToModel,
  convertParentDataToModels,
  convertStudentDataToModels,
  convertTeacherDataToModels,
} from "../components/Controller/ConvertData";
import { useNavigate } from "react-router-dom";
import { TeacherProvider } from "./TeacherContext";
import { StudentProvider } from "./StudentContext";
import { ParentProvider } from "./ParentContext";
import ScheduleProvider from "./ScheduleContext";
import { useUserContext } from "./UserContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const { setUser } = useUserContext();
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedUser) {
      setUser(storedUser);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (userRole, userData) => {
    setLoggedIn(true);
    setRole(userRole);
    setUser(userData);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
    localStorage.clear();
  };

  const loginHandler = async (email, password) => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu.");
      return;
    }
    try {
      const response = await axios.post(
        "http://165.232.161.56:8000/api/login",
        {
          emailOrUsername: email,
          password: password,
        }
      );
      if (response.status === 200) {
        if (email.startsWith('admin')) {
          handleLogin('admin', response.data);
          alert("Đăng nhập thành công!");
          navigate(`/admin`);
        } else {
          console.log("Data: ", response.data);
          var roleAccount = response.data.data.account.role;
          console.log("ROle: ", roleAccount);
          console.log("Data: ", response.data);
          switch (roleAccount) {
            case "teacher": {
              const TeacherData = convertTeacherDataToModels(response.data);
              handleLogin(roleAccount, TeacherData);
              break;
            }
            case "student": {
              const StudentData = convertStudentDataToModels(response.data);
              handleLogin(roleAccount, StudentData);
              break;
            }
            case "parent": {
              const ParentData = convertParentDataToModels(response.data);
              handleLogin(roleAccount, ParentData);
              break;
            }
            case "admin": {
             
            }
            default: {
              alert(
                "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
              );
              return;
            }
          }
          alert("Đăng nhập thành công!");
          navigate(`/${roleAccount}`);
        }
      } else {
        alert(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
        );
      }
    } catch (error) {
      console.error("Fail", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, role, handleLogin, handleLogout, loginHandler }}
    >
      <TeacherProvider>
        <StudentProvider>
          <ParentProvider>
            <ScheduleProvider>{children}</ScheduleProvider>
          </ParentProvider>
        </StudentProvider>
      </TeacherProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
