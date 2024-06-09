import './App.css';
import { Sidebar } from './components/Sidebar.js';
import { CourseManager } from './components/CourseManager.js';
import Header from './components/Header.js';
import React, { useState, useEffect } from 'react';
import './main.js'
function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      //Get all course
      const fetchData = async () => {
        try {
          const response = await fetch('./data/course.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setCourses(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div>
        <Header />
        <Sidebar prop = {'admin'} />
        <CourseManager prop = {courses}/>
      </div>
  );
}



export default App;
