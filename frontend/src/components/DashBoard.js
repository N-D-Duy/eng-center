import { Table } from "react-bootstrap";
import { useNewCourseContext } from "../Context/NewCourseContext";

export const Dashboard = () => {
    const { courseData } = useNewCourseContext();

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
                        <tr key={index}>
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
}