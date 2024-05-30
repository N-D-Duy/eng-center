import { authenticate } from './loginManager.js';
document.getElementById("btn-submit-login-c").addEventListener("click", login);

export function login() {
    alert('Tên người dùng hoặc mật khẩu không chính xác!');
    const username = document.getElementById('username').value;
    const password = document.getElementById('pword').value;
    console.log(username, password);
    //Check login but return true because test
    if (authenticate(username, password)) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';     
    } else {
        alert('Tên người dùng hoặc mật khẩu không chính xác!');  
    }
}