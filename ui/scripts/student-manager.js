import { loadNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    const students = [
        { username: 'student1', password: 'student1' }
    ];

    const studentTableBody = document.querySelector('#studentTable tbody');

    function renderStudents() {
        studentTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');

            const usernameCell = document.createElement('td');
            usernameCell.textContent = student.username;
            row.appendChild(usernameCell);

            const actionsCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                const newUsername = prompt('Enter new username', student.username);
                const newPassword = prompt('Enter new password', student.password);

                if (newUsername && newPassword) {
                    student.username = newUsername;
                    student.password = newPassword;
                    renderStudents();
                }
            });
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                students.splice(index, 1);
                renderStudents();
            });
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            studentTableBody.appendChild(row);
        });
    }

    document.getElementById('addStudentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        students.push({ username, password });
        renderStudents();

        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    renderStudents();
});
