import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertAccountDataToModel } from '../components/Controller/ConvertData';
import { useNavigate } from 'react-router-dom';
import { TeacherProvider } from './TeacherContext';
import { StudentProvider } from './StudentContext';
import { ParentProvider } from './ParentContext';
import ScheduleProvider from './ScheduleContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null); // Thêm state để lưu thông tin người dùng

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedUser = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ local storage
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedUser) {
      setUser(storedUser);
      setLoggedIn(true); // Đánh dấu đã đăng nhập khi có thông tin người dùng từ local storage
    }
  }, []);

  const handleLogin = (userRole, userData) => {
    setLoggedIn(true);
    setRole(userRole);
    setUser(userData); // Lưu thông tin người dùng vào state
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('user', JSON.stringify(userData)); // Lưu thông tin người dùng vào local storage
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    setRole(null);
    setUser(null);
  };

  const loginHandler = async (email, password) => {
    if (!email || !password) {
      alert('Vui lòng nhập email và mật khẩu.');
      return;
    }
    try {
      const response = await axios.post('http://165.232.161.56:8000/api/login', {
        "emailOrUsername": email,
        "password": password
      });
      if (response.status === 200) {
        const account = convertAccountDataToModel(response.data.data);
        handleLogin(account.role, account); // Lưu thông tin người dùng khi đăng nhập thành công
        alert('Đăng nhập thành công!');
        navigate(`/${account.role}`);
      } else {
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
      }
    } catch (error) {
      console.error('Fail', error);
      alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, role, user, handleLogin, handleLogout, loginHandler }}>
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
