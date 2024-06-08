import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../style.css'
export const Sidebar = ({prop: role}) => {
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
                            <a class="nav-link collapsed" href="#slidebar-dashboard">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                            </a>
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
            <a class="nav-link collapsed" href="#slidebar-dashboard">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
            </a>
        </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-course-manager">
                  <i class="bi bi-grid"></i>
                  <span>Course Manager</span>
                </a>
              </li>
        
              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#slidebar-user-manager">
                  <i class="bi bi-layout-text-window-reverse"></i><span>User Manager</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" class="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="#slidebar-teacher-manager" class="active">
                      <i class="bi bi-circle"></i><span>Teacher Manager</span>
                    </a>
                  </li>
                  <li>
                    <a href="#slidebar-student-manager">
                      <i class="bi bi-circle"></i><span>Student Manager</span>
                    </a>
                  </li>
                  <li>
                    <a href="#slidebar-parent-manager">
                      <i class="bi bi-circle"></i><span>Parent Manager</span>
                    </a>
                  </li>
                </ul>
              </li>
        
              <li class="nav-item">
                <a class="nav-link collapsed" href="#slidebar-payment-manager">
                  <i class="bi bi-person"></i>
                  <span>Payment Manager</span>
                </a>
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