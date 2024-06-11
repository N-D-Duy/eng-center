import { useCourseContext } from '../../Context/CourseContext';

export const OverviewCourse = () => {
    const {course} = useCourseContext();
    return (
        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                <h5 class="card-title">About</h5>
                <p class="small fst-italic">{course.description}</p>

                <h5 class="card-title">Profile Details</h5>

                <OverviewField label="Course Name" value={course.name} />
                <OverviewField label="Grade" value={`${course.name}.${course.grade}`} />
                <OverviewField label="Teacher" value={course.teacher.name} />
                <OverviewField label="Status" value={course.status} />
                <OverviewField label="Start" value={convertTime(course.createAt)} />
        </div>
    );
};

const OverviewField = ({ label, value }) => {
    return (
        <div class="row">
            <div class="col-lg-3 col-md-4 label">{label}</div>
            <div class="col-lg-9 col-md-8">{value}</div>
        </div>
    );
};

export default OverviewCourse;

function convertTime(time) {
    // Implement your time conversion logic here
    return time;
}
