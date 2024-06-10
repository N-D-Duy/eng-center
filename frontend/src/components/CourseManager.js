import { useEffect, useState } from "react";
import { convertTime } from "./Controller/Time";
import axios from "axios";
import { convertCourseDataToModels } from "./Controller/ConvertData";
import { Link, useNavigate } from "react-router-dom";

export const CourseManager = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    const fetchData = () => {
      //Get all course
      axios.get('http://165.232.161.56:8000/api/courses')
            .then(response => {
              const courses = convertCourseDataToModels(response.data.data);
              setCourses(courses);
              setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    fetchData(); 
    });

    if (loading) {
        return <div>Loading...</div>;
    } 
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section class="section">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">All Courses</h5>
                        <table class="table datatable" id="table-allCourse">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Teacher</th>
                                    <th>Capacity</th>
                                    <th data-type="date" data-format="YYYY/DD/MM">Start Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(c => {
                                    return <GenerateCourseTr data={c} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
            </div>
        </div>
        </section>
    );
}


const GenerateCourseTr = ({data}) =>{
    const bgActive = (data.status === 'active') ? "badge bg-success" : "badge bg-warning";
    return(
        <tr onClick={clickCourse(data)}>
            <td class="text-center"><a href="#allcourse"><img src={data.image} alt=""/></a></td>
            <td><a href="#allcourse" class="text-primary fw-bold"> {data.name}</a></td>
            <td>{data.teacher._id}</td>
            <td>14/25</td>
            <td>{convertTime(data.createdAt)}</td>
            <td><span class= {bgActive}>{data.status}</span></td>
        </tr>
        );
}

const clickCourse = (data, navigate) => {
    navigate('/admin/couseprofile');
}