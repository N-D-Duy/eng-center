import { isLogin } from './loginManager.js';
//Add envent to login area
document.getElementById("logoutArea").addEventListener("click", logout);


//Control event click logins
function logout() {
    localStorage.setItem('loggedIn', 'false');
    updateUI();
    window.location.href = "login.html";
}

//Update UI
function updateUI() {
    if (isLogin) {
        document.getElementById("loginArea").style.display = "none";
        document.getElementById("logoutArea").style.display = "block";
    } else {
        document.getElementById("loginArea").style.display = "block";
        document.getElementById("logoutArea").style.display = "none";
    }
}

updateUI();