import { Table } from "react-bootstrap";
import { useNewCourseContext } from "../Context/NewCourseContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useCourseContext } from "../Context/CourseContext";

export const Dashboard = () => {
    const { courseData } = useNewCourseContext();
    const {role} = useAuthContext(); 
    const navigate = useNavigate();
    const { setCourse } = useCourseContext();

  return (
    <div>
      <h2>New Course</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course, index) => (
            <tr key={index} onClick={() => ClickCourse(course, navigate, setCourse, role)}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const ClickCourse = async (data, navigate, setCourse, role) => {
    await setCourse(data);
    navigate(`/${role}/courseprofile`);
};
