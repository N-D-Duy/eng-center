import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = (prop) => {
    return (
        <RegisterView />
    )
}

const RegisterView = () => {

    const navigate = useNavigate();

    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userInvitedCode, setInvitedCode] = useState('');
    const [role, setRole] = useState('teacher');
    const [agreePolicy, setAgreePolicy] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!agreePolicy) return;
        if(!email || !password) {
          alert('Vui lòng nhập email và password');
          return;
        }
        register(role);
    };

    const register = async (role) => {
      if(role ==='parent' && !userInvitedCode) {
        alert('Vui lòng nhập mã giới thiệu');
        return;
      }
      try {
          const response = await axios.post(`http://localhost:8000/api/teacher`, {
              "account":{
                  "user_name": "tranvietbao",
                  "password": password,
                  "role": "teacher",
                  "status": "actived",
                  "email": email,
                  "phone": "0213232"
              },
              "teacher": {
                  "name": username,
                  "session_count": 0,
                  "account": ""
              }
          
          });
            if (response.status === 200) {
              alert('Đăng nhập thành công!');
              navigate(`/login`);
            } else {
              alert("email: " +  email + " pass: " + password);
              alert('Đăng ký không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
            }
        } catch (error) {
            console.error('Đăng ký không thành công:', error);
            alert('Đăng ký không thành công. Vui lòng thử lại sau.');
        }
      
    }


    return (
        <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
  
                <div class="d-flex justify-content-center py-4">
                  <a href="#dashboard" class="logo d-flex align-items-center w-auto">
                    <img src="../assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>
  
                <div class="card mb-3">
  
                  <div class="card-body">
  
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p class="text-center small">Enter your personal details to create account</p>
                    </div>
  
                    <form class="row g-3 needs-validation" novalidate>
                      
  
                    <div class="col-12">
                        <label for="yourEmail" class="form-label">Your Email</label>
                        <input type="email" name="email" class="form-control" onChange={(e) => setUserEmail(e.target.value)} required />
                        <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                      </div>

                      <div class="col-12">
                        <label for="yourName" class="form-label">Select</label>
                        <div class="col-12">
                          <select class="form-select" aria-label="Default select example" onChange = {(e) => setRole(onClickRole(e))}>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                          </select>
                        </div>
                      </div>

                      
                      <div class="col-12 d-none" id = "register-studentID-div">
                        <label for="yourName" class="form-label">Invited Code</label>
                        <input type="text" name="name" class="form-control" onChange={(e) => setInvitedCode(e.target.value)} required />
                        <div class="invalid-feedback">Please, enter your name!</div>
                      </div>

                      <div class="col-12">
                        <label for="yourName" class="form-label">Your Name</label>
                        <input type="text" name="name" class="form-control" onChange={(e) => setUsername(e.target.value)} required />
                        <div class="invalid-feedback">Please, enter your name!</div>
                      </div>
  
  
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" onChange={(e) => setPassword(e.target.value)} required />
                        <div class="invalid-feedback">Please enter your password!</div>
                      </div>
  
                      <div class="col-12">
                        <div class="form-check">
                          <input class="form-check-input" name="terms" type="checkbox" value="" onChange={(e) => setAgreePolicy(e.target.checked)} required />
                          <label class="form-check-label" for="acceptTerms">I agree and accept the <Link to="/policy">terms and conditions</Link></label>
                          <div class="invalid-feedback">You must agree before submitting.</div>
                        </div>
                      </div>
                      <div class="col-12" id = "btn-submit-register">   
                        <div class="btn btn-primary w-100" onClick={handleRegister}>Create Account</div>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">Already have an account? <Link to="/login">Log in</Link></p>
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

function onClickRole(event){
    var selectedRole = event.target.value; 
    var studentIdDiv = document.getElementById('register-studentID-div');
    if (selectedRole === 'parent') {
        studentIdDiv.classList.remove('d-none');
    } else {
        studentIdDiv.classList.add('d-none');
    }
    return selectedRole;
}
