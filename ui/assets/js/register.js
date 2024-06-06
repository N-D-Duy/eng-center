document.getElementById('register-role').addEventListener('change', function() {
    var selectedRole = this.value;
    var studentIdDiv = document.getElementById('register-studentID-div');
    if (selectedRole === 'parent') {
        studentIdDiv.classList.remove('d-none');
    } else {
        studentIdDiv.classList.add('d-none');
    }
    console.log(studentIdDiv.classList);
});

document.getElementById('btn-submit-register').addEventListener('click', function() {
    //Handle register proerties

    
    //Default: register success
    alert('Register success');
    window.location.href = 'login.html';
});