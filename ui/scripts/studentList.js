document.addEventListener('DOMContentLoaded', function() {
    const students = [
        { name: 'John Doe', attendance: Array(15).fill(false) },
        { name: 'Jane Smith', attendance: Array(15).fill(false) },
        { name: 'Alice Johnson', attendance: Array(15).fill(false) },
        // Add more students as needed
    ];

    const studentTableBody = document.querySelector('#studentTable tbody');

    students.forEach(student => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        student.attendance.forEach((attended, index) => {
            const attendanceCell = document.createElement('td');
            const attendanceCheckbox = document.createElement('input');
            attendanceCheckbox.type = 'checkbox';
            attendanceCheckbox.checked = attended;
            attendanceCheckbox.addEventListener('change', (event) => {
                student.attendance[index] = event.target.checked;
            });
            attendanceCell.appendChild(attendanceCheckbox);
            row.appendChild(attendanceCell);
        });

        studentTableBody.appendChild(row);
    });
});
