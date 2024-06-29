import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import logo from '../../img/logo192.png';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { useUserContext } from '../../Context/UserContext';

const Header = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };


  const {handleLogout} = useAuthContext();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser;
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
    return null; // Return null if no valid user found
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
  }, []); // Empty dependency array to run effect only once on mount



  useEffect(() => {
    if (isSidebarToggled) {
      document.body.classList.add('toggle-sidebar');
    } else {
      document.body.classList.remove('toggle-sidebar');
    }

    return () => {
      document.body.classList.remove('toggle-sidebar');
    };
  }, [isSidebarToggled]);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="Logo" />
          <span className="d-none d-lg-block">NiceAdmin</span>
        </div>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Dropdown>
              <Dropdown.Toggle as="a" className="nav-link nav-profile d-flex align-items-center pe-0" href="#null">
                <img src={logo} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block ps-2">{user?.account.full_name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user?.account.full_name}</h6>
                  <span>{user?.account.role}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <Dropdown.Item onClick={() => navigate('/admin/profile')}>
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <Dropdown.Item onClick={() => navigate('/admin/profile')}>
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <Dropdown.Item onClick={() => {
                  handleLogout();
                  navigate('/login');
                 }}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
