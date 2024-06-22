import { useEffect, useState } from 'react';
import { useCourseContext } from '../../Context/CourseContext';
import { convertTime } from '../Controller/Time';
import { useStudentContext } from '../../Context/StudentContext';
import { useParentContext } from '../../Context/ParentContext';
import { useTeacherContext } from '../../Context/TeacherContext';
import { useAuthContext } from '../../Context/AuthContext';

export const OverviewCourse = () => {
    const {course} = useCourseContext();
    const [date, setDate] = useState();

    useEffect(() => {
        setDate(convertTime(course.createdAt));
    }, [course]);

    return (
        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                <h5 class="card-title">About</h5>
                <p class="small fst-italic">{course.description}</p>
                <h5 class="card-title">Profile Details</h5>
                <OverviewField label="Course Name" value={course.name} />
                <OverviewField label="Grade" value={`${course.name}.${course.grade}`} />
                <OverviewField label="Teacher" value={course.teacher.name} />
                <OverviewField label="Status" value={course.status} />
                <OverviewField label="Start" value={date} />
        </div>
    );
};


export const OverviewTeacher = () => {
    const { teacher } = useTeacherContext();

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Teacher Overview</h5>
            <OverviewField label="Name" value={teacher.name} />
            <OverviewField label="Email" value={teacher.email} />
            <OverviewField label="Phone" value={teacher.phone} />
            <OverviewField label="Status" value={teacher.status} />
            {/* Add more fields as needed */}
        </div>
    );
};



export const OverviewUser = () => {
    const { user } = useAuthContext();

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Overview</h5>
            <OverviewField label="Name" value={user.name} />
            <OverviewField label="Email" value={user.email} />
            <OverviewField label="Phone" value={user.phone} />
            <OverviewField label="Status" value={user.status} />
            {/* Add more fields as needed */}
        </div>
    );
};

export const OverviewStudent = () => {
    const { student } = useStudentContext();

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Student Overview</h5>
            <OverviewField label="Full Name" value={student.fullName} />
            <OverviewField label="Email" value={student.email} />
            <OverviewField label="Phone" value={student.phone} />
            <OverviewField label="Status" value={student.status} />
            {/* Add more fields as needed */}
        </div>
    );
};

export const OverviewParent = () => {
    const { parent } = useParentContext();

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Parent Overview</h5>
            <OverviewField label="User Name" value={parent.userName} />
            <OverviewField label="Email" value={parent.email} />
            <OverviewField label="Phone" value={parent.phone} />
            <OverviewField label="Status" value={parent.status} />
            {/* Add more fields as needed */}
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
