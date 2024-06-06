
document.addEventListener('DOMContentLoaded', function() {
    var tbody = document.getElementById('table-allCourse').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    fetch('../resource/course.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                var courseDiv = generateCourseDiv(course);
                tbody.appendChild(courseDiv);
            });
        })
        .catch(error => console.error('Error loading JSON:', error.message));
});


function generateCourseDiv(data){
    const courseElement = document.createElement('tr');
    courseElement.innerHTML = `
        <td scope="row" class="text-center"><a href="#"><img src="${data.image}" alt=""></a></td>
        <td><a href="#" class="text-primary fw-bold"> ${data.name}</a></td>
        <td>${data.teacher._id}</td>
        <td>14/25</td>
        <td>${convertTime(data.createdAt)}</td>
        <td><span class="${data.status == 'active' ? "badge bg-success" : "badge bg-warning"}">${data.status}</span></td>
    `;
    return courseElement;
}


function convertTime(data){
    console.log("Time: "+ data)
    const dateObject = new Date(data);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}/${day}/${month}`;
}