import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { CourseProvider } from './Context/CourseContext';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/DashBoard';
import { HeaderSlideBar } from './components/Form/HeaderSlideBar';
import { CourseProfile } from './components/Profile/CourseProfile';
import { CourseManager } from './components/Manager/CourseManager';
import AddUserForm from './components/AddUser';
import UserProfile from './components/UserProfile';
import { TeacherManager } from './components/Manager/TeacherManager';
import { StudentManager } from './components/Manager/StudentManager';
import { ParentManager } from './components/Manager/ParentManager';
import StudentProfile from './components/Profile/StudentProfile';
import ParentProfile from './components/Profile/ParentProfile';
import TeacherProfile from './components/Profile/TeacherProfile';


function App() {
  return (<div>
    <AuthProvider>
      <CourseProvider>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/admin' element = {<HeaderSlideBar />}>
              <Route path='/admin/coursemanager' element = {<CourseManager />}/>
              <Route path='/admin/paymentmanager' element = {<CourseManager />}/>
              <Route path='/admin/teachermanager' element = {<TeacherManager />}/>
              <Route path='/admin/studentmanager' element = {<StudentManager />}/>
              <Route path='/admin/parentmanager' element = {<ParentManager />}/>
              <Route path='/admin/courseprofile' element = {<CourseProfile />}/>
              <Route path='/admin/studentprofile' element = {<StudentProfile />}/>
              <Route path='/admin/teacherprofile' element = {<TeacherProfile />}/>
              <Route path='/admin/parentprofile' element = {<ParentProfile />}/>
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