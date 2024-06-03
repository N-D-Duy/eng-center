const listElement = document.querySelector("#course-list");

// Đọc dữ liệu từ file JSON
fetch("./data/courses.json")
  .then((response) => response.json())
  .then((data) => {
    const courses = data;

    // Duyệt qua từng khóa học và hiển thị
    courses.forEach((course) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img src="${course.image}" alt="${course.name}" /><br />
        <h2>${course.name}</h2>
        <h3>Teacher: ${course.teacher}</h3>
        <h3>${course.students.length} / ${course.capacity}</h3>
      `;
      listElement.appendChild(listItem);
      listItem.addEventListener("click", () => {
        window.location.href = `course-single.html`;
      });
    });
  });s