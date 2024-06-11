import { convertTime } from "./Controller/Time";
import { useCourseContext } from "../Context/CourseContext";
export const CourseManager = () => {
    var {courses} = useCourseContext();
    return (
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Datatables</h5>
                    <table class="table datatable">
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
            <td class="text-center"><a href="#courseDetail"><img src={data.image} alt=""/></a></td>
            <td><a href="#courseDetail" class="text-primary fw-bold"> {data.name}</a></td>
            <td>{data.teacher.name}</td>
            <td>{convertTime(data.createdAt)}</td>
            <td><span class= {bgActive}>{data.status}</span></td>
            <td>14/25</td>
        </tr>
        );
}

const clickCourse = (data, navigate) => {
    
}