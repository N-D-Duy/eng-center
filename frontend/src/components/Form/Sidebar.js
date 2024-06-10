import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { AuthProvider, useAuth } from "../../Context/AuthContext";
export const Sidebar = () => {

    const {role} = useAuth(AuthProvider);

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
                <aside id="sidebar" class = "sidebar">
                    <ul class="sidebar-nav" id="sidebar-nav">
                        <li class="nav-item">
                            <Link to={`/${role}`}>
                                <a class="nav-link collapsed" href="#a">
                                <i class="bi bi-grid"></i>
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
              <li class="nav-item">
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
                <a class="nav-link collapsed" href="#slidebar-student-all-course">
                <i class="bi bi-person"></i>
                <span>All Courses</span>
                </a>
            </li>
        </div>
    )
}


const TeacherSlidebar = () => {
    return(
        <div>
            <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-teacher-all-course">
                <i class="bi bi-person"></i>
                <span>All Courses</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-teacher-schedule">
                <i class="bi bi-person"></i>
                <span>Schedule</span>
                </a>
            </li>
        </div>
    )
}

const ParentSlidebar = () => {
    return(
        <div>
            <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-all-childrent">
                <i class="bi bi-person"></i>
                <span>All Childrent</span>
                </a>
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