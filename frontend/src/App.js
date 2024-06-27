import './App.css';
import { CourseProvider } from './Context/CourseContext';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/DashBoard';
import { HeaderSlideBar } from './components/Form/HeaderSlideBar';
import { CourseProfile } from './components/Profile/CourseProfile';
import { CourseManager } from './components/Manager/CourseManager';
import { TeacherManager } from './components/Manager/TeacherManager';
import { StudentManager } from './components/Manager/StudentManager';
import { ParentManager } from './components/Manager/ParentManager';
import { UserOtherProfile, UserProfile } from './components/Profile/UserProfile';
import { UserProvider } from './Context/UserContext';
import { Schedule } from './components/Form/Schedule/Scheduele';
import { FormAddNewCourse, FormAddNewUser } from './components/FormAdd';

function App() {

  return (<div>
    <UserProvider>
      <CourseProvider>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path= {`/admin`} element = {<HeaderSlideBar />}>

            {/* Manager */}
              <Route path='/admin/coursemanager' element = {<CourseManager />}/>
              <Route path='/admin/paymentmanager' element = {<CourseManager />}/>
              <Route path='/admin/teachermanager' element = {<TeacherManager />}/>
              <Route path='/admin/studentmanager' element = {<StudentManager />}/>
              <Route path='/admin/parentmanager' element = {<ParentManager />}/>

            {/* Profile  */}
              <Route path={'/admin/courseprofile'} element = {<CourseProfile />}/>
              <Route path={'/admin/otherprofile'} element = {<UserOtherProfile />}/>
              <Route path={'/admin/profile'} element = {<UserProfile />}/>
              {/* Add User */}
              <Route path='/admin/add_user' element = {<FormAddNewUser />}/>
              <Route path='/admin/add_course' element = {<FormAddNewCourse />}/>
              {/* Default */}
              <Route index element = {<Dashboard />}/>
          </Route>

          <Route path= {`/teacher`} element = {<HeaderSlideBar />}>
            <Route path={"/teacher/courses"} element = {<CourseManager />}/>
            {/* Profile  */}
              <Route path={"/teacher/courseprofile"} element = {<CourseProfile />}/>
              <Route path={'/teacher/otherprofile'} element = {<UserOtherProfile />}/>
              <Route path={'/teacher/profile'} element = {<UserProfile />}/>

              {/* Schedule */}
              <Route path={'/teacher/schedule'} element = {<Schedule />} />
              {/* Default */}
              <Route index element = {<Dashboard />}/>
          </Route>

          <Route path= {`/student`} element = {<HeaderSlideBar />}>
            <Route path={"/student/courses"} element = {<CourseManager />}/>
            {/* Profile  */}
              <Route path={"/student/courseprofile"} element = {<CourseProfile />}/>
              <Route path={'/student/otherprofile'} element = {<UserOtherProfile />}/>
              <Route path={'/student/profile'} element = {<UserProfile />}/>

              {/* Schedule */}
              <Route path={'/student/schedule'} element = {<Schedule />} />
              {/* Default */}
              <Route index element = {<Dashboard />}/>
          </Route>

          <Route path= {`/parent`} element = {<HeaderSlideBar />}>

            
            {/* Profile  */}
              <Route path={"/parent/courseprofile"} element = {<CourseProfile />}/>
              <Route path={'/parent/otherprofile'} element = {<UserOtherProfile />}/>
              <Route path={'/parent/profile'} element = {<UserProfile />}/>

              {/* Schedule */}
              <Route path={'/parent/schedule'} element = {<Schedule />} />
              {/* Default */}
              <Route index element = {<Dashboard />}/>
          </Route>





          <Route path='/login' element = {<Login />}/>
          <Route path='/policy' element = {<Login />}/>
          <Route path='/register' element = {<Register />}/>
        </Routes>
      </CourseProvider>  
    </UserProvider>
  </div>)
}
export default App;