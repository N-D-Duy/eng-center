import { convertTime } from "./Time";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../style.css'

export const CourseManager = ({prop}) => {
    return (
        <section class="section">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">All Courses</h5>
                        <table class="table datatable" id = "table-allCourse">
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
                            {prop.map(p => (
                                <GenerateCourseTr key={p.id} student={p} />
                            ))}
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
    const bgActive = data.status = 'active' ? "badge bg-success" : "badge bg-warning";
    return(<tr>
        <td class="text-center"><a href="#allcourse"><img src={data.image} alt=""/></a></td>
        <td><a href="#allcourse" class="text-primary fw-bold"> {data.name}</a></td>
        <td>{data.teacher._id}</td>
        <td>14/25</td>
        <td>{convertTime(data.createdAt)}</td>
        <td><span class= {bgActive}>{data.status}</span></td>
    </tr>);
}

// const GenerateAllCourse= (data) =>{
//     return (<div>

//     </div>)
// }