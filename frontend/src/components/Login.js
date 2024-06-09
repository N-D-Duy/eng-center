import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../Context/AuthContext';

export const Login = (prop) => {
    return (
        <LoginView />
    )
}

const LoginView = () => {
    const navigate = useNavigate();
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const {handleLogin} = useAuth(AuthProvider);
    const handleEvent = async (e) => {
        e.preventDefault();
        handleLogin('admin');
        console.log(`${email} : ${password}`);
        navigate('/admin');
        // try {
        //     const response = await axios.post('http://165.232.161.56:8000/api/login', {
        //         email: email,
        //         password: password
        //       });
        //       if (response.status === 200) {
        //         alert('Đăng nhập thành công!');
        //       } else {
        //         alert("email: " +  email + " pass: " + password);
        //         alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
        //       }
        // } catch (error) {
        //     console.error('Đăng nhập không thành công:', error);
        //     alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
        //     navigate('/');
        // }
    };



    return (
        <div class="container">
            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div class="d-flex justify-content-center py-4">
                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                        <img src="../assets/img/logo.png" alt="" />
                        <span class="d-none d-lg-block">NiceAdmin</span>
                        </a>
                    </div>

                    <div class="card mb-3">

                        <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                            <p class="text-center small">Enter your username & password to login</p>
                        </div>

                        <form class="row g-3 needs-validation" novalidate>

                            <div class="col-12">
                                <label for="yourUsername" class="form-label">Email</label>
                                <div class="input-group has-validation">
                                    <input type="text" name="username" class="form-control" onChange={(e) => setUserEmail(e.target.value)} required />
                                    <div class="invalid-feedback">Please enter your username.</div>
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="yourPassword" class="form-label">Password</label>
                                <input type="password" name="password" class="form-control" onChange={(e) => setPassword(e.target.value)} required />
                                <div class="invalid-feedback">Please enter your password!</div>
                            </div>

                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                    <label class="form-check-label" for="rememberMe">Remember me</label>
                                </div>
                            </div>
                            <div class="col-12" id = "btn-submit-login">
                                <div class="btn btn-primary w-100" onClick={handleEvent}>Login</div>
                            </div>
                            <div class="col-12">
                                <p class="small mb-0">Don't have account? <Link to = "/register">Create an account</Link></p>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}
