import { Link, useLocation } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { useAuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
export const Sidebar = () => {

    const {role} = useAuthContext();
    const location = useLocation();

    // Hàm này kiểm tra xem một đường dẫn có phải là đường dẫn hiện tại hay không
    const isActive = (path) => {
        return location.pathname === path;
    };

    const isDashBoardActive = () => {
        return location.pathname === `/${role}`;
    };

    const renderView = (role) => {
        switch(role) {
            case 'admin':
                return <AdminSlidebar />;
            case 'teacher':
                return <TeacherSlidebar />;
            case 'student':
                return <StudentSlidebar />;
            case 'parent':
                return <ParentSlidebar />;
            default:{
                return <div></div>;
            }
        }
    };
    
    return (
        <div>
            {/* <Header /> */}
            <div id="slidebar-content">
                <aside id="sidebar" class="sidebar">
                    <ul class="sidebar-nav" id="sidebar-nav">
                        <li className={`nav-item ${isDashBoardActive() ? 'active' : ''}`}>
                            <Link to={`/${role}`}>
                                <a className="nav-link collapsed" href="#a">
                                <i className="bi bi-grid"></i>
                                <span>Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        {renderView(role)}
                    </ul>
                </aside>
            </div>
        </div>
    )
}


const AdminSlidebar = () =>{
    return (
        <div class="sidebar-nav" id="sidebar-nav">
              <li class="nav-item active">
                <Link to ="/admin/coursemanager"> 
                    <a class="nav-link collapsed" href="#a">
                        <i class="bi bi-grid"></i>
                        <span>Course Manager</span>
                    </a>
                </Link>
              </li>
        
              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#slidebar-user-manager">
                    <i class="bi bi-layout-text-window-reverse"></i><span>User Manager</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" class="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                        <Link to ="/admin/teachermanager"> 
                            <i class="bi bi-circle"></i><span>Teacher Manager</span>
                        </Link>
                  </li>
                  <li>
                        <Link to ="/admin/studentmanager"> 
                        <i class="bi bi-circle"></i><span>Student Manager</span>
                        </Link>
                  </li>
                  <li>
                        <Link to ="/admin/parentmanager"> 
                             <i class="bi bi-circle"></i><span>Parent Manager</span>
                        </Link>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <div class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
                    <i class="bi bi-layout-text-window-reverse"></i><span>Add</span><i class="bi bi-chevron-down ms-auto"></i>
                </div>
                <ul id="tables-nav" class="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                        <Link to ="/admin/add_course"> 
                            <i class="bi bi-circle"></i><span>Add Course</span>
                        </Link>
                  </li>
                  <li>
                        <Link to ="/admin/add_user"> 
                        <i class="bi bi-circle"></i><span>Add User</span>
                        </Link>
                  </li>
                </ul>
              </li>
        
              <li class="nav-item">
                <Link to = "/admin/paymentmanager">
                    <a class="nav-link collapsed" href="#a">
                    <i class="bi bi-person"></i>
                    <span>Payment Manager</span>
                    </a>
                </Link>
              </li>
        </div>
    )
}

const StudentSlidebar = () => {
    return(
        <div>
            <li class="nav-item">
                <div class="nav-link collapsed">
                <Link to ="/student/courses"> 
                    <i class="bi bi-person"></i>
                    <span>Courses</span>
                </Link>
                </div>
            </li>
            <li class="nav-item">
                <div class="nav-link collapsed">
                <Link to ="/student/schedule"> 
                    <i class="bi bi-person"></i>
                    <span>Schedule</span>
                </Link>
                </div>
            </li>
        </div>
    )
}


const TeacherSlidebar = () => {
    return(
        <div>
            <li class="nav-item">
                <div class="nav-link collapsed">
                <Link to ="/teacher/courses"> 
                    <i class="bi bi-person"></i>
                    <span>Courses</span>
                </Link>
                </div>
            </li>
            <li class="nav-item">
                <div class="nav-link collapsed">
                <Link to ="/teacher/schedule"> 
                    <i class="bi bi-person"></i>
                    <span>Schedule</span>
                </Link>
                </div>
            </li>
        </div>
    )
}

const ParentSlidebar = () => {
    return(
        <div>
            <li class="nav-item">
                <div class="nav-link collapsed">
                <i class="bi bi-person"></i>
                <span>All Children</span>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-payment">
                <i class="bi bi-person"></i>
                <span>Payment</span>
                </a>
            </li>
        </div>
    )
}

