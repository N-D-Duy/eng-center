import './App.css';
import { Sidebar } from './components/Sidebar.js';
import { CourseManager } from './components/CourseManager.js';
import Header from './components/Header.js';
import React, { useState, useEffect } from 'react';
import './main.js'
function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('./data/course.json')
      .then(response => response.json())
      .then(data => {
        // Xử lý dữ liệu ở đây
        console.log(data);  
        setCourses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);

  return (
      <div>
        <Header />
        <Sidebar prop = {'admin'} />
        <CourseManager prop = {courses}/>
      </div>
  );
}



export default App;
