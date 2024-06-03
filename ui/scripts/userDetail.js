function displayStudentDetails(studentId) {
    const student = students.find(s => s.id == studentId);
    const studentDetail = document.getElementById('studentDetail');
    studentDetail.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Class: ${student.class}</p>
        <p>Parent: ${student.parent}</p>
    `;
}

function displayTeacherDetails(teacherId) {
    const teacher = teachers.find(t => t.id == teacherId);
    const teacherDetail = document.getElementById('teacherDetail');
    teacherDetail.innerHTML = `
        <p>Name: ${teacher.name}</p>
        <p>Subject: ${teacher.subject}</p>
    `;
}

function displayParentDetails(parentId) {
    const parent = parents.find(p => p.id == parentId);
    const parentDetail = document.getElementById('parentDetail');
    parentDetail.innerHTML = `
        <p>Name: ${parent.name}</p>
        <p>Student: ${parent.student}</p>
    `;
}
