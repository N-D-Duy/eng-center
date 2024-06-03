import { loadNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    const parents = [
        { username: 'parent1', password: 'parent1' }
    ];

    const parentTableBody = document.querySelector('#parentTable tbody');

    function renderParents() {
        parentTableBody.innerHTML = '';
        parents.forEach((parent, index) => {
            const row = document.createElement('tr');

            const usernameCell = document.createElement('td');
            usernameCell.textContent = parent.username;
            row.appendChild(usernameCell);

            const actionsCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                const newUsername = prompt('Enter new username', parent.username);
                const newPassword = prompt('Enter new password', parent.password);

                if (newUsername && newPassword) {
                    parent.username = newUsername;
                    parent.password = newPassword;
                    renderParents();
                }
            });
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                parents.splice(index, 1);
                renderParents();
            });
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            parentTableBody.appendChild(row);
        });
    }

    document.getElementById('addParentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        parents.push({ username, password });
        renderParents();

        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    renderParents();
});
