const listElement = document.querySelector("#course-list");

function showCourseList(){
  
fetch("./data/courses.json")
.then((response) => response.json())
.then((data) => {
  const courses = data;

  // Duyệt qua từng khóa học và hiển thị
  courses.forEach((course) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="${course.image}" alt="${course.name}" style: " max-height: 100%;  width: auto;" /><br />
      <h2>${course.name}</h2>
      <h3>Teacher: ${course.teacher}</h3>
      <h3>${course.students.length} / ${course.capacity}</h3>
    `;
    listElement.appendChild(listItem);
    listItem.addEventListener("click", () => {
      window.location.href = `course-single.html`;
    });

    // Add hover effect
    listItem.addEventListener("mouseover", () => {
      listItem.style.backgroundColor = "#f9f9f9";
    });
    listItem.addEventListener("mouseout", () => {
      listItem.style.backgroundColor = "white";
    });

    // add class for list item
    listItem.classList.add("course-item");

  });
}
);
}

showCourseList();
