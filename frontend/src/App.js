import './App.css';
import { CourseProvider } from './Context/CourseContext';
import { TeacherProvider } from './Context/TeacherContext';
// import { Routes, Route } from 'react-router-dom';
// import { Login } from './components/Login';
// import { Register } from './components/Register';
// import { Dashboard } from './components/DashBoard';
// import { HeaderSlideBar } from './components/Form/HeaderSlideBar';
// import { CourseProfile } from './components/CourseProfile';
// import { CardProfile } from './components/Form/CardProfile';
import { CourseProfile } from './components/CourseProfile';


function App() {
  return (<div>
    <CourseProvider>
      <TeacherProvider>
        <CourseProfile />
      </TeacherProvider>
    </CourseProvider>
    {/* { <Routes>
      <Route path='/' element = {<Login />}/>
      <Route path='/admin' element = {<HeaderSlideBar />}>
          <Route path='/admin/coursemanager' element = {<CourseManager />}/>
          <Route path='/admin/paymentmanager' element = {<CourseManager />}/>
          <Route path='/admin/teachermanager' element = {<CourseManager />}/>
          <Route path='/admin/studentmanager' element = {<CourseManager />}/>
          <Route path='/admin/parentmanager' element = {<CourseManager />}/>
          <Route path='/admin/courseprofile' element = {<CourseProfile />}/>
          <Route index element = {<Dashboard />}/>
      </Route>
      <Route path='/login' element = {<Login />}/>
      <Route path='/policy' element = {<Login />}/>
      <Route path='/register' element = {<Register />}/>
    </Routes>} */}
  </div>)
}
export default App;