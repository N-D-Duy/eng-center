import { useEffect, useState } from 'react';
import { useCourseContext } from '../../Context/CourseContext';
import { convertTime } from '../Controller/Time';
import { useStudentContext } from '../../Context/StudentContext';
import { useParentContext } from '../../Context/ParentContext';
import { useTeacherContext } from '../../Context/TeacherContext';
import { useAuthContext } from '../../Context/AuthContext';
import { useUserContext } from '../../Context/UserContext';

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



export const OverviewUser = () => {
    const { user } = useUserContext();

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


export const OverviewUserOther = () => {
    const { otherUser } = useUserContext();
    console.log(otherUser);
    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Overview</h5>
            <OverviewField label="Name" value={otherUser.name} />
            <OverviewField label="Email" value={otherUser.account.email} />
            <OverviewField label="Phone" value={otherUser.account.phone} />
            <OverviewField label="Status" value={otherUser.account.status} />
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
