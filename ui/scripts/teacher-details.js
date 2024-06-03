document.addEventListener('DOMContentLoaded', function() {
    const teachers = [
        { id: 1, name: 'Teacher 1', image: 'teacher1.jpg', class: 'Class 1', bio: 'Bio of Teacher 1' },
        { id: 2, name: 'Teacher 2', image: 'teacher2.jpg', class: 'Class 2', bio: 'Bio of Teacher 2' }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const teacherId = parseInt(urlParams.get('id'));
    const mode = urlParams.get('mode'); // "view" or "edit"

    const teacherDetails = document.getElementById('teacherDetails');
    const teacher = teachers.find(t => t.id === teacherId);

    if (teacher) {
        const teacherImage = document.createElement('img');
        teacherImage.src = teacher.image;
        teacherImage.alt = teacher.name;

        const teacherName = document.createElement('h2');
        teacherName.textContent = teacher.name;

        const teacherClass = document.createElement('p');
        teacherClass.textContent = `Class: ${teacher.class}`;

        const teacherBio = document.createElement('p');
        teacherBio.textContent = teacher.bio;

        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            window.location.href = 'teacherManager.html';
        });

        teacherDetails.appendChild(teacherImage);
        teacherDetails.appendChild(teacherName);
        teacherDetails.appendChild(teacherClass);
        teacherDetails.appendChild(teacherBio);
        teacherDetails.appendChild(backButton);

        if (mode === 'edit') {
            const editForm = document.createElement('form');
            editForm.innerHTML = `
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${teacher.name}">
                <label for="class">Class:</label>
                <input type="text" id="class" name="class" value="${teacher.class}">
                <label for="bio">Bio:</label>
                <textarea id="bio" name="bio">${teacher.bio}</textarea>
                <button type="submit">Save</button>
            `;

            editForm.addEventListener('submit', (event) => {
                event.preventDefault();
                teacher.name = editForm.name.value;
                teacher.class = editForm.class.value;
                teacher.bio = editForm.bio.value;
                alert('Teacher details updated');
                window.location.href = 'teacherManager.html';
            });

            teacherDetails.appendChild(editForm);
        }
    } else {
        teacherDetails.textContent = 'Teacher not found';
    }
});
