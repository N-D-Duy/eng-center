import { useCourseContext } from "../../Context/CourseContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import TableComponent from "./TableComponent";
import { useAuthContext } from "../../Context/AuthContext";
import { courseImageDefault } from "../../config/imageDefault";

export const CourseManager = () => {
    const { courses } = useCourseContext();
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        setAllCourses(courses);
        console.log("Courses: ", courses);
    }, [courses]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
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
    const { role } = useAuthContext();

    return (
        <tr onClick={() => data && ClickCourse(data, navigate, setCourse, role)}>
            <td className="text-left vertical-align"><img src={data.image ? data.image : courseImageDefault} alt="" style={{width: "50px"}}/></td>
            <td className= "vertical-align"><div className="text-primary fw-bold">{data.name}</div></td>
            <td className= "vertical-align">{convertTime(data.createdAt)}</td>
            <td className= "vertical-align"><span className={bgActive}>{data.status}</span></td>
            <td className= "vertical-align">{data.current_joined}/{data.capacity}</td>
        </tr>
    );
};

const ClickCourse = async (data, navigate, setCourse, role) => {
    console.log("Course: ", data);
    const response = await setCourse(data);
    navigate(`/${role}/courseprofile`);
};

