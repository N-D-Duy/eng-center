import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { CourseProvider } from './Context/CourseContext';
import { TeacherProvider } from './Context/TeacherContext';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/DashBoard';
import { HeaderSlideBar } from './components/Form/HeaderSlideBar';
import { CourseProfile } from './components/CourseProfile';
import { CardProfile } from './components/Form/CardProfile';
import { EventCalendar, TeacherSchedule } from './components/Form/Schedule/Scheduele';
import { CourseManager } from './components/CourseManager';
import { StudentProvider } from './Context/StudentContext';
import { ParentProvider } from './Context/ParentContext';
import AddUserForm from './components/AddUser';
import UserProfile from './components/UserProfile';


function App() {
  return (<div>
    <AuthProvider>
      <CourseProvider>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/admin' element = {<HeaderSlideBar />}>
              <Route path='/admin/coursemanager' element = {<CourseManager />}/>
              <Route path='/admin/paymentmanager' element = {<CourseManager />}/>
              <Route path='/admin/teachermanager' element = {<TeacherSchedule />}/>
              <Route path='/admin/studentmanager' element = {<CourseManager />}/>
              <Route path='/admin/parentmanager' element = {<CourseManager />}/>
              <Route path='/admin/courseprofile' element = {<CourseProfile />}/>
              <Route path='/admin/add_user' element = {<AddUserForm />}/>
              <Route index element = {<Dashboard />}/>
          </Route>
          <Route path='/login' element = {<Login />}/>
          <Route path='/profile' element = {<UserProfile />}/>
          <Route path='/policy' element = {<Login />}/>
          <Route path='/register' element = {<Register />}/>
        </Routes>
      </CourseProvider>  
    </AuthProvider>
  </div>)
}
export default App;