
import '../fonts/icomoon/style.css';
import '../css/bootstrap.min.css';
import '../css/jquery-ui.css';
import '../css/owl.carousel.min.css';
import '../css/owl.theme.default.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/bootstrap-datepicker.css';
import '../fonts/flaticon/font/flaticon.css';
import '../css/aos.css';
import '../css/jquery.mb.YTPlayer.min.css';
import '../css/style.css';

const Navbar = () =>{
    return (
    <header class="site-navbar py-4 bg-light site-navbar-target" role="banner">
        <div class="container">
        <div class="d-flex align-items-center">
            <div class="site-logo">
            <a href="index.html" class="d-block">
                <img src="../images/logo.jpg" alt="Image" class="img-fluid" />
            </a>
            </div>
            <div class="mr-auto">
            <nav class="site-navigation position-relative text-right" role="navigation">
                <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li class="active">
                    <a href="index.html" class="nav-link text-left">Home</a>
                </li>
                <li class="has-children">
                    <a href="about.html" class="nav-link text-left">About Us</a>
                    <ul class="dropdown">
                    <li><a href="teachers.html">Our Teachers</a></li>
                    <li><a href="about.html">Our School</a></li>
                    </ul>
                </li>
                </ul>
            </nav>

            </div>
            <div class="col-lg-3 text-right">
            <a href="login.html" class="small mr-3"><span class="icon-unlock-alt"></span> Log In</a>
            <a href="register.html" class="small btn btn-primary px-4 py-2 rounded-0"><span class="icon-users"></span> Register</a>
            </div>
        </div>
        </div>
    </header>
  );

} 

export default Navbar;