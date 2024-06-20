import { useCourseContext } from "../Context/CourseContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertTime } from "./Controller/Time";

export const CourseManager = () => {
    const { courses, SetCourse } = useCourseContext();
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        setAllCourses(courses);
    }, [courses]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        
                        <div className="card-body">
                            <h5 className="card-title">Datatables</h5>
                            <table className="table datatable">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Teacher</th>
                                        <th data-type="date" data-format="YYYY/DD/MM">Start Date</th>
                                        <th>Status</th>
                                        <th>Capacity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allCourses.map(c => (
                                        <GenerateCourseTr key={c.id} data={c} navigate={navigate} setCourse={SetCourse} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GenerateCourseTr = ({ data, navigate, setCourse }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";
    return (
        <tr onClick={() => clickCourse(data, navigate, setCourse)}>
            <td className="text-center"><img src={data.image} alt="" /></td>
            <td><a href="#courseDetail" className="text-primary fw-bold">{data.name}</a></td>
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
