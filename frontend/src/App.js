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
import { TeacherManager } from './components/Manager/TeacherManager';
import { StudentManager } from './components/Manager/StudentManager';
import { ParentManager } from './components/Manager/ParentManager';
import { UserOtherProfile, UserProfile } from './components/Profile/UserProfile';
import { UserProvider } from './Context/UserContext';


function App() {
  return (<div>
    <UserProvider>
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
              <Route path='/admin/otherprofile' element = {<UserOtherProfile />}/>
              <Route path='/admin/profile' element = {<UserProfile />}/>
              <Route path='/admin/add_user' element = {<AddUserForm />}/>
              <Route index element = {<Dashboard />}/>
          </Route>
          <Route path='/login' element = {<Login />}/>
          <Route path='/profile' element = {<UserProfile />}/>
          <Route path='/policy' element = {<Login />}/>
          <Route path='/register' element = {<Register />}/>
        </Routes>
      </CourseProvider>  
    </UserProvider>
  </div>)
}
export default App;