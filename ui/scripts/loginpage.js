import { authenticate } from './loginManager.js';
document.getElementById("btn-submit-login-c").addEventListener("click", login);

export function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('pword').value;
    console.log(username, password);
    //Check login but return true because test
    if (authenticate(username, password)) {
        localStorage.setItem('loggedIn', 'true');
        //Phan quyen o day ví dụ role admin
        window.location.href = 'admissions.html';     
    } else {
        alert('Tên người dùng hoặc mật khẩu không chính xác!');  
    }
}