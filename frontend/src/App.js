import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/DashBoard';
import { HeaderSlideBar } from './components/HeaderSlideBar';
import { CourseManager } from './components/CourseManager';


function App() {
  return (<div>
    <Routes>
      <Route path='/' element = {<Login />}/>
      <Route path='/admin' element = {<HeaderSlideBar />}>
          <Route path='/admin/coursemanager' element = {<CourseManager />}/>
          <Route path='/admin/paymentmanager' element = {<CourseManager />}/>
          <Route path='/admin/teachermanager' element = {<CourseManager />}/>
          <Route path='/admin/studentmanager' element = {<CourseManager />}/>
          <Route path='/admin/parentmanager' element = {<CourseManager />}/>
          <Route index element = {<Dashboard />}/>
      </Route>
      <Route path='/login' element = {<Login />}/>
      <Route path='/policy' element = {<Login />}/>
      <Route path='/register' element = {<Register />}/>
    </Routes>
  </div>)
}
export default App;