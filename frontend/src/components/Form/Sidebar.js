import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useAuthContext } from "../../Context/AuthContext";

export const Sidebar = () => {
  const { role } = useAuthContext();
  const location = useLocation();

  // Hàm này kiểm tra xem một đường dẫn có phải là đường dẫn hiện tại hay không
  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDashBoardActive = () => {
    return location.pathname === `/${role}`;
  };

  const renderView = (role) => {
    switch (role) {
      case "admin":
        return <AdminSidebar />;
      case "teacher":
        return <TeacherSidebar />;
      case "student":
        return <StudentSidebar />;
      case "parent":
        return <ParentSidebar />;
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <div id="sidebar-content">
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className={`nav-item ${isDashBoardActive() ? "active" : ""}`}>
              <Link to={`/${role}`}>
                <span className="nav-link collapsed">
                  <i className="bi bi-grid"></i>
                  Dashboard
                </span>
              </Link>
            </li>
            {renderView(role)}
          </ul>
        </aside>
      </div>
    </div>
  );
};

const AdminSidebar = () => {
  return (
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item active">
        <Link to="/admin/coursemanager">
          <span className="nav-link collapsed">
            <i className="bi bi-grid"></i>
            Course Manager
          </span>
        </Link>
      </li>

      <li className="nav-item">
        <span
          className="nav-link collapsed"
          data-bs-target="#tables-nav"
          data-bs-toggle="collapse"
        >
          <i className="bi bi-layout-text-window-reverse"></i>
          User Manager
          <i className="bi bi-chevron-down ms-auto"></i>
        </span>
        <ul
          id="tables-nav"
          className="nav-content collapse show"
          data-bs-parent="#sidebar-nav"
        >
          <li>
            <Link to="/admin/teachermanager">
              <span>
                <i className="bi bi-circle"></i>
                Teacher Manager
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/studentmanager">
              <span>
                <i className="bi bi-circle"></i>
                Student Manager
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/parentmanager">
              <span>
                <i className="bi bi-circle"></i>
                Parent Manager
              </span>
            </Link>
          </li>
        </ul>
      </li>

      <li className="nav-item">
        <span
          className="nav-link collapsed"
          data-bs-target="#tables-nav"
          data-bs-toggle="collapse"
        >
          <i className="bi bi-layout-text-window-reverse"></i>
          Add
          <i className="bi bi-chevron-down ms-auto"></i>
        </span>
        <ul
          id="tables-nav"
          className="nav-content collapse show"
          data-bs-parent="#sidebar-nav"
        >
          <li>
            <Link to="/admin/add_course">
              <span>
                <i className="bi bi-circle"></i>
                Add Course
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/add_user">
              <span>
                <i className="bi bi-circle"></i>
                Add User
              </span>
            </Link>
          </li>
        </ul>
      </li>

      <li className="nav-item">
        <Link to="/admin/paymentmanager">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            Payment Manager
          </span>
        </Link>
      </li>
    </ul>
  );
};

const StudentSidebar = () => {
  return (
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <Link to="/student/courses">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            Courses
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/student/schedule">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            Schedule
          </span>
        </Link>
      </li>
    </ul>
  );
};

const TeacherSidebar = () => {
  return (
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <Link to="/teacher/courses">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            Courses
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/teacher/schedule">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            Schedule
          </span>
        </Link>
      </li>
    </ul>
  );
};

const ParentSidebar = () => {
  return (
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <Link to="/parent/allchildren">
          <span className="nav-link collapsed">
            <i className="bi bi-person"></i>
            All Children
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link collapsed" href="#slidebar-payment">
          <i className="bi bi-person"></i>
          Payment
        </span>
      </li>
    </ul>
  );
};
