document.addEventListener('DOMContentLoaded', function() {
    var userRole = 'admin'; // Ví dụ: giá trị này có thể được lấy từ cơ sở dữ liệu hoặc API
    generateHeaderForRole(userRole);
    generateSlideForRole(userRole);


    document.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('toggle-sidebar-btn')) {
          document.body.classList.toggle('toggle-sidebar');
      }
    });


});


function generateHeaderForRole(role){
  var content = document.getElementById('header-content');
  content.innerHTML = `<header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center">
            <img src="../assets/img/logo.png" alt="">
            <span class="d-none d-lg-block">NiceAdmin</span>
          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
        </div><!-- End Logo -->
    
    
        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">
            <li class="nav-item dropdown pe-3">
    
              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="../assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
                <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
              </a><!-- End Profile Image Icon -->
    
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>Kevin Anderson</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
    
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
    
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i class="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
    
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i class="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
    
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
    
              </ul><!-- End Profile Dropdown Items -->
            </li><!-- End Profile Nav -->
    
          </ul>
        </nav><!-- End Icons Navigation -->
        </header><!-- End Header -->`;

}

function generateSlideForRole(role) {
  var dynamicContent = document.getElementById('slidebar-content');
  dynamicContent.innerHTML = `<aside id="sidebar" class="sidebar"></aside>`;
  var sidebarNav = document.createElement('ul');
  sidebarNav.classList.add('sidebar-nav');
  sidebarNav.id = 'sidebar-nav';
  var slideDiv = document.getElementById('sidebar');
  
  switch (role) {
      case 'admin':{
        var adminDiv = document.createElement('div');
        adminDiv.innerHTML = `
              <li class="nav-item">
                <a class="nav-link collapsed" href="index.html">
                  <i class="bi bi-grid"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="index.html">
                  <i class="bi bi-grid"></i>
                  <span>Course Manager</span>
                </a>
              </li>
        
              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-layout-text-window-reverse"></i><span>User Manager</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" class="nav-content collapse show" data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="" class="active">
                      <i class="bi bi-circle"></i><span>Teacher Manager</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i class="bi bi-circle"></i><span>Student Manager</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i class="bi bi-circle"></i><span>Parent Manager</span>
                    </a>
                  </li>
                </ul>
              </li><!-- End Tables Nav -->
        
              <li class="nav-item">
                <a class="nav-link collapsed" href="">
                  <i class="bi bi-person"></i>
                  <span>Payment Manager</span>
                </a>
              </li>
        `;

        //Handle event
        


        sidebarNav.appendChild(adminDiv);
        break;
      }
      case 'teacher':{
        var teacherDiv = document.createElement('div');
        teacherDiv.innerHTML = `
                <li class="nav-item">
                  <a class="nav-link collapsed" href="index.html">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>All Courses</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>Schedule</span>
                  </a>
                </li>
        `;
        sidebarNav.appendChild(teacherDiv);
        break;
      }
      case 'parent':{
        var parentDiv = document.createElement('div');
        parentDiv.innerHTML = `
                <li class="nav-item">
                  <a class="nav-link collapsed" href="index.html">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>All Childrent</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>Payment</span>
                  </a>
                </li>
        `;
        sidebarNav.appendChild(parentDiv);
        break;
      }
      case 'student':{
        var childDiv = document.createElement('div');
        childDiv.innerHTML = `
                <li class="nav-item">
                  <a class="nav-link collapsed" href="index.html">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>All Courses</span>
                  </a>
                </li>
        `;
        sidebarNav.appendChild(childDiv);
        break;
      }
      default:{
        break;
      }
  }
  slideDiv.appendChild(sidebarNav);
}