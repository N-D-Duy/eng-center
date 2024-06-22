import { useCourseContext } from "../../Context/CourseContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import TableComponent from "./TableComponent";

export const CourseManager = () => {
    const { courses, SetCourse } = useCourseContext();
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        setAllCourses(courses);
    }, [courses]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Teacher' },
        { header: 'Start Date' },
        { header: 'Status' },
        { header: 'Capacity' }
    ];

    const generateRow = (course, index) => (
        <GenerateCourseTr key={index} data={course} navigate={navigate}/>
    );

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Courses</h5>
                            <TableComponent columns={columns} data={allCourses} generateRow={generateRow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};




const GenerateCourseTr = ({ data, navigate }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";

    const { setCourse } = useCourseContext();

    return (
        <tr onClick={() => clickCourse(data, navigate, setCourse)}>
            <td className="text-center"><img src={data.image} alt="" /></td>
            <td><div className="text-primary fw-bold">{data.name}</div></td>
            <td>{data.teacher.name}</td>
            <td>{convertTime(data.createdAt)}</td>
            <td><span className={bgActive}>{data.status}</span></td>
            <td>{data.current_joined}/{data.capacity}</td>
        </tr>
    );
};

const clickCourse = (data, navigate, setCourse) => {
    setCourse(data);
    navigate('/admin/courseprofile');
};

