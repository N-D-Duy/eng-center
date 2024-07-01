import React, { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  convertAdminDataToModel,
  convertParentDataToModel,
  convertStudentDataToModel,
  convertTeacherDataToModel,
} from "../components/Controller/ConvertData";
import { useNavigate } from "react-router-dom";
import { TeacherProvider } from "./TeacherContext";
import { StudentProvider } from "./StudentContext";
import { ParentProvider } from "./ParentContext";
import ScheduleProvider from "./ScheduleContext";
import { useUserContext } from "./UserContext";
import { APIPath } from "../App.js";
import ChildrenProvider from "./ChildrenContext.js";

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
      const response = await axios.post(APIPath + "login", {
        emailOrUsername: email,
        password: password,
      });
      if (response.status === 200) {
        if (email.startsWith("admin")) {
          handleLogin("admin", response.data);
          alert("Success!");
          navigate(`/admin`);
        } else {
          var roleAccount = response.data.data.account.role;
          switch (roleAccount) {
            case "teacher": {
              const TeacherData = convertTeacherDataToModel(response.data.data);
              handleLogin(roleAccount, TeacherData);
              break;
            }
            case "student": {
              const StudentData = convertStudentDataToModel(response.data.data);
              console.log("Student: ", StudentData);
              handleLogin(roleAccount, StudentData);
              break;
            }
            case "parent": {
              const ParentData = convertParentDataToModel(response.data.data);
              handleLogin(roleAccount, ParentData);
              break;
            }
            case "admin": {
              const adminData = convertAdminDataToModel(response.data.data);
              handleLogin("admin", adminData);
              break;
            }
            default: {
              alert(
                "Fail. Please check your email and password again"
              );
              return;
            }
          }
          alert("Success!");
          navigate(`/${roleAccount}`);
        }
      } else {
        alert(
          "Fail. Please check your email and password again"
        );
      }
    } catch (error) {
      console.error("Fail", error);
      alert("Fail. Please check your email and password again");
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, role, handleLogin, handleLogout, loginHandler }}
    >
      <TeacherProvider>
        <StudentProvider>
          <ChildrenProvider>
            <ParentProvider>
              <ScheduleProvider>{children}</ScheduleProvider>
            </ParentProvider>
          </ChildrenProvider>
        </StudentProvider>
      </TeacherProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
