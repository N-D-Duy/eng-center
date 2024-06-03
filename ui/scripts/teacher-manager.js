document.addEventListener('DOMContentLoaded', function() {
    const teachers = [
        { id: 1, name: 'Teacher 1', image: 'teacher1.jpg', class: 'Class 1' },
        { id: 2, name: 'Teacher 2', image: 'teacher2.jpg', class: 'Class 2' }
    ];

    const teacherList = document.getElementById('teacherList');

    function renderTeachers() {
        teacherList.innerHTML = '';
        teachers.forEach((teacher) => {
            const teacherCard = document.createElement('div');
            teacherCard.classList.add('teacher-card');

            const teacherImage = document.createElement('img');
            teacherImage.src = teacher.image;
            teacherImage.alt = teacher.name;

            const teacherName = document.createElement('h3');
            teacherName.textContent = teacher.name;

            const teacherClass = document.createElement('p');
            teacherClass.textContent = `Class: ${teacher.class}`;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                window.location.href = `teacherDetails.html?id=${teacher.id}&mode=edit`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                const confirmDelete = confirm('Are you sure you want to delete this teacher?');
                if (confirmDelete) {
                    const hasClass = teacher.class !== ''; // Check if the teacher has a class
                    if (!hasClass) {
                        // Remove teacher from list
                        const index = teachers.findIndex(t => t.id === teacher.id);
                        if (index !== -1) {
                            teachers.splice(index, 1);
                            renderTeachers();
                        }
                    } else {
                        // Redirect to replace teacher page
                        window.location.href = `replace-teacher.html?id=${teacher.id}`;
                    }
                }
            });

            teacherCard.appendChild(teacherImage);
            teacherCard.appendChild(teacherName);
            teacherCard.appendChild(teacherClass);
            teacherCard.appendChild(updateButton);
            teacherCard.appendChild(deleteButton);

            teacherList.appendChild(teacherCard);
        });
    }

    renderTeachers();
});
