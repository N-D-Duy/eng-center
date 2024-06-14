import React, { createContext, useState } from 'react';
import ScheduleProvider from './ScheduleContext';
import axios from 'axios';
import { convertAccountDataToModels } from '../components/Controller/ConvertData';
import { useNavigate } from 'react-router-dom';
import { TeacherProvider } from './TeacherContext';
import { StudentProvider } from './StudentContext';
import { ParentProvider } from './ParentContext';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
  };

  const loginHandler = async (email, password) => {
        console.log(`${email} : ${password}`);
        if (!email || !password) {
            alert('Vui lòng nhập email và mật khẩu.');
            return;
        }
        try {
            const response = await axios.post('https://165.232.161.56:8000/api/login', {
                "emailOrUsername": email,
                "password": password
            });
            console.log(response);
              if (response.status === 200) {
                const account = convertAccountDataToModels(response.data.data);
                handleLogin(account.role);
                alert('Đăng nhập thành công!');
                // navigate(`/${account.role}`);
              } else {
                alert("email: " +  email + " pass: " + password);
                alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
              }
        } catch (error) {
            console.error('Đăng nhập không thành công:', error);
            alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
        }
        handleLogin('admin');
        navigate(`/admin`);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, role, handleLogin, handleLogout, loginHandler }}>
      <TeacherProvider>
        <StudentProvider>
          <ParentProvider>
            <ScheduleProvider>
              {children}
            </ScheduleProvider>
          </ParentProvider>
        </StudentProvider>
      </TeacherProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);